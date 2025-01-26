import { Router } from "express";
import {
  registerUser,
  uploadProfileImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/register").post(registerUser);

//secured routes

router
  .route("/upload-profile-image")
  .post(upload.single("profileImage"), uploadProfileImage);

export default router;
