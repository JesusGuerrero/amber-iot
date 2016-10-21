var Gpio = require('onoff').Gpio,	
  button = new Gpio(17, 'in', 'both');	

var RaspiCam = require('raspicam');
var camera = new RaspiCam({mode: 'photo', output: 'img/'+Date.now()+'.jpg'});

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  camera.start();
});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});




