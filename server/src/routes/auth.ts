import { Router } from "express";
import authController from "../controllers/authController";

const router: Router = Router();

router.post("/login", authController.login_post);
router.post("/signup", authController.signup_post);
router.get("/user", authController.user_get);

export default router;
