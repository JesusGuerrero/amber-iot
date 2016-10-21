var RaspiCam = require('raspicam');

var camera = new RaspiCam({mode: 'photo', output: Date.now()+'.jpg'});

camera.start();

camera.on('exit', function(){ 
  console.log('stopped');
  camera.stop();
  camera.set('output', Date.now() + '.jpg');
  camera.start(); 
});