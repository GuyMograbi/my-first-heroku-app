var express = require('express');
var _ = require('lodash');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var sass = require('node-sass');

var videos = {  };

try{

    videos = require('./data.json');
}catch(e){ console.log(e);}


function save() {
    fs.writeFileSync('data.json', JSON.stringify(videos, {}, 4));
}


app.use(express.static('.'));
app.use(bodyParser.json());

app.post('/videos', function(req, res){
    var newVideo = req.body;
    newVideo.id = '_id' + new Date().getTime();
    newVideo.added = new Date().getTime();
    newVideo.rating = { value : 0, votes: 0};
    newVideo.comments = [];
    console.log(req.body);
    videos[newVideo.id] = newVideo;
    res.send(newVideo);
    save();
});

app.get('/main.css', function(req, res){
    sass.render({
        file: './app/style/main.scss'
}, function(err, result) {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.send(result.css);
        }
    });
});

app.get('/videos/:videoId', function (req, res) {
    res.send(videos[req.params.videoId]);
});

app.get('/videos', function( req, res){
    res.send((_.reverse(_.sortBy(_.values(videos),'rating.value'))));
});

app.get('/videos/:videoId/rating', function(req, res){
    res.send(videos[req.params.videoId].rating);
});

app.post('/videos/:videoId/rating', function(req, res){
    var video = videos[req.params.videoId];
    var newRating = req.body.rating;
    video.rating.value = ( video.rating.votes * video.rating.value + newRating ) / ( video.rating.votes + 1 );
    video.rating.votes ++;
    res.send(video.rating);
    save();
});

app.post('/videos/:videoId/comment', function(req, res){
   videos[req.params.videoId].comments.push(req.body.comment);
    res.send();
    save();
});



app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});