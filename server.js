const express = require('express');
const app = express();
const fs = require("fs");
const cors = require("cors");
var uniqid = require('uniqid'); 
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

const readVideo = (fileName) => {
    const fileContent = JSON.parse(fs.readFileSync(`./data/${fileName}.json`));
    return fileContent;
}

app.get("/videos", function(req, res) {
    const videos = readVideo("videos");    
    res.json(videos);
})

app.get('/videos/:id', (req, res) => {
    const videos = readVideo("videos");
    const video = videos.find(vid => vid.id === req.params.id);
    res.send(video);
});

app.post("/upload", function(req, res) {
    const videos = readVideo("videos");
    const newVideo = {
        "title": req.body.title,
        "channel": "Shoors",
        "image": "https://i.imgur.com/l2Xfgpl.jpg",
        "description": req.body.description,
        "views": "80085",
        "likes": "over 9000",
        "duration": "4:20",
        "video": "https://project-2-api.herokuapp.com/stream",
        "timestamp": Date.now(),
        "comments": [
            {
            "name": "Micheal Rideout",
            "comment": "Walnut donuts!",
            "likes": 0,
            "timestamp": Date.now()
            },
            {
            "name": "Dr Wong",
            "comment": "Wassup!",
            "likes": 0,
            "timestamp": Date.now()
            },
            {
            "name": "Cat",
            "comment": "Cat",
            "likes": 0,
            "timestamp": Date.now()
            }
        ],
        "id": uniqid()
    }     
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));    
    res.json(videos);
}) 


