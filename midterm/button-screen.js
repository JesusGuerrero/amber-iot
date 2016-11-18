var gpio = require('onoff').Gpio,
  button = new gpio(17, 'in', 'both'),
  usb = new gpio(5, 'high', 'rising', {activeLow: true} ); 

button.setActiveLow( true );	

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  powercontrol.writeSync( value ? 1 : 0 );

  console.log('Screen is ' + (value ? 'ON' : 'OFF'));
});

process.on('SIGINT', function(){
  button.unexport();
  powercontrol.unexport();
  process.exit();
}); 