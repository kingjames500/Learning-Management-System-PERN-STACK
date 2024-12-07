import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const results = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "Learning",
    });

    return results;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const results = await cloudinary.uploader.destroy(publicId);
    return results;
  } catch (error) {
    res.status(500).json({ message: error.message });
    return;
  }
};

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };
