var PythonShell = require('python-shell');

var options = {
  mode: 'text',
  pythonPath: '/usr/local/bin/python',
  pythonOptions: [],
  scriptPath: './Speech2Text',
  args: []
};
//'/Users/natelevine/DevWeek16/Hackathon/Gauger/Speech2Text/R0010125.MP4'

PythonShell.run('analyze_untabbed.py', options, function (err, results) {
  if (err) throw err;

  console.log('results: ', results);
})

// var pyshell = new PythonShell();
//
// pyshell.send('/Users/natelevine/DevWeek16/Hackathon/Gauger/Speech2Text/R0010125.MP4');
//
// pyshell.on('message', function(message) {
//   console.log('message from py script: ', message);
// });
//
// pyshell.end(function (err) {
//   if (err) throw err;
//   console.log('finished');
// });
