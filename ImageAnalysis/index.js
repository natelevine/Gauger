var fs = require('fs');
var oxfordEmotion = require("node-oxford-emotion")("469c8f0fbaa040dbb5ca1442d6a39924");
var _ = require('underscore');

function binaryRead(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap.toString('binary'),'binary');
}


// If reading from web image (with dummy url)
// var emotion = oxfordEmotion.recognize("url", "http://www.whitewallservices.com/wp-content/uploads/2014/07/Round-of-applause.jpg", function(cb) {
//   console.log(cb);
// });

module.exports = function (filepath, callback) {

  // If reading from local
  console.log('got in emotion module');
  var imageData = binaryRead(filepath);
  var emotion = oxfordEmotion.recognize("image", imageData, function(data) {
    var parsedData = JSON.parse(data);
    var length = parsedData.length;
    // console.log(parsedData);

    // If relevant emotions are found
    if (parsedData.length > 0) {
      var reducedData = _.reduce(parsedData, function(memo, curr) {
        // memo.anger += curr.scores.anger;
        // memo.neutral === undefined ? memo.neutral = 0 : memo.neutral += curr.scores.neutral / parsedData.length;
        // memo.sadness === undefined ? memo.sadness = 0 : memo.sadness += curr.scores.sadness / parsedData.length;
        // memo.surprise === undefined ? memo.surprise = 0 : memo.surprise += curr.scores.surprise / parsedData.length;
        memo.pos += curr.scores.happiness;
        // memo.fear === undefined ? memo.fear = 0 : memo.fear += curr.scores.fear / parsedData.length;
        memo.neg += curr.scores.disgust + curr.scores.contempt + curr.scores.anger + curr.scores.sadness;
        // prev.anger += curr.scores.anger / parsedData.length;
        // prev.neutral += curr.scores.neutral / parsedData.length;
        // prev.sadness += curr.scores.sadness / parsedData.length;
        // prev.surprise += curr.scores.surprise / parsedData.length;
        // prev.happiness += curr.scores.happiness / parsedData.length;
        // prev.fear += curr.scores.fear / parsedData.length;
        // prev.disgust += curr.scores.disgust / parsedData.length;
        // prev.contempt += curr.scores.contempt / parsedData.length;
        return memo;
      }, {'pos': 0, 'neg': 0});
      // adjust to averages (disgust, contempt, sadness, and anger are combined)
      reducedData.pos /= length;
      reducedData.neg /= (length * 4);
    } else {
    // None of the relevant emotions were found
      reducedData = {'pos': 0, 'neg': 0};
    }
    callback(reducedData);
  });
};
