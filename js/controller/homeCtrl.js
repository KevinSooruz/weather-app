// Home controller
app.controller("homeCtrl", function($scope, $http, WindSpeed, Api, Ndate, Random, Win){
    
    // today
    // http://api.openweathermap.org/data/2.5/find?q=bordeaux&units=metric&lang=fr&type=accurate
    // hours + today
    // http://api.openweathermap.org/data/2.5/forecast/main?q=bordeaux&mode=json&units=metric&cnt=10&lang=fr&type=accurate
    // daily
    // http://api.openweathermap.org/data/2.5/forecast/daily?q=bordeaux&mode=json&units=metric&cnt=10&lang=fr&type=accurate
    // weather conditions
    // http://openweathermap.org/weather-conditions
    
    // Initialisation du loader
    $scope.goSearch = false;
    
    // Initialisation de la réponse de la requête
    $scope.result = false;
    
    // Initialisation des résultast pour le swipe
    var results;
    results = false;
    
    // Retour accueil
    $scope.hideResult = function(){
        
        $scope.result = false;
        
    };
    
    $scope.hideResultSwipe = function(){
        
        if(Win.width() < 771){
            
            $scope.result = false;
            
        }
        
    };
    
    $scope.showResultSwipe = function(){
        
        if(Win.width() < 771){
            
            // Si on a un résultat possibilité de retour
            if(results === true){
            
                $scope.result = true;

            }
            
        }
        
    };
    
    // Fonction recherche ville
    $scope.search = function(city){
        
        // Random background
        Random.run("weatherDay");
        
        if($scope.searchCity.city.$error.minlength === true || city === undefined || city === ""){
            
            return;
            
        }
        
        // Lancement du loader
        $scope.goSearch = true;
        
        // Nombre de jours souhaités dans la recherche
        var maxDays = 10;
        
        // Lancement de la recherche pour le jour en cours et les jours suivants = requête api
        Api.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=" + maxDays + "&lang=fr&type=accurate").then(function(response){
            
            console.log(response);
            console.log(response.cod);
            
            // Fin du loader
            $scope.goSearch = false;
            
            if(response.cod !== "404"){
                
                // Modification de l'état de la requête
                $scope.result = true;
                results = true;
                
                // Envoi des données de la réponse au front
                // Jour actuel
                $scope.cityDay = response.city.name;
                $scope.cityCountry = response.city.country;
                $scope.temperatureDay = (response.list[0].temp.day).toFixed(0);
                $scope.iconDayActif = response.list[0].weather[0].icon;
                $scope.dayActif = Ndate.day(response.list[0].dt);
                $scope.dateActif = Ndate.fullDate(response.list[0].dt);
                $scope.humidityDay = response.list[0].humidity.toFixed(0);
                $scope.pressureDay = response.list[0].pressure.toFixed(0);
                $scope.speedDay = WindSpeed.km(response.list[0].speed).toFixed(0);
                
                if(response.list[0].rain){
                    
                    $scope.rain = "Précipitations : " + response.list[0].rain + " mm";
                    
                }
                
                // Autres jours
                var daysInfo = []; // Création d'un tableau pour personnalisation des données envoyées au front (notamment la date)
                
                // Boucle des infos (création d'objets) à envoyer au tableau pour le front
                var i = 1; // 1 car 0 = jour actuel
                for(; i < maxDays; i++){

                    var rainResponse;
                    if(response.list[i].rain){

                        rainResponse = "Précipitations : " +  response.list[i].rain + " mm";

                    }

                    daysInfo.push({

                        day: Ndate.day(response.list[i].dt),
                        date: Ndate.fullDate(response.list[i].dt),
                        temp: response.list[i].temp.max.toFixed(0),
                        minTemp: response.list[i].temp.min.toFixed(0),
                        icon: response.list[i].weather[0].icon,
                        humidityOtherDay: response.list[i].humidity.toFixed(0),
                        pressureOtherDay: response.list[i].pressure.toFixed(0),
                        speedOtherDay : WindSpeed.km(response.list[i].speed).toFixed(0),
                        rainOtherDay: rainResponse

                    });

                }
                
                $scope.days = daysInfo;
                
            }else{
                
                return;
                
            }
            
        });
        
    };
    
});