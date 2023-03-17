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
const jsonwebtoken_1 = require("jsonwebtoken");
const bcryptjs_1 = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
const express_validator_1 = require("express-validator");
const UserModel_1 = __importDefault(require("../models/UserModel"));
dotenv_1.default.config();
// Login user
const login_post = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
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
                const payload = {
                    id: user._id || "",
                    username: user.username,
                    email: user.email,
                };
                const token = (0, jsonwebtoken_1.sign)({ user: payload }, process.env.JWT_SECRET || "thisisasecret");
                res.status(200).json({ token });
            });
        }
        catch (err) {
            return next(err);
        }
    }))(req, res, next);
});
// Signup user
const signup_post = [
    (0, express_validator_1.body)("email").isLength({ min: 1 }).withMessage("Email is required"),
    (0, express_validator_1.body)("username")
        .isLength({ min: 3 })
        .withMessage("Username must at least have 3 characters."),
    (0, express_validator_1.body)("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long."),
    (0, express_validator_1.body)("password_confirmation")
        .exists()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match.");
        }
        return true;
    }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, username, password } = req.body;
            const errors = (0, express_validator_1.validationResult)(req);
            // generate salt
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const user = new UserModel_1.default({
                username,
                email,
                password: (0, bcryptjs_1.hashSync)(password, salt),
            });
            // Check if username already exists
            const existantUser = yield UserModel_1.default.findOne({
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
            yield user.save();
            // Login user after signup
            passport_1.default.authenticate("local", { session: false }, (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
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
                        const payload = {
                            id: user._id || "",
                            username: user.username,
                            email: user.email,
                        };
                        const token = (0, jsonwebtoken_1.sign)({ user: payload }, process.env.JWT_SECRET || "thisisasecret");
                        res.status(200).json({ token });
                    });
                }
                catch (err) {
                    return next(err);
                }
            }))(req, res, next);
        }
        catch (err) {
            next(err);
        }
    }),
];
// Get current user
const user_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("jwt", { session: false }, (err, payload) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.status(200).json({ user: payload });
        }))(req, res, next);
    }
    catch (err) {
        return next(err);
    }
});
exports.default = { login_post, signup_post, user_get };
