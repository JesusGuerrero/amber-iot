var gpio = require('onoff').Gpio,
  button = new gpio(17, 'in', 'both'),
  powercontrol = new gpio(26, 'out'),
  powerstate = 0;

button.setActiveLow( true );	

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  powercontrol.writeSync( powerstate );
  powerstate = powerstate ? 0 : 1;

  console.log('Screen is ' + (value ? 'ON' : 'OFF'));
});

process.on('SIGINT', function(){
  button.unexport();
  powercontrol.unexport();
  process.exit();
}); 