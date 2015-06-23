// Home controller
app.controller("homeCtrl", function($scope, $http){
    
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
        
        // Lancement de la recherche pour le jour en cours = requête api
        var dayInfos = function(){
            
            var url = "http://api.openweathermap.org/data/2.5/find?q=" + city + "&mode=json&units=metric&lang=fr&type=accurate";
            api(url, "currentDay");
            
        };
        dayInfos();
        
        // Lancement de la recherche pour les heures et 4 prochains jours = requête api
        var dayInfos = function(){
            
            var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=10&lang=fr&type=accurate";
            api(url, "otherDays");
            
        };
        dayInfos();
        
    };
    
    // Fonction de requête de la météo
    var api = function(url, typeDay){
        
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
                
                // Si requête jour actuel / Si requête prochains jours
                if(typeDay === "currentDay"){
                    
                    // Initialisation des éléments du jour actuel
                    $scope.cityDay = response.list[0].name;
                    $scope.cityCountry = response.list[0].sys.country;
                    $scope.temperatureDay = (response.list[0].main.temp).toFixed(0);
                    $scope.iconDayActif = response.list[0].weather[0].icon;
                    $scope.dayActif = day();
                    $scope.dateActif = date();
                    $scope.humidityDay = (response.list[0].main.humidity).toFixed(0);
                    $scope.pressureDay = (response.list[0].main.pressure).toFixed(0);
                    
                }else if(typeDay === "otherDays"){
                    
                    // Envoi des données de la réponse au front
                    $scope.days = response.list;
                    
                }
                
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
    
    // Date
    var today = new Date();
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var months = [
        {
            name: "Janvier",
            limite: 31
        }, 
        {
            name: "Février",
            limite: 30
        }, 
        {
            name: "Mars",
            limite: 31
        }, 
        {
            name: "Avril",
            limite: 30
        }, 
        {
            name: "Mai",
            limite: 31
        }, 
        {
            name: "Juin",
            limite: 30
        },
        {
            name: "Juillet",
            limite: 31
        }, 
        {
            name: "Août",
            limite: 31
        }, 
        {
            name: "Septembre",
            limite: 30
        }, 
        {
            name: "Octobre",
            limite: 31
        }, 
        {
            name: "Novembre",
            limite: 30
        }, 
        {
            name: "Décembre",
            limite: 31
        }
    ];
    
    var day = function(){
        
        return days[today.getDay()];
        
    };
    
    var date = function(){
        
        return today.getDate() + " " + months[today.getMonth()].name + " " + today.getFullYear();
        
    };
    
});