// Home controller
app.controller("homeCtrl", function($scope){
    
    // http://api.openweathermap.org/data/2.5/forecast/daily?q=bordeaux&mode=json&units=metric&cnt=10&lang=fr&type=accurate
    // http://api.openweathermap.org/data/2.5/find?q=bordeaux&units=metric&lang=fr&type=accurate
    // http://openweathermap.org/weather-conditions
    
    // Initialisation du loader
    $scope.goSearch = false;
    
    // Fonction recherche ville
    $scope.search = function(){
        
        // Lancement du loader
        $scope.goSearch = true;
        
        // Lancement de la recherche = requête api
        
    };
    
});