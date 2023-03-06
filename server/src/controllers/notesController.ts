import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Note from "../models/NoteModel";
import User from "../models/UserModel";
import Project from "../models/ProjectModel";
import { ObjectId } from "mongoose";

// Note interface
interface INote {
  text: string;
  project: string | ObjectId;
  author: string | ObjectId;
}

const notes_get = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const author = req.params.authorId;
    const notes: INote[] = await Note.find({ author })
      .populate("author")
      .populate("project");

    res.status(200).json({
      notes,
    });
  } catch (err) {
    next(err);
  }
};

const note_create = [
  body("text").isLength({ min: 1 }).withMessage("note body must be supplied"),
  body("author").isLength({ min: 1 }).withMessage("author id must be supplied"),
  body("project")
    .isLength({ min: 1 })
    .withMessage("project id must be supplied"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors: any = validationResult(req);
      const { text, author, project }: INote = req.body;
      const note = new Note({
        text,
        author,
        project,
      });
      const noteAuthor = await User.findById(author);
      const noteProject = await Project.findById(project);

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
      await note.save();

      res.status(200).json({
        note,
      });
    } catch (err) {
      next(err);
    }
  },
];

const note_update = [
  body("text").isLength({ min: 1 }).withMessage("note body must be supplied"),
  body("author").isLength({ min: 1 }).withMessage("author id must be supplied"),
  body("project")
    .isLength({ min: 1 })
    .withMessage("project id must be supplied"),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors: any = validationResult(req);
      const id: string = req.params.id;
      const text: string = req.body.text;

      // check for validation errors
      if (!errors.isEmpty()) {
        res.status(500).json({
          errors,
        });
        return;
      }

      // update note
      await Note.findByIdAndUpdate(id, {
        text,
      });
      res.status(200).json({
        message: "note updated successfully.",
      });
    } catch (err) {
      next(err);
    }
  },
];

const note_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await Note.findByIdAndDelete(id);

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  notes_get,
  note_create,
  note_delete,
  note_update,
};
