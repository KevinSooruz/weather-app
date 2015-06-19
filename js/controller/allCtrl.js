var app = angular.module("app", ["ngRoute", "ngTouch"]);

app.config(["$routeProvider", function($routeProvider){
        
        $routeProvider.when("/", {
            templateUrl: "index.php",
            controller: "homeCtrl"
        }).otherwise({
            redirectTo: "/"
        });
        
}]);