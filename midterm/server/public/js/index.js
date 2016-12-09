var socket = io();

socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

angular.module('fridge-client', [])
  .controller('MainCtrl', ['$scope', function( $scope ) {
    socket.on('event:camera', function( camTime ) {
      $scope.$apply( function() {
        $scope.camera = camTime;
        console.log('camTime = '+camTime);
      });
    });

    $scope.capture = function() {
    	if( io ) {
	    	socket.emit('event:button');
	    	console.log('event:button');
	    };
    };

    socket.on('media:files:list', function( files ) {
      $scope.$apply( function() {
        $scope.gallery = [files];
        console.log(files);
      });
    });
}]);