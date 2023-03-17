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
const ProjectModel_1 = __importDefault(require("../models/ProjectModel"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// return all projects
const projects_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const author = req.params.authorId;
        const projects = yield ProjectModel_1.default.find({ author }).populate("author");
        res.status(200).json({
            projects,
        });
    }
    catch (err) {
        return next(err);
    }
});
// get specific project
const project_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const [project, projectNotes] = yield Promise.all([
            ProjectModel_1.default.findById(id),
            NoteModel_1.default.find({ project: id }),
        ]);
        res.status(200).json({
            project,
            projectNotes,
        });
    }
    catch (err) {
        return next(err);
    }
});
const projects_post = [
    (0, express_validator_1.body)("name").isLength({ min: 1 }).withMessage("name field is required."),
    (0, express_validator_1.body)("author").exists().withMessage("author id must be supplied."),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, author } = req.body;
            const project = new ProjectModel_1.default({
                name,
                author,
            });
            const projectAuthor = yield UserModel_1.default.findById(author);
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(500).json({
                    errors,
                    project,
                });
                return;
            }
            // Check author id
            if (!projectAuthor) {
                res.status(500).json({
                    message: "Author doesn't exist.",
                });
                return;
            }
            // save project
            yield project.save();
            res.status(200).json({
                project,
            });
        }
        catch (err) {
            return next(err);
        }
    }),
];
const project_delete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // delete notes associated to project
        yield NoteModel_1.default.deleteMany({ project: id });
        // delete project
        yield ProjectModel_1.default.findByIdAndDelete(id);
        res.status(200).json({
            message: "Project deleted successfully.",
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.default = {
    projects_get,
    project_get,
    projects_post,
    project_delete,
};
