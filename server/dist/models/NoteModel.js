"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: "Project", required: true },
}, { timestamps: {} });
const Note = (0, mongoose_1.model)("Note", NoteSchema);
exports.default = Note;
