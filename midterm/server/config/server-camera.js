var io        =   null,
    RaspiCam  =   require('raspicam'),
    camera    =   new RaspiCam({mode: 'photo', output: 'server/public/img/'+Date.now()+'.jpg'});

if( io ) {
	socket.on('event:button', function() {

	    var camTime = Date.now();
	    camera.set('output', 'server/public/img/'+camTime+'.jpg');
	    camera.start();

	    camera.on('exit', function(){ 
	      console.log('image saved as '+camTime+'.jpg');
	      camera.stop();
	      
	      // if( io ) {
	        io.sockets.emit('event:camera', camTime);
	        console.log('event:camera');
	      //}
	    });
	});
};

module.exports = function( ioInstance ) {
  io = ioInstance;
};