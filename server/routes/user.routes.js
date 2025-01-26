import { Router } from "express";
import {
  loginUser,
  registerUser,
  uploadProfileImage,
  logoutUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//secured routes

router
  .route("/upload-profile-image")
  .post(verifyJwt, upload.single("profileImage"), uploadProfileImage);

router.route("/logout").get(verifyJwt, logoutUser);

export default router;
