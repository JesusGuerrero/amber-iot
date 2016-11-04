var socket = io();

socket.on('event:hello', function(){
  console.log('Hello from server through socket');
});

angular.module('fridge-client', [])
  .controller('MainCtrl', ['$scope', function( $scope ) {
    $scope.camera = false;
    socket.on('event:camera', function( val ) {
      $scope.$apply( function() {
        $scope.camera = val ? true : false;
      });
    });
  }]);