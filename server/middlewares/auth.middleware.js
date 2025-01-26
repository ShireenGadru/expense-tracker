import { User } from "../models/user.model";
import ApiError from "../utils/ApiError";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken || req?.headers?.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
