import mongoose, { model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import _ from "lodash";
import dns from "dns";

interface User extends mongoose.Document {
  role: string;
  username: string;
  email: string;
  reviewedApp: boolean;
  verified: boolean;
  pairmode: {
    enabled: boolean;
    isActive: boolean;
    initials: string;
    id: string;
    token: string;
    tokenExpire: string;
  };
  password: string;
  board: Types.ObjectId["_id"];
  resetPasswordToken: string;
  resetPasswordExpire: string;
  matchPasswords: (password: string) => Promise<boolean>;
  generatePairToken: () => string;
  getResetPasswordToken: () => string;
  getSignedToken: () => string;
}

const userSchema = new Schema(
  {
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    username: { type: String, required: true },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: {
        validator: validateEmail,
        message: "Please provide a valid email",
      },
    },
    reviewedApp: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    boards: [{ type: Schema.Types.ObjectId, ref: "Board" }],
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    pairmode: {
      enabled: { type: Boolean, default: false },
      isActive: { type: Boolean, default: false },
      initials: { type: String },
      id: { type: String, default: null },
      token: String,
      tokenExpire: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

async function validateEmail(email) {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  const [username, domain] = email.split("@");

  // Check if the domain is valid using the DNS module
  return new Promise((resolve, reject) => {
    dns.resolveMx(domain, (err, addresses) => {
      if (err || addresses.length === 0) {
        reject(err || new Error("No MX records found for the domain."));
      } else {
        resolve(true);
      }
    });
  });
}

userSchema.pre("save", function (next) {
  this.username = _.capitalize(this.username);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.getSignedToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  return token;
};

userSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // 10 min from init

  return resetToken;
};

userSchema.methods.generatePairToken = function () {
  const pairToken = crypto.randomBytes(20).toString("hex");

  this.pairmode.token = crypto
    .createHash("sha256")
    .update(pairToken)
    .digest("hex");

  this.pairmode.tokenExpire = Date.now() + 3600 * 1000; // 1 hour from init

  return pairToken;
};

export default model<User>("User", userSchema);
