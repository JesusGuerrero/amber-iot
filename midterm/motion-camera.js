var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both');

var RaspiCam = require('raspicam');
var camera = new RaspiCam({mode: 'photo', output: 'img/'+Date.now()+'.jpg'});

motion.watch( function( err, val ) {
  if( err ) { console.log('Motion Error'); return; }

  console.log('Motion in 21: ' + (val ? 'ACTIVE' : 'INACTIVE') + ' ' + new Date().toLocaleString() );

  camera.start();

  camera.on('exit', function(){ 
    console.log('image saved');
    camera.stop();
    camera.set('output', 'img/'+Date.now()+'.jpg');
  });

});

process.on('SIGINT', function(){
  motion.unexport();
  process.exit();
}); 