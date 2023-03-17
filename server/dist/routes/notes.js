"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notesController_1 = __importDefault(require("../controllers/notesController"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
// Get all notes
router.get("/:authorId", passport_1.default.authenticate("jwt", { session: false }), notesController_1.default.notes_get);
// New note
router.post("/", passport_1.default.authenticate("jwt", { session: false }), notesController_1.default.note_create);
// Update note
router.put("/:id", passport_1.default.authenticate("jwt", { session: false }), notesController_1.default.note_update);
// Delete note
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), notesController_1.default.note_delete);
exports.default = router;
