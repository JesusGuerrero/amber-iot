var Gpio = require('onoff').Gpio,	
  button = new Gpio(17, 'in', 'both');	

var RaspiCam = require('raspicam');
var camera = new RaspiCam({mode: 'photo', output: 'server/public/img/'+Date.now()+'.jpg'});

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  camera.start();

  camera.on('exit', function(){ 
    console.log('image saved');
    camera.stop();
    camera.set('output', 'img/'+Date.now()+'.jpg');
  });
});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});




