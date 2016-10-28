var RaspiCam = require('raspicam');

var camera = new RaspiCam({mode: 'photo', output: 'server/public/img/'+Date.now()+'.jpg'});

camera.start();

camera.on('exit', function(){ 
  console.log('image saved');
  camera.stop();
  camera.set('output', 'img/'+Date.now()+'.jpg');
  camera.start(); 
});