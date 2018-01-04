const shell = require('gulp-shell')
const Sugar = require('sugar')
Sugar.extend();

// gulp.task('siamhtml', function() {
//     // ให้แสดงข้อความ "SiamHTML" ออกมาทาง console
//     console.log('SiamHTML');
// });

var options = {}
var cwd = "/Users/sirisak/Google Drive/Git_CLIENT/Node.js/node-OnlineOffline"

// options["cwd"]=cwd
options = {cwd:cwd}

var commands =`
cd "${cwd}"
node app.js
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
  'echo "node app.js"',
  'node app.js'
], options)
