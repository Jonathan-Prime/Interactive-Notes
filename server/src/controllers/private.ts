/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { NextFunction, RequestHandler, Response, Request } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import UserModel from "../models/user";
import sendEmail from "../utils/sendEmail";
import crypto from 'crypto'
import pairRequestMessage from "../utils/pairRequestMessage";
import BoardModel from '../models/board'
import NoteModel from '../models/note'



interface AuthRequest extends Request {
    user?: {
        id: string;
        pairmode: {
            isActive: boolean;
            id: string,
        }
    };
}



// export const getUser: RequestHandler<{}, any, any, { id?: string }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {
//     const id = req.user?.id;

//     try {
//         if (!mongoose.isValidObjectId(id)) {
//             throw createHttpError(404, "invalid user id");
//         }

//         const user = await UserModel.findById(id)
//             .populate({
//                 path: 'boards',
//                 select: 'title',
//                 match: { pairId: { $exists: false } }, // add this line to exclude boards with pairIds
//                 populate: {
//                     path: 'notes',
//                     select: 'title description status subTasks priority'
//                 }
//             })
//             .exec();

//         res.status(200).json(user);
//     } catch (error) {
//         next(error)
//     }
// }


export const getUser: RequestHandler<{}, any, any, { id?: string, pairmode?: any }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {
    const id = req.user?.id;
    const pairmode = req.user?.pairmode?.isActive;

    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(404, "invalid user id");
        }

        const boardsQuery: any = {
            path: 'boards',
            select: 'title pairId',
            match: {}
        };

        if (pairmode) {
            boardsQuery.match = { pairId: { $ne: null, $exists: true } };
        } else {
            boardsQuery.match = { pairId: { $exists: false } };
        }

        const user = await UserModel.findById(id)
            .populate(boardsQuery)
            .populate({
                path: 'boards',
                match: boardsQuery.match,
                populate: {
                    path: 'notes',
                    select: 'title description status subTasks priority'
                }
            })
            .exec();

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}




export const changePassword: RequestHandler = async (req, res, next) => {
    try {
        const { newPassword, password } = req.body;
        const { userId } = req.params;

        if (!req.params.userId) {
            return res.status(400).send({ message: 'User ID is missing' });
        }

        const user = await UserModel.findById(userId).select('+password');

        if (!user) {
            return res.status(400).send({ message: 'User not found' });
        }

        console.log('password:', password);

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            return res.status(400).send({ message: 'Please enter correct old password' });
        }

        user.password = newPassword;
        await user.save();

        return res.json({ message: 'Password change was successful' });
    } catch (err) {
        next(err);
    }
};




export const sendPairInvite: RequestHandler<{}, any, any, { id?: string }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {

    const { email } = req.body;
    const { id: userId } = req.user;

    try {
        const currentUser = await UserModel.findById(userId);

        if (!currentUser) {
            return res.status(404).send({ message: "User not found" });
        }

        const userToPair = await UserModel.findOne({ email });

        if (!userToPair) {
            return res.status(404).send({ message: "User to pair not found" });
        }

        if (currentUser.pairmode?.id) {
            return res.status(400).send({ message: "you are already paired" });
        }

        if (userToPair.pairmode.id) {
            return res.status(400).send({ message: "User to pair already paired" });
        }

        const pairToken = currentUser.generatePairToken();

        await currentUser.save();

        const pairUrl = `${process.env.BASE_URL}pair/${pairToken}/${userToPair._id}`;

        try {
            await sendEmail({
                to: userToPair.email,
                subject: "Pair Request",
                text: pairRequestMessage(pairUrl, currentUser, userToPair)
            });

            res.status(200).json({ success: true, message: `Pair invitation sent to ${email}, your options would change when your request is accepted` });
        } catch (error) {
            currentUser.pairmode.id = undefined;
            currentUser.pairmode.token = undefined;

            await currentUser.save();

            return res.status(500).send({ message: "Pair invitation could not be sent" });
        }

    } catch (error) {
        next(error);
    }
};


export const acceptPairInvite: RequestHandler = async (req, res, next) => {
    const pairToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    try {
        const user = await UserModel.findOne({
            'pairmode.token': pairToken,
            'pairmode.tokenExpire': { $gt: new Date() },
        });


        if (!user) {
            return res.status(400).json({ message: 'Invalid token or token expired' });
        }

        const pairUser = await UserModel.findOne({
            _id: req?.params.id
        });

        if (!pairUser) {
            return res.status(404).json({ message: 'Pair user not found' });
        }

        user.pairmode.enabled = true;
        user.pairmode.token = undefined;
        user.pairmode.id = pairUser._id.toString();
        user.pairmode.initials = pairUser.username;

        pairUser.pairmode.enabled = true;
        pairUser.pairmode.token = undefined;
        pairUser.pairmode.id = user._id.toString();
        pairUser.pairmode.initials = user.username;

        await user.save();
        await pairUser.save();

        res.status(200).json({ message: 'Pair mode activated successfully' });
    } catch (error) {
        next(error);
    }
};



export const unPairUser: RequestHandler<{}, any, any, { id?: string }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {
    const { id: userId } = req.user;
  
    try {
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const pairUser = await UserModel.findById(req?.user?.pairmode?.id);
  
      if (!pairUser) {
        return res.status(404).json({ message: 'Pair user not found' });
      }
  
      const userBoards = await BoardModel.find({ userId: { $in: [user._id, pairUser._id] } });
  
      for (const board of userBoards) {
        await NoteModel.deleteMany({ boardId: board._id });
      }
  
      await BoardModel.deleteMany({ userId: { $in: [user._id, pairUser._id] } });
  
      user.pairmode.enabled = false;
      user.pairmode.isActive = false;
      user.pairmode.token = undefined;
      user.pairmode.id = '';
      user.pairmode.initials = '';
  
      pairUser.pairmode.enabled = false;
      pairUser.pairmode.isActive = false;
      pairUser.pairmode.token = undefined;
      pairUser.pairmode.id = '';
      pairUser.pairmode.initials = '';
  
      await user.save();
      await pairUser.save();

      await sendEmail({
        to: pairUser.email,
        subject: "Pair Disconnecct",
        text: `<div> Hi ${pairUser?.username}, ${user?.username} has disconnected you from pairmode on their Interactive Note account.  </div>`
    });
  
      res.status(200).json({ message: 'Pair mode deactivated successfully' });
    } catch (error) {
      next(error);
    }
  };
  



export const togglePairMode: RequestHandler<{}, any, any, { id?: string }> = async (req: AuthRequest, res: Response<any>, next: NextFunction) => {
    const { id } = req.user;

    try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.pairmode.isActive = !user.pairmode.isActive;
    await user.save();

    res.status(200).json({
      message: `${user.pairmode.isActive ? 'Switched to pair mode' : 'Switched to personal'} successfully`,
    });
  } catch (error) {
    next(error);
  }
};
