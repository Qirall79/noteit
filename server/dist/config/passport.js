"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const bcryptjs_1 = require("bcryptjs");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Local strategy
passport_1.default.use("local", new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield UserModel_1.default.findOne({ username: username.toLowerCase() });
        if (!user) {
            return done(null, false, { message: "User doesn't exist." });
        }
        const isMatched = yield (0, bcryptjs_1.compare)(password, user.password);
        if (!isMatched) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err);
    }
})));
// JWT Strategy
passport_1.default.use("jwt", new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET || "thisisasecret",
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, payload);
    }
    catch (err) {
        return done(err);
    }
})));
