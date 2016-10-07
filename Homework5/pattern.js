var Gpio = require('onoff').Gpio,	//onoff module (use npm install onoff)
  button = new Gpio(17, 'in', 'both');	//setup GPIO17 as output
  led = new Gpio(27, 'out'),      //setup GPIO27 as output

button.setActiveLow( true );		//optional to reverse button value
ledState = 0; 		  //internal variable to track LED state (1 = on, 0 = off)


button.watch(function(err, value) {	//watch button changes
  console.log('Button is ' + (value ? 'ON' : 'OFF'));  
  
  timer = setInterval( function(){
    //led.writeSync( ledState );	  
    led.writeSync(led.readSync() ^1);   
  }, 500);
	
  setTimeout(function(){
    clearInterval(timer);
    led.writeSync(0);
  }, 5000);

  
});


process.on('SIGINT', function(){
  button.unexport();
  led.unexport();
  process.exit();
});