import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import { hashSync, compare } from "bcryptjs";
import User from "../models/UserModel";
import dotenv from "dotenv";

dotenv.config();

// Local strategy
passport.use(
  "local",
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const user = await User.findOne({ username: username.toLowerCase() });

      if (!user) {
        return done(null, false, { message: "User doesn't exist." });
      }
      const isMatched: boolean = await compare(password, user.password);
      if (!isMatched) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// JWT Strategy
passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "thisisasecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (err) {
        return done(err);
      }
    }
  )
);
