var Gpio = require('onoff').Gpio,	
  button = new Gpio(17, 'in', 'both');	

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));
});

process.on('SIGINT', function(){
  button.unexport();
  process.exit();
});