"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
router.post("/login", authController_1.default.login_post);
router.post("/signup", authController_1.default.signup_post);
router.get("/user", authController_1.default.user_get);
exports.default = router;
