// gulpfile.js
var gulp = require('gulp');
var requireDir = require('require-dir');

var tasks = requireDir('./tasks');

var tasksPath = {
  rabbitMQ: requireDir('./tasks/rabbitMQ'),
  watcher2server: requireDir('./tasks/watcher2server')
}

const shell = require('gulp-shell')


gulp.task('test', tasks.test);
gulp.task('list2copy', tasks.list2copy);
gulp.task('sir', tasks.list2copy);

gulp.task('rabbitmq', tasksPath["rabbitMQ"].rabbitMQ);

gulp.task('watcher2server', tasksPath["watcher2server"].watcher2server);
// gulp.task('sass', tasks.sass);
// gulp.task('serve:dev', tasks.serve.dev);
// gulp.task('serve:dist', tasks.serve.dist);
//
// gulp.task('default', ['sass', 'serve:dev']);

gulp.task('server', tasks.nodeOnlineOffline);

gulp.task('memoByMongoDb', tasks.memoByMongoDb);
gulp.task('memo', tasks.memoByMongoDb);

gulp.task('nodeOnlineOffline', tasks.nodeOnlineOffline);
gulp.task('javascript', tasks.nodeOnlineOffline);
gulp.task('js', tasks.nodeOnlineOffline);
// gulp.task('server', shell.task([
//   'node app.js&'
//   ],
//   {cwd: "/Users/sirisak/Google Drive/Git_CLIENT/Node.js/node-OnlineOffline"}
// ));
