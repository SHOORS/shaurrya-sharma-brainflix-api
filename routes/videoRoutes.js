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
const gen = require("images-generator");
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

router.post("/upload", async function (req, res) {
    const videos = readVideo("videos");
    let catImage = await gen.animal.cat();
    const newVideo = {
      title: req.body.title,
      channel: "Shoors",
      image: catImage,
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
            "It’s like a weight has been lifted off of my cat's shoulders. Thank you so much for sharing this cat video. I will be sending this to all of my cat's friends and family ASAP.",
          likes: 0,
          timestamp: Date.now(),
        },
        {
          name: "SHOORS",
          comment:
            "Let’s collaborate on a video for filming more cats! I’ll have my cat associates contact your cat.",
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