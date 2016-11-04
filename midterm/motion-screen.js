var gpio = require('onoff').Gpio,
  motion = new gpio(21, 'in', 'both'),
  powercontrol = new gpio(26, 'low'); // start with

motion.watch( function( err, val ) {
  if( err ) { console.log('Motion Error'); return; }

  console.log('Motion in 21: ' + (val ? 'ACTIVE' : 'INACTIVE') + ' ' + new Date().toLocaleString() );

  powercontrol.writeSync(val);

});

process.on('SIGINT', function(){
  motion.unexport();
  powercontrol.unexport();
  process.exit();
}); 