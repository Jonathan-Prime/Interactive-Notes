/* eslint-disable no-case-declarations */
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import TokenModel from "../models/token";
import sendEmail from "../utils/sendEmail";
import confirmEmailMessage from "../utils/confirmEmailMessage";
import crypto from "crypto";
import changePasswordMessage from "../utils/changePasswordMessage";

interface createUser {
  username?: string;
  email?: string;
  password?: string;
}

export const signup: RequestHandler<
  unknown,
  unknown,
  createUser,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    switch (true) {
      case !username:
        throw createHttpError(400, "username is required");
      case !email:
        throw createHttpError(400, "email is required");
      case !password:
        throw createHttpError(400, "password is required");
      default:
        const isUserRegistered = await UserModel.findOne({ email });
        if (isUserRegistered) {
          throw createHttpError(401, "account already exists, try logging in");
        }

        const user = await UserModel.create({
          username: username,
          email: email,
          password: password,
        });

        const token = await new TokenModel({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const url = `${process.env.BASE_URL}/user/${user.id}/verify/${token.token}`;

        await sendEmail({
          to: user.email,
          subject: "Email Verification",
          text: confirmEmailMessage(url),
        });

        res.json({
          success: true,
          message: `Hi ${user.username}, your signup was successful, Kindly confirm the verification email sent to you.`,
          status: 201,
        });
        break;
    }
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createHttpError(400, "Please provide an email and password");
  }

  try {
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.verified) {
      const unusedToken = await TokenModel.findOne({
        userId: user._id,
      });

      if (unusedToken !== null && unusedToken instanceof TokenModel) {
        await unusedToken.removeToken();
      }

      const token = await new TokenModel({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}user/${user.id}/verify/${token.token}`;

      await sendEmail({
        to: user.email,
        subject: "Email Verification",
        text: confirmEmailMessage(url),
      });

      throw next(
        createHttpError(
          401,
          "please confirm the verification email sent to you."
        )
      );
    }

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(400).send({ message: "Invalid link" });
    }

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) {
      return res.status(400).send({ message: "Invalid link" });
    }

    user.verified = true;
    await user.save();

    if (token) {
      await token.removeToken();
    }

    res.status(202).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const forgotpassword: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .send({
          message: "Email could not not be sent / account does not exist",
        });
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.BASE_URL}/auth/reset-password/${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: changePasswordMessage(resetUrl),
      });

      res
        .status(200)
        .json({
          success: true,
          data: `Check your inbox for the next steps. If you don't receive an email, and it's not in your spam folder this could mean you signed up with a different address.`,
        });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(500).send({ message: "Email could not be sent" });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid Reset Token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password reset success",
      token: user.getSignedToken(),
    });
  } catch (error) {
    next(error);
  }
};

const sendToken = async (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, data: user.username, token });
};
