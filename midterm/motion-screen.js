var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  usb = new gpio(5, 'high', 'rising', {activeLow: true} ),
  //usbState = 0,
  countdown; 

motion.watch( function( err, val ) {
  if( err ) { console.log('Motion Error'); return; };

  if (motion.readSync() == 0 & usb.readSync() == 0) {
  	countdown = setTimeout(function(){
  		usb.writeSync(0);
  		//usbState = 0;
  	}, 30000);
  };

  if (motion.readSync() == 1) {
  	clearTimeout(countdown);
  	usb.writeSync(1);
  	//usbState = 1;
  };

  console.log('Motion in 21: ' + (val ? 'ACTIVE' : 'INACTIVE') + ' ' + new Date().toLocaleString() );
  //usb.writeSync( val ? 1 : 0 );
});

process.on('SIGINT', function(){
  motion.unexport();
  usb.unexport();
  process.exit();
}); 