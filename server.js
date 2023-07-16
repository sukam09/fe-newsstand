const path = require("path");
const fs = require("fs");
const http = require("http");

const PORT = 8080;

const globalController = (req, res, filePath) => {
  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-otf",
    ".wasm": "application/wasm",
  };
  var contentType = mimeTypes[extname] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  fs.readFile(`.${filePath}`, (err, data) => {
    if (err) {
      return console.error(err);
    }
    return res.end(data, "utf-8");
  });
  console.log(filePath);
};

const server = http.createServer((req, res) => {
  let filePath = req.url;
  if (filePath === "/") {
    filePath = "/index.html";
  }

  globalController(req, res, filePath);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
