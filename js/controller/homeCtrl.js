// Home controller
app.controller("homeCtrl", function($scope, $timeout, WindSpeed, Api, Ndate, Random, Win, City){
    
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
    
    // Initialisation de l'affichage des villes sauvegardées
    $scope.viewCities = false;
    $scope.cityExist = false;
    
    // Initialisation de l'affichage de la boite de dialogue pour ajout villes enregistrées
    $scope.correctAdd = false;
    
    // Initialisation de l'image de fond du localStorage
    Random.run("headerCity");
    
    // Initialisation du bouton d'accès aux villes sauvegardées
    $scope.cities = City.exist();
    
    // Initialisation des résultats pour le swipe
    var results;
    results = false;
    
    // Retour accueil
    $scope.hideResult = function(){
        
        $scope.result = false;
        
    };
    
    // Swipe right sur résultats (mobile) pour revenir à l'accueil
    $scope.hideResultSwipe = function(){
        
        if(Win.width() <= 771){
            
            $scope.result = false;
            
        }
        
    };
    
    // Swipe left sur accueil (mobile) pour revenir sur la page des résultats
    $scope.showResultSwipe = function(){
        
        if(Win.width() <= 771){
            
            // Si on a un résultat possibilité de retour
            if(results === true){
            
                $scope.result = true;

            }
            
        }
        
    };
    
    // Fonction d'accès aux villes sauvegardées (bouton)
    $scope.viewCity = function(){
        
        $scope.viewCities = true;
        
        // Récupération des villes sauvegardées
        $scope.cities = City.view();
        
    };
    
    // Revenir à l'accueil depuis le localStorage
    $scope.hideCities = function(){
        
        $scope.viewCities = false;
        
        // Ville à supprimer revient en position normale
        $scope.indexMoveLeft = "";
        
    };
    
    // Swipe left sur villes (mobile) pour revenir à l'accueil
    $scope.hideCitiesSwipe = function(){
        
        if(Win.width() <= 771){
            
            $scope.viewCities = false;
            
            // Ville à supprimer revient en position normale
            $scope.indexMoveLeft = "";
            
        }
        
    };
    
    // Swipe right sur accueil (mobile) pour revenir sur la page des villes
    $scope.showCitiesSwipe = function(){
        
        if(City.exist() === true){
            
            if(Win.width() <= 771){
            
                $scope.viewCity();
            
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
        
        // Nombre de jours souhaités dans la recherche des autres jours
        var maxDays = 10;
        
        // URL du jour actuel
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&mode=json&units=metric&cnt=" + maxDays + "&lang=fr&type=accurate";

        // Lancement de la recherche pour le jour actuel
        Api.get(url).then(function(response){

            // Fin du loader
            $scope.goSearch = false;
            
            if(response.cod !== "404"){
                
                // Modification de l'état de la requête
                $scope.result = true;
                results = true;

                // Envoi des données de la réponse au front
                // Jour actuel
                $scope.cityName = response.city.name;
                $scope.cityCountry = response.city.country;
                $scope.temperatureDay = (response.list[0].temp.max).toFixed(0);
                $scope.iconDayActif = response.list[0].weather[0].icon;
                $scope.dayActif = Ndate.day(response.list[0].dt);
                $scope.dateActif = Ndate.fullDate(response.list[0].dt);
                $scope.humidityDay = response.list[0].humidity.toFixed(0);
                $scope.pressureDay = response.list[0].pressure.toFixed(0);
                $scope.speedDay = WindSpeed.km(response.list[0].speed).toFixed(0);

                if(response.list[0].rain){

                    $scope.rain = "- Précipitations : " + response.list[0].rain + " mm";

                }else{

                    $scope.rain = "";

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

                // tabeau des résultats envoyé au front
                $scope.days = daysInfo;
            
            }else{
                
                return;
                
            }

        }).catch(function(error, data, status, config){

            console.error(error, data, status, config);

        }).finally(function(){
            
            // Fin du loader
            $scope.goSearch = false;
    
        });
        
    };
    
    // Retire class active sur la ville qui aurait pu être active dans la liste localStorage
    $scope.removeIndexActif = function(){
        
        $scope.index = "";
        
    };
    
    // Ajout de données au stockage local
    $scope.addCity = function(name, country){
        
        var verification = City.verification(name, country);
        
        if(verification === "City Exist"){
            
            $scope.cityExist = true;
            $scope.iconVerif = "glyphicon-remove";
            $scope.verifText = "existe déjà dans vos favoris";
            
        }else{
            
            City.add(name, country);
            $scope.cityExist = false;
            $scope.iconVerif = "glyphicon-ok";
            $scope.verifText = "a été ajouté à vos favoris";
            
        }
        
        // Affichage de la boite de dialogue
        $scope.correctAdd = true;
        
        // Suppression de la boite de dialogue
        $timeout(function(){
            
            $scope.correctAdd = false;
            
        }, 2500);
        
        // Ajout du bouton d'accès aux villes sauvegardées
        $scope.cities = true;
        
    };
    
    // Suppression d'une ville du localStorage
    $scope.removeCity = function(name, country, max){
        
        // Résupération de l'index pour suppression front + suppression localStorage
        var index = City.remove(name, country);
        
        // Suppression ville définitif du front
        $scope.cities.splice(index, 1);
        
        // Si le nombre de ville est inférieur ou égal à 1 (dernier résultat, on revienr à l'accueil)
        backHome(max);
        
    };
    
    // Affichage bouton qui permet suppression d'une ville du localStorage responsive
    $scope.removeCityResponsive = function(index){
        
        // si déjà actif on supprime l'actif
        if($scope.indexMoveLeft === index){
            
            $scope.indexMoveLeft = "";
            
        }else{
            
            $scope.indexMoveLeft = index;
            
        }
        
    };
    
    // Suppression d'une ville du localStorage responsive
    $scope.deleteCityResponsive = function(name, country, index, max){
        
        // Supprime la class active
        $scope.index = "";
        
        // Résupération de l'index pour suppression front + suppression localStorage
        var indexSplice = City.remove(name, country);
        
        // Move left pour index cliqué
        $scope.completeDelete = index;
        
        $timeout(function(){
            
            // Move top pour index cliqué pour faire remonter les résultats
            $scope.deleteMoveTop = index;
            
            // Si le nombre de ville est inférieur ou égal à 1 (dernier résultat, on revienr à l'accueil)
            backHome(max);
            
        }, 600);
        
        $timeout(function(){
            
            // Suppression de les animations sur l'index
            $scope.completeDelete = "";
            $scope.indexMoveLeft = "";
            $scope.deleteMoveTop = "";
            
            // Suppression ville définitif du front
            $scope.cities.splice(indexSplice, 1);
            
        }, 1200);
        
    };
    
    // Retour accueil après suppression ville si plus de ville
    var backHome = function(max){
        
        // Si le nombre de ville est inférieur ou égal à 1 (dernier résultat, on revienr à l'accueil)
        if(max <= 1){
                
            // Retour accueil
            $scope.viewCities = false;

            // Suppression vouton accueil
            $scope.cities = false;

        }
        
    };
    
    // Lancement d'une recherche à partir du localStorage
    $scope.searchFromCities = function(city, country, index){
        
        // Retour accueil
        $scope.viewCities = false;
        
        // Renseigne input du nom de la ville sélectionnée
        $scope.city = city;
        
        // Délais de l'animation avant lancement de la fonction de recherche
        $timeout(function(){
            
            $scope.search(city + "," + country);
            
        }, 600);
        
        // Ajout class active sur la ville sélectionnée
        $scope.index = index;
        
        // Position départ animation suppression ville
        $scope.indexMoveLeft = "";
        
    };
    
});