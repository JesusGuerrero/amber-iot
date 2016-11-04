var Gpio      =   require('onoff').Gpio,	
    button    =   new Gpio(17, 'in', 'both'),	
    io        =   null,
    RaspiCam  =   require('raspicam'),
    camera    =   new RaspiCam({mode: 'photo', output: 'server/public/img/'+Date.now()+'.jpg'});

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  if (value) {
    var camTime = Date.now();
    camera.start();
    camera.set('output', 'server/public/img/'+camTime+'.jpg');

    camera.on('exit', function(){ 
      
      console.log('image saved as '+camTime+'.jpg');
      camera.stop();
      
      if( io ) {
        io.sockets.emit('event:camera', camTime);
      }
  }
    

});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});

module.exports = function( ioInstance ) {
  io = ioInstance;
}



