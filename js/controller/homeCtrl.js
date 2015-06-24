// Home controller
app.controller("homeCtrl", function($scope, $http, WindSpeed){
    
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
    var numbersDaySup; // Initialiastion du nombre de jours supérieurs au max du mois
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
                    $scope.dayActif = day(today.getDay());
                    $scope.dateActif = date(today.getDate(), today.getMonth(), today.getFullYear());
                    $scope.humidityDay = response.list[0].main.humidity.toFixed(0);
                    $scope.pressureDay = response.list[0].main.pressure.toFixed(0);
                    $scope.speedDay = WindSpeed.km(response.list[0].wind.speed).toFixed(0);
                    
                }else if(typeDay === "otherDays"){
                    
                    // Envoi des données de la réponse au front
                    numbersDaySup = 0; // Initialiastion du nombre de jours supérieurs au max du mois
                    var daysInfo = []; // Création d'un tableau pour personnalisation des données envoyées au front (notamment la date)
                    var maxDays = response.list.length;
                    
                    // Boucle des infos (création d'objets) à envoyer au tableau pour le front
                    var i = 0;
                    for(; i < maxDays; i++){
                        
                        var rainResponse;
                        if(response.list[i].rain){
                            
                            rainResponse = "Précipitations : " +  response.list[i].rain + " mm";
                            
                        }
                        
                        daysInfo.push({
                        
                            day: findNextDay(i),
                            date: findNextDate(i),
                            temp: response.list[i].temp.max.toFixed(0),
                            minTemp: response.list[i].temp.min.toFixed(0),
                            icon: response.list[i].weather[0].icon,
                            humidityOtherDay: response.list[i].humidity.toFixed(0),
                            pressureOtherDay: response.list[i].pressure.toFixed(0),
                            speedOtherDay : WindSpeed.km(response.list[i].speed).toFixed(0),
                            rain: rainResponse

                        });
                        
                    }
                    
                    $scope.days = daysInfo;
                    
                }
                
            }else{
                
                return;
                
            }
            
        }).error(function(headers, status, config, error){
            
            // Fin du loader
            $scope.goSearch = false;
            
            console.log(headers);
            console.log(error);
            console.log(status);
            console.log(config);
            
        });
        
    };
    
    // Date
    var today = new Date(); // Date actuelle
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]; // Tableau des jours de la semaine
    // tableau des mois de l'année et nombre de jours max dans le mois
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
    
    // Fonction permettant de retourner le jour de la semaine
    var day = function(number){
        
        return days[number];
        
    };
    
    // Fonction permettant de retourner la date de type dd/mm/yy
    var date = function(numDay, numMonth, numYear){
        
        return numDay + " " + months[numMonth].name + " " + numYear;
        
    };
    
    // Fonction permettant de trouver les jours de la semaine en cours
    var findNextDay = function(number){
    
        var startDay = today.getDay();
        var newDay = (startDay + number) + 1; // jour actuel + i + 1 (car semaine commence à 0)

        // Si on est supérieur au 6ème jour (samedi), retour en début de tableau (dimanche)
        if(newDay > 6){

            newDay = number - 3;

        }
        
        return day(newDay);
        
    };
    
    // Fonction permettant de retourner les dates des jours de la semaine en cours
    var findNextDate = function(number){
        
        var startDate = today.getDate();
        var newDate = (startDate + number) + 1; // +1 car boucle commence à 0
        
        var newMonth = today.getMonth();
        var limite = months[newMonth].limite;
        
        var newYear = today.getFullYear();
        
        if(newDate > limite){
            
            numbersDaySup++; // Incrémentation du nombre de jours supérieurs au max du mois
            newDate = numbersDaySup;
            newMonth = newMonth + 1;
            
            if(newMonth === 11){
            
                newMonth = 0; // Incrémentation du mois si fin de mois
                newYear = newYear + 1; // Incrémentation de l'année si fin année
            
            }
            
        }
        
        return date(newDate, newMonth, newYear);
        
    };
    
});