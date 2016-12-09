'use strict';

var io = null, 
	PromiseSettle = require('promise-settle');

function escapeSpaces( path ) {
  if( path ) { return path.replace(/ /g, '\\ '); }
  else { return ''; }
}

function main( server, hardware ){
  io = require('socket.io').listen( server.listener );

  io.on('connection', function( socket ){
    console.log('socket listening...' + socket.id); // Record the connection

    socket.emit( 'event:hello' ); // Send message exclusively to new connection

    socket.on( 'disconnect', function(){
      console.log('goodbye socket...' + socket.id ); // Record the disconnection
    });

    socket.on( 'get:media:files', function( path ){
      	path = process.env.MEDIA_DIRECTORY + escapeSpaces( path );
		console.log( path, hardware );
      	hardware.dir.getFiles( path )
        .then( function(files){
          socket.emit( 'media:files:list', files);
        });
    });
  });

  return io;
}

module.exports = main;