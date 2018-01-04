#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var archiver = require('archiver');

var argv = require('yargs').argv;
// var isProduction = (argv.production === undefined) ? false : true;

var Sugar = require('sugar')
Sugar.extend();

console.log(argv)
var server = (argv.server === undefined) ? '192.168.1.70/Home1/Sirisak/Watcher' : argv.server ;
// var path2zip = (argv.path2zip === undefined) ? "" : Number(argv.messagesLength) ;
var srcDirectory = (argv.srcDirectory === undefined) ? "/Users/sirisak/Desktop/SharedLocal/AMIVOICE/projects/AmivoiceWatcher/amivoice_watcher/AmiVoiceWatcher2/AmivoiceWatcherDotNet/AmivoiceWatcherDotNet/bin/x86/release" : argv.srcDirectory ;

var date = (new Date()).format("%Y%m%d")

// console.log(__filename);
// console.log(path.join(__filename, '../html/1.html'));
// amqp.connect('amqp://192.168.1.140:15672', function(err, conn) {});

var here = {
  readfile: function(filename){
    return fs.readFileSync(path.join(__filename, '../html',filename)).toString()
  },

  prepareOutput: function() {
    var filename = path.join(srcDirectory,"..",(new Date()).format("AmivoiceWatcher%Y%m%d-%H%M%S.zip"))
    return filename;
  }
}

var outputPath = here.prepareOutput()
var output,zipArchive
function doZip(){
  output = fs.createWriteStream(outputPath)
  zipArchive = archiver('zip');
}


//~~ upload
var upload_config ={
  file: outputPath,
  user: 'admin',
  password: 'password',
  host: '192.168.1.70',
  port: '22',
  path: '/volume1/Home1/Sirisak/Watcher/1'
}

//~ npm scp
function scpUpload(){
  var scp = require('scp');

  var scp_options = {
    file: outputPath,
    user: 'admin',
    password: 'password',
    host: '192.168.1.70',
    port: '22',
    path: ''
  }

  var pathServer = path.basename(outputPath)


  pathServer = path.join('/volume1/Home1/Sirisak/Watcher/ReleasesFromScp',pathServer)

  scp_options.path = pathServer



  scp.send(scp_options, function (err) {
    if (err) console.log(err);
    else console.log('File transferred to ' + scp_options.path);
  });
}



//~npm scp2
var Client = require('scp2').Client
var client = new Client({
    port: 22
});

client.defaults({
    port: 22,
    host: '192.168.1.70',
    username: 'admin',
    // privateKey: 'SHA256:uIunzZ0eEp14NKxdU6Ea0qFcUHmMDfYU24iZ8MavZbo',
    password: 'password'
});


// var scp_command = "scp {0} {1}".format(
//   outputPath,
//   "admin:password@192.168.1.70:/volume1/Home1/Sirisak/Watcher/"
// )


//~ chilkat

function chilkatUpload() {

  var os = require('os');
  if (os.platform() == 'win32') {
      var chilkat = require('chilkat_node7_win32');
  } else if (os.platform() == 'linux') {
      if (os.arch() == 'arm') {
          var chilkat = require('chilkat_node7_arm');
      } else if (os.arch() == 'x86') {
          var chilkat = require('chilkat_node7_linux32');
      } else {
          var chilkat = require('chilkat_node7_linux64');
      }
  } else if (os.platform() == 'darwin') {
      var chilkat = require('chilkat_macosx');
  }


    //  Important: It is helpful to send the contents of the
    //  LastErrorText property when requesting support.

    var ssh = new chilkat.Ssh();

    //  Any string automatically begins a fully-functional 30-day trial.
    var success = ssh.UnlockComponent("30-day trial");
    if (success !== true) {
        console.log(ssh.LastErrorText);
        return;
    }

    //  Connect to an SSH server:
    var hostname;
    var port;

    //  Hostname may be an IP address or hostname:
    hostname = upload_config.host;
    port = 22;

    success = ssh.Connect(hostname,port);
    if (success !== true) {
        console.log(ssh.LastErrorText);
        return;
    }

    //  Wait a max of 5 seconds when reading responses..
    ssh.IdleTimeoutMs = 5000;

    //  Authenticate using login/password:
    success = ssh.AuthenticatePw(upload_config.user,upload_config.password);
    if (success !== true) {
        console.log(ssh.LastErrorText);
        return;
    }

    //  Once the SSH object is connected and authenticated, we use it
    //  as the underlying transport in our SCP object.
    var scp = new chilkat.Scp();

    //  There is no UnlockComponent method for the SCP object because it uses the SSH object
    //  (which must've been unlocked to establish the connection).
    success = scp.UseSsh(ssh);
    if (success !== true) {
        console.log(scp.LastErrorText);
        return;
    }

    //  This uploads a file to the "uploads/text" directory relative to the HOME
    //  directory of the SSH user account.  For example, if the HOME directory is /home/chilkat,
    //  then this uploads to /home/chilkat/uploads/text/test.txt
    //  Note: The remote target directory must already exist on the SSH server.
    // var remotePath = "uploads/text/test.txt";
    // var localPath = "/home/bob/test.txt";
    // var remotePath = upload_config.path;
    // var localPath = upload_config.file;
    // success = scp.UploadFile(localPath,remotePath);
    // if (success !== true) {
    //     console.log(scp.LastErrorText);
    //     return;
    // }

    //  This upload fully specifies the absolute remote path.
    // remotePath = "/home/chilkat/junk/abc/hamlet.xml";
    // localPath = "/home/bob/hamlet.xml";
    var remotePath = upload_config.path;
    var localPath = upload_config.file;
    success = scp.UploadFile(localPath,remotePath);
    if (success !== true) {
        console.log(scp.LastErrorText);
        return;
    }

    console.log("SCP upload file success.");

    //  Disconnect
    ssh.Disconnect();

}

module.exports = function () {

  doZip()
  output.on('close', function() {

    console.log('done with the zip', outputPath);

    // chilkatUpload()

    scpUpload()

    // client.upload(outputPath, '/volume1/Home1/Sirisak/Watcher/2.zip', function(err) {
    //   console.log('ssh error:', err);
    // })

    // exec('ping localhost', function (err, stdout, stderr) {
    //   console.log(stdout);
    //   console.log(stderr);
    //   // cb(err);
    // });

  });

  zipArchive.pipe(output);

  // zipArchive.bulk([
  //     { src: [ '**/*' ], cwd: srcDirectory, expand: true }
  // ]);

  // zipArchive.glob(srcDirectory+'/**/*');

  zipArchive.directory(srcDirectory, false);

  zipArchive.finalize(function(err, bytes) {

      if(err) {
        throw err;
      }

      console.log('done:', base, bytes);



      // scp.send(scp_options, function (err) {
      //   if (err) console.log(err);
      //   else console.log('File transferred.');
      // });

      // client.scp(outputPath, 'admin:password@192.168.1.70:/volume1/Home1/Sirisak/Watcher/2.zip', function(err) {
      //   console.log('ssh error:', err);
      // })

  });
};
