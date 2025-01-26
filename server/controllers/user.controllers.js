import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const options = {
  httpOnly: true,
  secure: false,
  sameSite: 'None',
  domain: '.localhost', 
   path: '/',
   withCredentials: true,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Unable to generated access and refresh tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
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
});

const uploadProfileImage = async (req, res) => {
  //upload image on cloudinary

  const profileImageLocalPath = req?.file?.path;

  const profileImage = await uploadOnCloudinary(profileImageLocalPath);
};

const loginUser = asyncHandler(async (req, res) => {
  // Get data from request
  const { email, password } = req.body;

  //validate the data
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(409, "All fields are required");
  }

  //check for existing user

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User with this email does not exists");
  }

  //check if password is correct

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid password");
  }

  //generate access and refresh token

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  //return response, with success or error

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(req.user?.user_id, {
    $set: {
      refreshToken: undefined,
    },
  });

  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
export { registerUser, uploadProfileImage, loginUser, logoutUser };
