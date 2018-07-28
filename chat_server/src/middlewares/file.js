const fs = require("fs");
const Path = require("path");
const downlodeFile = async (req, res, next) => {
  try {
    const { path, name } = req.params;
    const type = name.split(".").pop();
    const s = Path.join(__dirname, "..");
    console.log(type, 22222, name);
    const newName = encodeURIComponent(name);

    const stream = fs.createReadStream(`${s}\\public\\${path}`);
    res.setHeader("Content-Type", `application/${type}`);
    res.setHeader(
      "Content-Disposition",
      `attachment;  filename*=UTF-8\'\'` + newName
    );
    stream.pipe(res);
  } catch (e) {
    next(e);
  }
};

module.exports = { downlodeFile };
