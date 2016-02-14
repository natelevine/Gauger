var express = require('express');
var fs = require('fs');
var router = express.Router();
var oxfordEmotion = require("node-oxford-emotion")("469c8f0fbaa040dbb5ca1442d6a39924");
var _ = require('underscore');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function binaryRead(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap.toString('binary'),'binary');
}

function emotionAvg(data) {

}

router.get('/api/photo', function(req, res, next) {
  // If reading from web image (with dummy url)
  // var emotion = oxfordEmotion.recognize("url", "http://www.whitewallservices.com/wp-content/uploads/2014/07/Round-of-applause.jpg", function(cb) {
  //   console.log(cb);
  // });

  // If reading from local
  var imageData = binaryRead('./public/images/test3.jpg');
  var emotion = oxfordEmotion.recognize("image", imageData, function(data) {
    console.log(typeof data);
    console.log(JSON.parse(data).length, 'length of data');
    var parsedData = JSON.parse(data);
    // console.log(parsedData);
    var reducedData = _.reduce(parsedData, function(prev, curr) {
      prev.anger === undefined  ? prev.anger = 0 : prev.anger += curr.scores.anger / parsedData.length;
      prev.neutral === undefined  ? prev.neutral = 0 : prev.neutral += curr.scores.neutral / parsedData.length;
      prev.sadness === undefined  ? prev.sadness = 0 : prev.sadness += curr.scores.sadness / parsedData.length;
      prev.surprise === undefined  ? prev.surprise = 0 : prev.surprise += curr.scores.surprise / parsedData.length;
      prev.happiness === undefined  ? prev.happiness = 0 : prev.happiness += curr.scores.happiness / parsedData.length;
      prev.fear === undefined  ? prev.fear = 0 : prev.fear += curr.scores.fear / parsedData.length;
      prev.disgust === undefined  ? prev.disgust = 0 : prev.disgust += curr.scores.disgust / parsedData.length;
      prev.contempt === undefined  ? prev.contempt = 0 : prev.contempt += curr.scores.contempt / parsedData.length;

      // prev.anger += curr.scores.anger / parsedData.length;
      // prev.neutral += curr.scores.neutral / parsedData.length;
      // prev.sadness += curr.scores.sadness / parsedData.length;
      // prev.surprise += curr.scores.surprise / parsedData.length;
      // prev.happiness += curr.scores.happiness / parsedData.length;
      // prev.fear += curr.scores.fear / parsedData.length;
      // prev.disgust += curr.scores.disgust / parsedData.length;
      // prev.contempt += curr.scores.contempt / parsedData.length;
      return prev;
    }, {})

    console.log(reducedData);
    res.send(reducedData);
  });
})


module.exports = router;
