var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  usb = new gpio(5, 'high', 'rising', {activeLow: true} ); 

motion.watch( function( err, val ) {
  if( err ) { console.log('Motion Error'); return; }
  console.log('Motion in 21: ' + (val ? 'ACTIVE' : 'INACTIVE') + ' ' + new Date().toLocaleString() );
  usb.writeSync( val ? 1 : 0 );
});

process.on('SIGINT', function(){
  motion.unexport();
  usb.unexport();
  process.exit();
}); 