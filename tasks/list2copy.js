var gulp = require('gulp');

// gulp.task('siamhtml', function() {
//     // ให้แสดงข้อความ "SiamHTML" ออกมาทาง console
//     console.log('SiamHTML');
// });

var commands =`
gulp rabbitmq --user sirisak --messagesLength 10
gulp rabbitmq --user sirisak --messageId 10
gulp rabbitmq --user admin --messageId 10
gulp watcher2server
gulp memoByMongoDb
`

module.exports = function () {
  // สร้าง task ที่มีชื่อว่า "siamhtml"
      // ให้แสดงข้อความ "SiamHTML" ออกมาทาง console
      console.log('This list is for Copy&Paste');

      commands.trim().split("\n").forEach(function(c){
        console.log(c);
      })

};
