var app=angular.module("app",["ngRoute","ngTouch"]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"views/home.php",controller:"homeCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("allCtrl",function(){}),app.controller("homeCtrl",function($scope,$http){function api(url){$http({method:"GET",url:url}).success(function(response){$scope.goSearch=!1,console.log(response),console.log(response.cod),"404"!==response.cod&&($scope.result=!0)}).error(function(headers,status,config){$scope.goSearch=!1,console.log(headers),console.log(status),console.log(config)})}$scope.goSearch=!1,$scope.result=!1,$scope.search=function(city){if($scope.searchCity.city.$error.minlength!==!0&&void 0!==city&&""!==city){$scope.goSearch=!0;var url="http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&mode=json&units=metric&cnt=10&lang=fr&type=accurate";api(url)}}}),app.directive("header",function(){return{restrict:"E",replace:"true",templateUrl:"views/header.php"}}),app.directive("footer",function(){return{retrict:"E",replace:"true",templateUrl:"views/footer.php",link:function(scope){scope.tab1=!0,scope.changeActive=function(){scope.tab1===!0?scope.tab1=!1:scope.tab1=!0}}}});