import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req, res) => {
  // Get data from request
  const { firstName, lastName, email, password } = req.body;

  //validate the data
  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(409, "All fields are required");
  }

  //check for existing user

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }



  // create user and save to database

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    profileImage: "",
  });

  //check is user created correctly

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );
  
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return response, with success or error

  res.status(200).json({
    status: 200,
    user,
    message: "User regsitered successfully",
  });
};

const uploadProfileImage = async (req, res) => {
  //upload image on cloudinary

  const profileImageLocalPath = req?.file?.path;

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
};

export { registerUser, uploadProfileImage };
