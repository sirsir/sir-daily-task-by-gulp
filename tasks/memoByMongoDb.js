const shell = require('gulp-shell')
const Sugar = require('sugar')
Sugar.extend();

// gulp.task('siamhtml', function() {
//     // ให้แสดงข้อความ "SiamHTML" ออกมาทาง console
//     console.log('SiamHTML');
// });

var options = {}
var cwd = "/Users/sirisak/Desktop/SharedLocal/BallOnly/github/memo-by-react-mongodb"

// options["cwd"]=cwd
options = {cwd:cwd}

// var commands =`
// mongod --bind_ip_all
// cd "${cwd}"
// API_PORT=3008 nodemon src/server.js &
// PORT=3009 API_IP=localhost node scripts/start.js &
// `

// module.exports = function () {
//
//   commands.trim().split("\n").forEach(function(c){
//     console.log(c);
//   })
//
//   return shell.task([
//     'node app.js'
//   ], options)
//
// };

module.exports = shell.task([
  'echo "cd \\"{0}\\""'.format(cwd),
  'echo "mongod --bind_ip_all &"',
  'mongod --bind_ip_all &',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "API_PORT=3008 nodemon src/server.js &"',
  'API_PORT=3008 nodemon src/server.js &',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "API_IP=localhost PORT=3009 node scripts/start.js &"',
  'API_IP=localhost PORT=3009 node scripts/start.js &',
  // 'API_IP=192.168.1.173 PORT=3009 node scripts/start.js &',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "Already run >> mongod --bind_ip_all &"',
  'echo "Already run >> API_PORT=3008 nodemon src/server.js &"', 
  'echo "Already run >> API_IP=localhost PORT=3009 node scripts/start.js &"',
  'echo "=== ps -al | grep node === >kill -9 pid4digit"'
], options)
