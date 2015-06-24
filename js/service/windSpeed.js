var windSpeedService = angular.module("services", []);

windSpeedService.factory("WindSpeed", function(){
    
    var windSpeed = {};
    
    // Fonction de calcul de la vitesse du vent (1 m/s = 3.6 km/h)
    windSpeed.km = function(speed){
        
        var speedKm = speed * 3.6;
        return speedKm;
        
    };
    
    return windSpeed;
    
});