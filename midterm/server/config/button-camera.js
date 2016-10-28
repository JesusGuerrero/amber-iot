var Gpio      =   require('onoff').Gpio,	
    button    =   new Gpio(17, 'in', 'both'),	
    io        =   null,
    RaspiCam  =   require('raspicam'),
    camera    =   new RaspiCam({mode: 'photo', output: 'server/public/img/'+Date.now()+'.jpg'});

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  camera.start();

  camera.on('exit', function(){ 
    console.log('image saved');
    camera.stop();
    camera.set('output', 'img/'+Date.now()+'.jpg');

    if( io ) {
      io.sockets.emit('event:camera', val);
    }

  });
});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}



