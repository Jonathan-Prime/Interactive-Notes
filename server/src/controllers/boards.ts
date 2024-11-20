import { RequestHandler } from "express";
import createHttpError from "http-errors";
import BoardModel from "../models/board";
import UserModel from "../models/user";
import NoteModel from "../models/note";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: {
    id: string;
    pairmode: {
      isActive: boolean;
      id: string;
    };
  };
}

export const getSingleBoard: RequestHandler<
  {},
  unknown,
  unknown,
  { id?: string }
> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
  const userId = req.user?.id;
  const boardId = req.params.boardId;

  try {
    if (!mongoose.isValidObjectId(boardId)) {
      throw createHttpError(400, "invalid board id");
    }

    const board = await BoardModel.findById(boardId).populate({
      path: "notes",
      select: "title description status priority subTasks createdBy createdAt",
    });

    if (!board) {
      throw createHttpError(404, "board not found");
    }

    // Check if the user is authorized to access the board
    if (
      board.userId.toString() !== userId &&
      board.pairId?.toString() !== userId
    ) {
      throw createHttpError(403, "unauthorized to access board");
    }

    res.status(200).json(board);
  } catch (error) {
    next(error);
  }
};

export const getAllPairBoard: RequestHandler<
  {},
  unknown,
  unknown,
  { id?: string }
> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
  const userId = req.user?.id;

  try {
    const user = await UserModel.findById(userId);

    if (!user.pairmode) {
      return res.status(404).json({ message: "sorry you are not on pairmode" });
    }

    const boards = await BoardModel.find({
      $or: [{ userId }, { pairId: userId }],
      pairId: { $exists: true },
    }).populate({
      path: "notes",
      select: "title description status priority subTasks",
    });

    res.status(200).json(boards);
  } catch (error) {
    next(error);
  }
};

export const createBoard: RequestHandler<
  {},
  unknown,
  unknown,
  { id?: string; pairmode?: any }
> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
  const userId = req.user?.id;
  const { title } = req.body;
  const pairmode = req.user?.pairmode;

  try {
    if (!title) {
      throw createHttpError(400, "title is required");
    }

    const boardData: any = {
      title: title,
      userId: userId,
    };

    if (pairmode && pairmode.isActive) {
      boardData.pairId = pairmode.id;
    }

    const newBoard = await BoardModel.create(boardData);
    await UserModel.updateOne(
      { _id: newBoard.userId },
      { $push: { boards: { $each: [newBoard._id], $position: 0 } } }
    );

    if (newBoard.pairId) {
      await UserModel.updateOne(
        { _id: newBoard.pairId },
        { $push: { boards: { $each: [newBoard._id], $position: 0 } } }
      );
    }

    return res.status(201).json(newBoard);
  } catch (error) {
    next(error);
  }
};

// export const updateBoard: RequestHandler<UpdateBoardParams, unknown, UpdateBoardBody, unknown> = async (req, res, next) => {
export const updateBoard: RequestHandler = async (req, res, next) => {
  const boardId = req?.params?.boardId;
  const newTitle = req.body.title;

  try {
    if (!mongoose.isValidObjectId(boardId)) {
      throw createHttpError(400, "Invalid board id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Board must have a title");
    }

    const board = await BoardModel.findById(boardId).exec();

    if (!board) {
      throw createHttpError(404, "Board not found");
    }

    board.title = newTitle;

    await board.save();

    res.status(200).json({ message: "board updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteBoard: RequestHandler<
  {},
  unknown,
  unknown,
  { id?: string }
> = async (req: AuthRequest, res: Response<unknown>, next: NextFunction) => {
  const userId = req.user?.id;
  const boardId = req.params.boardId;

  try {
    if (!mongoose.isValidObjectId(boardId)) {
      throw createHttpError(400, "Invalid board id");
    }

    const board = await BoardModel.findById(boardId).exec();

    if (!board) {
      throw createHttpError(404, "Board not found");
    }

    await BoardModel.findByIdAndDelete(boardId);
    await UserModel.updateOne({ _id: userId }, { $pull: { boards: boardId } });

    if (req.user.pairmode.isActive) {
      await UserModel.updateOne(
        { _id: req.user.pairmode.id },
        { $pull: { boards: boardId } }
      );
    }

    await NoteModel.deleteMany({ boardId });

    res.status(200).json({ message: `${board.title} board deleted` });
  } catch (error) {
    next(error);
  }
};
