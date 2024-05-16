const pool = require("../../db/pool");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const upload = async (req, res) => {
  let responseData = {};
  const { userId } = req.params;
  const imageFile = req.file;
  const rootFolder =
    "C:/Users/John/Desktop/Coding/projects/Exerzise/Exerzise_backend/server/public/images"; // Replace with the path to your root folder
  if (!imageFile) {
    return res.status(400).json({ message: "Please Upload a file." });
  }
  try {
    function findFilesByKeyword(rootFolder, keyword, results = []) {
      // Read the contents of the current folder
      const files = fs.readdirSync(rootFolder);
      const excepts = files.slice(0, files.length - 1);
      // console.log(excepts);
      // Iterate through each item in the folder
      for (const file of excepts) {
        const filePath = path.join(rootFolder, file);
        // console.log(filePath);
        const directories = filePath.split("\\");
        if (
          filePath.split("\\")[directories.length - 1].split("_")[1] === keyword
        ) {
          fs.unlink(filePath, (err) => {
            if (err) throw err;
            console.log(`successfully deleted ${filePath}`);
          });
          // results.push(filePath);
        }
      }
      console.log("all older files has been removed");
    }
    findFilesByKeyword(rootFolder, userId);
    // console.log(foundFiles);
    const newFileName = req.file.filename;
    const response = await pool.query(
      `UPDATE users SET user_image = '${newFileName}' WHERE user_id = '${userId}'`
    );
    res.status(200).json({
      message: `File ${newFileName} Uploaded Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  } finally {
  }
  res.end();
};

module.exports = upload;