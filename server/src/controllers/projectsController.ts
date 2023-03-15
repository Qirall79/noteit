import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import Note from "../models/NoteModel";
import Project from "../models/ProjectModel";
import User from "../models/UserModel";

// Project interface
interface IProject {
  name: string;
  author: string;
}

// return all projects
const projects_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = req.params.authorId;
    const projects: IProject[] = await Project.find({ author }).populate(
      "author"
    );
    res.status(200).json({
      projects,
    });
  } catch (err) {
    return next(err);
  }
};

// get specific project
const project_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const [project, projectNotes] = await Promise.all([
      Project.findById(id),
      Note.find({ project: id }),
    ]);

    res.status(200).json({
      project,
      projectNotes,
    });
  } catch (err) {
    return next(err);
  }
};

const projects_post = [
  body("name").isLength({ min: 1 }).withMessage("name field is required."),
  body("author").exists().withMessage("author id must be supplied."),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, author }: IProject = req.body;
      const project = new Project({
        name,
        author,
      });
      const projectAuthor = await User.findById(author);
      const errors: any = validationResult(req);

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
      await project.save();

      res.status(200).json({
        project,
      });
    } catch (err) {
      return next(err);
    }
  },
];

const project_delete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    // delete notes associated to project
    await Note.deleteMany({ project: id });

    // delete project
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      message: "Project deleted successfully.",
    });
  } catch (err) {
    return next(err);
  }
};

export default {
  projects_get,
  project_get,
  projects_post,
  project_delete,
};
