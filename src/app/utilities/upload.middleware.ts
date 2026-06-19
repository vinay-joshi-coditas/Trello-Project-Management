import multer from "multer";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
//   "application/pdf"
];

export const upload = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png, gif, webp and svg files are allowed"));
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
