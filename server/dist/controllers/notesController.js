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
const express_validator_1 = require("express-validator");
const NoteModel_1 = __importDefault(require("../models/NoteModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const notes_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = req.params.authorId;
        const notes = yield NoteModel_1.default.find({ author })
            .populate("author")
            .populate("project");
        res.status(200).json({
            notes,
        });
    }
    catch (err) {
        next(err);
    }
});
const note_create = [
    (0, express_validator_1.body)("text").isLength({ min: 1 }).withMessage("note body must be supplied"),
    (0, express_validator_1.body)("title").isLength({ min: 1 }).withMessage("note title must be supplied"),
    (0, express_validator_1.body)("author").isLength({ min: 1 }).withMessage("author id must be supplied"),
    (0, express_validator_1.body)("project")
        .isLength({ min: 1 })
        .withMessage("project id must be supplied"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const { text, author, project, title } = req.body;
            const note = new NoteModel_1.default({
                text,
                title,
                author,
                project,
            });
            const noteAuthor = yield UserModel_1.default.findById(author);
            const noteProject = yield ProjectModel_1.default.findById(project);
            // check for validation errors
            if (!errors.isEmpty()) {
                res.status(500).json({
                    errors,
                    note,
                });
                return;
            }
            // check if author id exists
            if (!noteAuthor) {
                res.status(500).json({
                    message: "Author id is incorrect.",
                });
                return;
            }
            // check if project id exists
            if (!noteProject) {
                res.status(500).json({
                    message: "Project id is incorrect.",
                });
                return;
            }
            // save note
            yield note.save();
            res.status(200).json({
                note,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
const note_update = [
    (0, express_validator_1.body)("text").isLength({ min: 1 }).withMessage("note body must be supplied"),
    (0, express_validator_1.body)("title").isLength({ min: 1 }).withMessage("note title must be supplied"),
    (0, express_validator_1.body)("author").isLength({ min: 1 }).withMessage("author id must be supplied"),
    (0, express_validator_1.body)("project")
        .isLength({ min: 1 })
        .withMessage("project id must be supplied"),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const id = req.params.id;
            const text = req.body.text;
            const title = req.body.title;
            // check for validation errors
            if (!errors.isEmpty()) {
                res.status(500).json({
                    errors,
                });
                return;
            }
            // update note
            yield NoteModel_1.default.findByIdAndUpdate(id, {
                text,
                title,
            });
            res.status(200).json({
                success: true,
            });
        }
        catch (err) {
            next(err);
        }
    }),
];
const note_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield NoteModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Note deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    notes_get,
    note_create,
    note_delete,
    note_update,
};
