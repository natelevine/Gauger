var fs = require('fs');
var OscClientClass = require('osc-client').OscClient;

var domain = '192.168.1.1';
var port = '80';
var client = new OscClientClass(domain, port);
var sessionId;
var filename;

client.startSession().then(function (res) {
  //grab session id
  sessionId = res.body.results.sessionId;
  console.log('started session: ', sessionId);
  return client.takePicture(sessionId);
})
.then(function (res) {
  var pictureUri = res.body.results.fileUri;
  var path = pictureUri.split('/');
  filename = path.pop();
  return client.getImage(pictureUri);
})
.then(function (res) {
  var imgData = res.body;
  fs.writeFile(filename, imgData);
  return client.closeSession(sessionId);
});
