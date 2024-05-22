const pool = require("../../db/pool");
const fs = require("fs");
const path = require("path");
const upload = async (req, res) => {
  const { userId } = req.params;
  const imageFile = req.file;

  console.log(`userId from controller ${userId}`);
  // console.log(`imageFile ${imageFile.filename}`);
  const rootFolder = path.resolve("server", "public", "images");

  const compare = `${imageFile.filename} 
  VS 
  ${userId}`;
  console.log(`comparing ${compare}`);
  if (!imageFile) {
    return res.status(400).json({ message: "Please Upload a file." });
  }
  try {
    const newFileName = req.file.filename;

    function findFilesByKeyword(rootFolder, keyword, results = []) {
      // Read the contents of the current folder
      const files = fs.readdirSync(rootFolder);
      const excepts = files.slice(0, files.length - 1);
      // console.log(`excepts ${excepts}`);
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
    const response = await pool.query(
      `UPDATE users SET user_image = '${newFileName}' WHERE user_id = '${userId}'`
    );
    res.status(200).json({
      message: `File ${newFileName} Uploaded Successfully`,
    });
  } catch (error) {
    console.log(`error from uploaad`, error);
    return res.status(500);
  } finally {
  }
  res.end();
};

module.exports = upload;
