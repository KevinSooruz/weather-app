// Initialisation d'angular
var app = angular.module("app", ["ngRoute", "ngTouch", "services"]);

// Initialisation des services personnalisés
var services = angular.module("services", []);

// Gestion des routes
app.config(["$routeProvider", function($routeProvider){
        
        $routeProvider.when("/", {
            
            templateUrl: "views/home.php",
            controller: "homeCtrl"
            
        }).otherwise({
            
            redirectTo: "/"
            
        });
        
}]);

// Global controller
app.controller("allCtrl", function(){});