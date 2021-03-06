#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var amqp = require('amqplib/callback_api');

var argv = require('yargs').argv;
// var isProduction = (argv.production === undefined) ? false : true;

var Sugar = require('sugar')
Sugar.extend();

// console.log(argv)
var user = (argv.user === undefined) ? 'sirisak' : argv.user ;
var messagesLength = (argv.messagesLength === undefined) ? 0 : Number(argv.messagesLength) ;

var messageId = (argv.messageId === undefined) ? 0 : Number(argv.messageId) ;

// console.log(__filename);
// console.log(path.join(__filename, '../html/1.html'));
// amqp.connect('amqp://192.168.1.140:15672', function(err, conn) {});

var here = {
  readfile: function(filename){
    return fs.readFileSync(path.join(__filename, '../html',filename)).toString()
  }
}

module.exports = function () {

  console.log('amqp.connect()')
  amqp.connect('amqp://admin:admin@192.168.1.50/aohs', function(err, conn) {
    // console.log(err)
    // conn.createChannel(function(err, ch) {
    console.log('conn.createConfirmChannel()')
    conn.createConfirmChannel(function(err, ch) {
      var q = 'amiwatcher.'+user;
      // var msg = 'Hello World!';
      console.log('channel created.')

      console.log('Init msgs[]')
      var msgs = [
        {
          "timestamp": "",
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	// "level": "warning",
        	"title": "<span style=\"color:#0070c0\">Recommend Talk Script</span>",
        	"subject": "\u003cp\u003eJust now you said ไม่เข้าใจ\u003cbr\u003e\u003c/p\u003e",
        	"content_type": "keyword",
        	"content": here.readfile('1pop.html'),
        	"content_details": here.readfile('1.html')
        },
        {
          "timestamp": "",
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	// "level": "warning",
        	"title": "<span style=\"color:#0070c0\">Recommend Talk Script</span>",
        	"subject": "\u003cp\u003eCustomer said ฝากคนอื่นไปจ่าย\u003cbr\u003e\u003c/p\u003e",
        	"content_type": "faq",
        	"content": here.readfile('1pop.html'),
        	"content_details": here.readfile('1 3.html')
        },
        // {
        // 	"timeout": 3,
        // 	"height": 100,
        // 	"width": 350,
        // 	"play_sound": false,
        // 	// "level": "warning",
        //   // "title": "WARNING",
        //   "title": "<span style=\"color:red\">WARNING</span>",
        // 	// "title": "<div style=\"color:red\">WARNING</div>",
        // 	"subject": "WARNING",
        // 	"content_type": "Xkeyword",
        // 	"content": here.readfile('1pop.html'),
        // 	"content_details": here.readfile('1.html')
        // },
        {
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	"level": "warning",
          // "title": "WARNING",
          "title": "<span style=\"color:red\">WARNING</span>",
        	// "title": "<div style=\"color:red\">WARNING</div>",
        	"subject": "WARNING",
        	"content_type": "Xkeyword",
        	"content": here.readfile('1pop 2.html'),
        	"content_details": here.readfile('1 2.html')
        },
        {
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	"level": "warning",
          // "title": "WARNING",
          "title": "<span style=\"color:red\">WARNING</span>",
        	// "title": "<div style=\"color:red\">WARNING</div>",
        	"subject": "WARNING",
        	"content_type": "Xkeyword",
        	"content": here.readfile('1pop 2.html'),
        	"content_details": here.readfile('1 4.html')
        },
        {
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	"level": "warning",
          // "title": "WARNING",
          "title": "<span style=\"color:red\">WARNING</span>",
        	// "title": "<div style=\"color:red\">WARNING</div>",
        	"subject": "WARNING",
        	"content_type": "Xkeyword",
        	"content": here.readfile('1pop 2.html'),
        	"content_details": here.readfile('1 5.html')
        },
        {
          "timestamp": "",
        	"timeout": 3,
        	"height": 100,
        	"width": 350,
        	"play_sound": false,
        	// "level": "warning",
        	"title": "<span style=\"color:#0070c0\">Recommend Talk Script</span>",
        	"subject": "\u003cp\u003eCustomer said ฝากคนอื่นไปจ่าย\u003cbr\u003e\u003c/p\u003e",
        	"content_type": "faq",
        	"content": here.readfile('1pop.html'),
        	"content_details": here.readfile('1 6.html')
        }

      ]

      ch.assertQueue(q, {durable: true});
      // Note: on Node 6 Buffer.from(msg) should be used

      // let num2send = 10;
      pAll = []

      if (messagesLength < 1){
        let i=messageId
        console.log("Sending %s", i);

        // let msg = Object.clone(msgs.sample())
        let msg = Object.clone(msgs[i%msgs.length])

        console.log("title: %s", msg.subject);

        msg["timestamp"]=(new Date()).format("%Y-%m-%d %H:%M:%S")
        // msg["title"] = "{0} ({1})".format(msg["title"] ,i+1);

        msgStr = JSON.stringify(msg)

        ch.sendToQueue(q, new Buffer(msgStr));
      }else{
        for (var i=0;i<messagesLength; i++){
          // msgs.each(function(e,j){
          //   msg = JSON.stringify(msgs[j])
          //
          //   ch.sendToQueue(q, new Buffer(msg));
          //   console.log(" [x] Sent %s", msg);
          // })

          // let p = new Promise((resolve, reject) => {
          //   console.log("Sent %s", i);
          //
          //   let msg = Object.clone(msgs.sample())
          //
          //   console.log("title: %s", msg.subject);
          //
          //   msg["timestamp"]=(new Date()).format("%Y-%m-%d %H:%M:%S")
          //   msg["title"] = "{0} ({1})".format(msg["title"] ,i);
          //
          //
          //   msgStr = JSON.stringify(msg)
          //
          //   ch.sendToQueue(q, new Buffer(msgStr));
          //
          //   // ch.sendToQueue(q, new Buffer(msgStr), {}, function(err, ok) {
          //   //   console.log(i + " sent")
          //   //
          //   //   if (err !== null) fulfill('Message sent!');
          //   //   else reject('Message not sent');
          //   // });
          //
          // });

          // pAll.push(p)


            console.log("Sending %s", i);

            // let msg = Object.clone(msgs.sample())
            let msg = Object.clone(msgs[i%msgs.length])

            console.log("title: %s", msg.subject);

            msg["timestamp"]=(new Date()).format("%Y-%m-%d %H:%M:%S")
            msg["title"] = "{0} ({1})".format(msg["title"] ,i+1);

            setTimeout(function(){

                // alert('hello');
            }, 1000);


            msgStr = JSON.stringify(msg)

            ch.sendToQueue(q, new Buffer(msgStr));

            // ch.sendToQueue(q, new Buffer(msgStr) ,{},function(e,r){console.log("callback[Hello2]: ",e,r)});

          // console.log(" [x] Sent %s", msg);


            // setTimeout(
            //   function() {
            //     msg = JSON.stringify(msgs.sample())
            //
            //     console.log("title: %s", msg.subject);
            //
            //     msg["timestamp"]=(new Date()).format("%H:%M:%S")
            //
            //     ch.sendToQueue(q, new Buffer(msg));
            //     console.log(" [x] Sent %s", msg);
            //   },
            //   2000
            // );

        }
      }



      // setTimeout(function() { conn.close(); process.exit(0) }, 500);

      // Promise.all(pAll).then(function (){
      //   setTimeout(function() { conn.close(); process.exit(0) }, 500);
      // });
      // ch.waitForConfirms(function(err){
      //   if(err){
      //     console.error(err);
      //   }else{
      //     console.log('All message done');
      //     setTimeout(function() { conn.close(); process.exit(0) }, 500);
      //     // con.close();
      //   }
      //
      // });

      // ch.waitForConfirms().then(function() { conn.close(); process.exit(0) });
      ch.waitForConfirms(function() { conn.close(); process.exit(0) });
      return;
    });
    return;
  });
  return;
};
