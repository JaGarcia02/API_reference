const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const PORT = 5820;
const app = express();
const cors = require("cors");

const fileSizeLimiter = require("./middleware/fileSizeLimiter");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filesPayloadExists = require("./middleware/filesPayloadExists");
app.use(cors());

// routes //
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", "jpeg"]),
  fileSizeLimiter,

  (req, res) => {
    const files = req.files;
    console.log(files);
    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "Error", message: err });
      });
    });
    return res.json({
      status: "Success",
      message: Object.keys(files).toString(),
    });
  }
);
// routes //

app.listen(PORT, () => console.log(`Server Is Running On ${PORT}`));
