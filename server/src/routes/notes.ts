import { Router } from "express";
import notesController from "../controllers/notesController";
import passport from "passport";

const router: Router = Router();

// Get all notes
router.get(
  "/:authorId",
  passport.authenticate("jwt", { session: false }),
  notesController.notes_get
);

// New note
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  notesController.note_create
);

// Update note
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  notesController.note_update
);

// Delete note
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  notesController.note_delete
);

export default router;
