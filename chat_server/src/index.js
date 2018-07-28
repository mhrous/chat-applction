const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes");
const myServer = require("./socketServer");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use(cors());
myServer.run();

app.use("/", apiRoutes);

app.listen(process.env.PORT || 4000, () =>
  console.log("Example app listening on port 4000!")
);
