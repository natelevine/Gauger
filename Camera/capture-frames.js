var Ffmpeg = require('fluent-ffmpeg');

module.exports = function (filepath, count, callback) {

  var computeTime = function(length, count) {
    var timemarks = [];
    var timemark = 1;
    if (count > length-1) {
      console.log('cannot clip ' + count + ' frames');
    }
    var interval = length / count;
    while (timemark <= length) {
      timemarks.push(timemark);
      timemark += interval;
    }
    return timemarks;
  };

  Ffmpeg.ffprobe(filepath, function(err, metadata) {
    var duration = metadata.format.duration;
    var proc = new Ffmpeg(filepath);

    console.log('taking key frames')
    proc.takeScreenshots({
      count: count,
      timemarks: computeTime(duration, count),
    }, './', function (err, filenames) {
      console.log('saved screenshots: ', filenames);
    });
  });
};
