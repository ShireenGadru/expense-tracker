import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
console.log(
  process.env.CLOUDINARY_CLOUD_NAME,
  process.env.CLOUDINARY_API_KEY,
  process.env.CLOUDINARY_API_SECRET
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: "dttkb6pku",
//   api_key: "279824265357455",
//   api_secret: "--LADdJ8njpGomljp6sd04pENfc",
// });


export const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log(
      process.env.CLOUDINARY_CLOUD_NAME,
      process.env.CLOUDINARY_API_KEY,
      process.env.CLOUDINARY_API_SECRET
    );
    console.log(cloudinary.config());
    if (!localFilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
  

    //file has been uploaded successfully
    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    console.log(error);

    fs.unlinkSync(localFilePath);
    //  //remove the locally saved temp file as the operation failed
    return null;
  }
};
