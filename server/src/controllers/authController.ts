import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { sign } from "jsonwebtoken";
import { genSaltSync, hashSync } from "bcryptjs";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
import User from "../models/UserModel";

dotenv.config();

interface Info {
  message?: string;
}

interface Payload {
  username: string;
  email: string;
  id: string;
}

interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

// Login user
const login_post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate(
    "local",
    { session: false },
    async (err: any, user: IUser, info: Info) => {
      try {
        if (err) {
          return res.status(500).json({ err });
        }
        if (!user) {
          return res.status(500).json({ message: info.message });
        }

        req.login(user, { session: false }, (err) => {
          if (err) {
            return res.status(404).json({ error: err });
          }
          const payload: Payload = {
            id: user._id || "",
            username: user.username,
            email: user.email,
          };
          const token = sign(
            { user: payload },
            process.env.JWT_SECRET || "thisisasecret"
          );
          res.status(200).json({ token });
        });
      } catch (err) {
        return next(err);
      }
    }
  )(req, res, next);
};

// Signup user
const signup_post = [
  body("email").isLength({ min: 1 }).withMessage("Email is required"),
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must at least have 3 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
  body("password_confirmation")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, username, password } = req.body;
      const errors = validationResult(req);

      // generate salt
      const salt = genSaltSync(10);
      const user: any = new User({
        username,
        email,
        password: hashSync(password, salt),
      });

      // Check if username already exists
      const existantUser = await User.findOne({
        username: username.toLowerCase(),
      });

      if (existantUser) {
        res.status(500).json({ message: "Username already exists." });
        return;
      }

      // Check for validation errors
      if (!errors.isEmpty()) {
        res.status(500).json({
          errors: errors.array(),
          user,
        });
        return;
      }

      await user.save();

      // Login user after signup
      passport.authenticate(
        "local",
        { session: false },
        async (err: any, user: IUser, info: Info) => {
          try {
            if (err) {
              return res.status(500).json({ err });
            }
            if (!user) {
              return res.status(500).json({ message: info.message });
            }

            req.login(user, { session: false }, (err) => {
              if (err) {
                return res.status(404).json({ error: err });
              }
              const payload: Payload = {
                id: user._id || "",
                username: user.username,
                email: user.email,
              };
              const token = sign(
                { user: payload },
                process.env.JWT_SECRET || "thisisasecret"
              );
              res.status(200).json({ token });
            });
          } catch (err) {
            return next(err);
          }
        }
      )(req, res, next);
    } catch (err) {
      next(err);
    }
  },
];

// Get current user
const user_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err: any, payload: Payload) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        res.status(200).json({ user: payload });
      }
    )(req, res, next);
  } catch (err) {
    return next(err);
  }
};

export default { login_post, signup_post, user_get };
