"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectsController_1 = __importDefault(require("../controllers/projectsController"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/:authorId", passport_1.default.authenticate("jwt", { session: false }), projectsController_1.default.projects_get);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), projectsController_1.default.project_get);
router.post("/", passport_1.default.authenticate("jwt", { session: false }), projectsController_1.default.projects_post);
router.delete("/:id", passport_1.default.authenticate("jwt", { session: false }), projectsController_1.default.project_delete);
exports.default = router;
