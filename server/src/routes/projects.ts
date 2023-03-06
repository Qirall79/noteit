import { Router } from "express";
import projectsController from "../controllers/projectsController";
import passport from "passport";

const router: Router = Router();

router.get(
  "/:authorId",
  passport.authenticate("jwt", { session: false }),
  projectsController.projects_get
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectsController.project_get
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  projectsController.projects_post
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  projectsController.project_delete
);

export default router;
