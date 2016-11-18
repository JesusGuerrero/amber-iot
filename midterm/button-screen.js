var gpio = require('onoff').Gpio,
  button = new gpio(17, 'in', 'both'),
  usb = new gpio(5, 'high', 'rising'); 

button.setActiveLow( true );	

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));
  usb.writeSync( value ? 0 : 1 );
  console.log('Screen is ' + (value ? 'ON' : 'OFF'));
});

process.on('SIGINT', function(){
  button.unexport();
  usb.unexport();
  process.exit();
}); 