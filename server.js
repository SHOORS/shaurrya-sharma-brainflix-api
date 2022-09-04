const express = require("express");
const app = express();

const cors = require("cors");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/images", express.static("./public/images"));
const videoRoutes = require("./routes/videoRoutes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/videos", videoRoutes)