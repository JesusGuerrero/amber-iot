var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  usb = new gpio(5, 'high', 'rising', {activeLow: true} ),
  countdown = null; 

motion.watch( function( err, val ) {
  if( err ) { console.log('Motion Error'); return; };

  if (val == 0 & usb.readSync() == 1) {
  	countdown = setTimeout(function(){
  		usb.writeSync(0);
  	}, 2000);
  };

  if (val == 1) {
  	if (countdown) {
  		clearTimeout(countdown);
  		countdown = null;
  	}
  	usb.writeSync(1);
  };

  console.log('Motion in 21: ' + (val ? 'ACTIVE' : 'INACTIVE') + ' ' + new Date().toLocaleString() );
});

process.on('SIGINT', function(){
  motion.unexport();
  usb.unexport();
  process.exit();
}); 