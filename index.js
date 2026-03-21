const express = require("express");
const archiver = require("archiver");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;
const FILES_DIR = path.join(__dirname, "public", "files");

app.post("/zip", (req, res) => {
  const categorized = req.body.categorized;

  res.attachment("Categorized-Content.zip");

  const archive = archiver("zip");
  archive.pipe(res);

  Object.entries(categorized).forEach(([category, files]) => {
    for (const file of files) {
      const filePath = path.join(FILES_DIR, file);
      archive.file(filePath, { name: `${category}/${file}` });
    }
  });

  archive.finalize();
});

app.listen(PORT);
