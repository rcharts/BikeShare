var myApp = angular.module('myApp', [])

myApp.controller('MainCtrl', function($scope, $http){
   var networks = $http.get('networks.json')
   networks.success(function(result){
      $scope.networks = _.pluck(result, 'name').sort()
   })
   $scope.network = 'citibikenyc'
   makeMap($scope.network)
   $scope.$watch('network', function(newNetwork){
     makeMap(newNetwork)
   })
})

function makeMap(network){
  var req = ocpu.call("makeMap", {
    network: network
  }, function(session){
    $("iframe").attr('src', session.getFileURL("output.html"));     
  }).fail(function(text){
    alert("Error: " + req.responseText);
  });
}
