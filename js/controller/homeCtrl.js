// Home controller
app.controller("homeCtrl", function($scope, $http){
    
    // http://api.openweathermap.org/data/2.5/forecast/daily?q=bordeaux&mode=json&units=metric&cnt=10&lang=fr&type=accurate
    // http://api.openweathermap.org/data/2.5/find?q=bordeaux&units=metric&lang=fr&type=accurate
    // http://openweathermap.org/weather-conditions
    
    // Initialisation du loader
    $scope.goSearch = false;
    
    // Initialisation de la réponse de la requête
    $scope.result = false;
    
    // Retour accueil
    $scope.hideResult = function(){
        
        $scope.result = false;
        
    };
    
    // Fonction recherche ville
    $scope.search = function(city){
        
        if($scope.searchCity.city.$error.minlength === true || city === undefined || city === ""){
            
            return;
            
        }
        
        // Lancement du loader
        $scope.goSearch = true;
        
        // Lancement de la recherche = requête api
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=10&lang=fr&type=accurate";
        api(url);
        
    };
    
    // Fonction de requête de la météo
    function api(url){
        
        $http({
           
            method: "GET",
            url: url
            
        }).success(function(response){
            
            // Fin du loader
            $scope.goSearch = false;
            
            console.log(response);
            console.log(response.cod);
            
            // Requête retourne automatiquement une réponse. Si vide/mauvaise code réponse === 404
            // Si code réponse !== 404 --> suite
            if(response.cod !== "404"){
                
                // Modification de l'état de la requête
                $scope.result = true;
                
                // Envoi des données de la réponse au front
                $scope.days = response;
                
                // Initialisation des éléments du jour actuel
                $scope.cityDay = response.city.name;
                $scope.cityCountry = response.city.country;
                $scope.temperatureDay = (response.list[0].temp.day).toFixed(0);
                
            }else{
                
                return;
                
            }
            
        }).error(function(headers, status, config){
            
            // Fin du loader
            $scope.goSearch = false;
            
            console.log(headers);
            console.log(status);
            console.log(config);
            
        });
        
    }
    
});