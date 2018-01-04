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

var commands =`
mongodb
cd "${cwd}"
nodemon src/server.js &
node scripts/start.js &
`

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
  'mongod &',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'nodemon src/server.js &',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'echo "//"',
  'node scripts/start.js &'
], options)
