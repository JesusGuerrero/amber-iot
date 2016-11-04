var gpio = require('onoff').Gpio,
  button = new gpio(17, 'in', 'both'),
  powercontrol = new gpio(26, 'out');

button.setActiveLow( true );		

button.watch(function(err, value) {	
  console.log('Button is ' + (value ? 'ON' : 'OFF'));

  powercontrol.writeSync(val);
});

process.on('SIGINT', function(){
  button.unexport();
  powercontrol.unexport();
  process.exit();
}); 