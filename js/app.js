var app=angular.module("app",["ngRoute","ngTouch"]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"views/home.php",controller:"homeCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("allCtrl",function(){}),app.controller("homeCtrl",function($scope){});