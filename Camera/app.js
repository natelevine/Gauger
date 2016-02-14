var fs = require('fs');
var ThetaSOscClient = require('osc-client-theta_s').ThetaSOscClient;
var Ffmpeg = require('fluent-ffmpeg');
var getFrames = require('./capture-frames.js');
var Emotion = require('../ImageAnalysis/index.js');

var domain = '192.168.1.1';
var port = '80';

var thetaClient = new ThetaSOscClient(domain, port);
var sessionId;
var fileName;

// module.exports = function (socket) {

  thetaClient.startSession().then(function (res) {
    //Grab the session id
    sessionId = res.body.results.sessionId;
    return thetaClient.setOptions(sessionId, {captureMode:"_video"})
  })
  .then(function (res) {
    console.log('starting capture');
    return thetaClient.startCapture(sessionId);
  })
  .catch(function (error) {
    console.log(error);
  });


  // Stop capturing after a certain interval in ms
  var interval = 5000;
  // Number of keyframes to grab
  var count = 3;

  setTimeout(function () {
    console.log('stopping capture');
    thetaClient.stopCapture(sessionId)
    .then(function (res) {
      console.log('stopped capture, writing file');
      // need to get the unique video uri
      return thetaClient.listAll({entryCount:1, sort:"newest"});
    })
    .then(function (res) {
      fileName = res.body.results.entries[0].name;
      console.log(fileName);
      return thetaClient.getVideo(res.body.results.entries[0].uri, "full");
    })
    .then(function (res) {
      fs.writeFile(fileName, res.body);
      //somehow emit the data through the socket to front end
    })
    .then(function (err) {
      //don't close session yet
      //call python script with the fileName
      console.log('closing the session');
      return thetaClient.closeSession(sessionId);
    })
    // clip keyframes and save them
    .then(function () {
      getFrames(fileName, count);
      setTimeout(function () {
        Emotion('/Users/natelevine/DevWeek16/Hackathon/Gauger/tn_1.png',
        function (data) {
          console.log('1: ', data);
          // socket.emit('dataUpdate', data);
        });
        Emotion('/Users/natelevine/DevWeek16/Hackathon/Gauger/tn_2.png',
        function (data) {
          console.log('2: ', data);
          // socket.emit('dataUpdate', data);
        });
        Emotion('/Users/natelevine/DevWeek16/Hackathon/Gauger/tn_3.png',
        function (data) {
          console.log('3: ', data);
          // socket.emit('dataUpdate', data);
        });
      }, 5000)
    })
    //then for each keyframe (3), call the emotion module w/ callback
    // .then(function () {
    //
    // })
    .catch(function (error) {
      console.log(error);
    });
  }, interval);
// };

// function analyzeEmotion () {
//   //callback: take the numbers and emit them through the socket to the front end
//   Emotion('../tn_2.png', function (data) {console.log(data);});
// }
