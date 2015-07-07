// Gestion des routes
app.config(["$routeProvider", function($routeProvider){
        
        $routeProvider.when("/", {
            
            templateUrl: "views/home.php",
            controller: "homeCtrl"
            
        }).otherwise({
            
            redirectTo: "/"
            
        });
        
}]);