"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 8 },
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
