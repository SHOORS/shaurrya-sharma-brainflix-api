const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
var uniqid = require("uniqid");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const router = express.Router();
app.use(express.json());
app.use("/images", express.static("./public/images"));

const readVideo = (fileName) => {
    const fileContent = JSON.parse(fs.readFileSync(`./data/${fileName}.json`));
    return fileContent;
};
  
router.get("/", function (req, res) {
    const videos = readVideo("videos");
    res.json(videos);
});

router.get("/:id", (req, res) => {
    const videos = readVideo("videos");
    const video = videos.find((vid) => vid.id === req.params.id);
    res.send(video);
});

router.post("/upload", function (req, res) {
    const videos = readVideo("videos");
    const newVideo = {
      title: req.body.title,
      channel: "Shoors",
      image: `https://source.unsplash.com/random/300x200?sig=${Math.random()}`,
      description: req.body.description,
      views: "7654357",
      likes: "9001",
      duration: "4:19",
      video: "https://project-2-api.herokuapp.com/stream",
      timestamp: Date.now(),
      comments: [
        {
          name: "Shaurrya Sharma",
          comment:
            "It’s like a weight has been lifted off of my shoulders. Thank you so much for sharing this video. I will be sending this to all of my friends and family ASAP.",
          likes: 0,
          timestamp: Date.now(),
        },
        {
          name: "SHOORS",
          comment:
            "Let’s collaborate on a video for making more videos! I’ll have my associates contact yours.",
          likes: 0,
          timestamp: Date.now(),
        },
      ],
      id: uniqid(),
    };
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));
    res.json(videos);
  });

module.exports = router;