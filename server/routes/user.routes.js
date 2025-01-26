import { Router } from "express";
import {
  loginUser,
  registerUser,
  uploadProfileImage,
  logoutUser,
  changePassword,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
//secured routes

router
  .route("/upload-image")
  .post(verifyJwt, upload.single("profileImage"), uploadProfileImage);

router.route("/logout").get(verifyJwt, logoutUser);
router.route("/change-password").post(verifyJwt, changePassword);

export default router;
