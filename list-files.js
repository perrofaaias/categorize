const fs = require("fs");
const path = require("path");

const script = process.argv[1];
const folder = path.join(path.dirname(script), "public", "files");

function writeJsonData(data) {
  fs.writeFileSync(
    path.join(folder, "data.json"),
    JSON.stringify(data, null, 2)
  );
}

function fileListFilter(name) {
  const filePath = path.join(folder, name);

  const fileExtension = path.extname(name);
  const validExtension = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".avif",
  ].includes(fileExtension);

  return validExtension && fs.statSync(filePath).isFile();
}

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

fs.readdir(folder, (err, files) => {
  if (err) return console.error(err);

  const list = files.filter(fileListFilter);
  writeJsonData(list);
});
