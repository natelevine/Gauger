var fs = require('fs');
var ThetaSOscClient = require('osc-client-theta_s').ThetaSOscClient;
var Ffmpeg = require('fluent-ffmpeg');
var getFrames = require('./capture-frames.js');

var domain = '192.168.1.1';
var port = '80';

var thetaClient = new ThetaSOscClient(domain, port);
var sessionId;
var fileName;

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
var count = 2;

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
  })
  .then(function (err) {
    console.log('closing the session');
    return thetaClient.closeSession(sessionId);
  })
  // clip keyframes and save them
  .then(function () {
    return getFrames(fileName, count);
  })
  .catch(function (error) {
    console.log(error);
  });
}, interval);
