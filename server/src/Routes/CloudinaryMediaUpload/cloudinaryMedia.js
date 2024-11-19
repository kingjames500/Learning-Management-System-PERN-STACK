import {
  Router,
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} from "../../imports/imports.js";
import multer from "multer";

const router = Router();

const upload = multer({
  dest: "uploads/",
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const results = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      message: "File uploaded successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error uploading the file",
    });
    return;
  }
});

router.delete("/delete/:publiId", async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      res.status(400).json({
        message: "Please provide a publicId",
      });
      return;
    }

    const results = await deleteMediaFromCloudinary(publicId);
    res.status(200).json({
      message: "File deleted successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error deleting the file",
    });
    return;
  }
});

export default router;
