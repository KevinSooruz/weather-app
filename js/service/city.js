services.factory("City", function(){
    
    var city = {};
    
    // Ajouter une ville au localstorage
    city.add = function(name, country){
        
        // Si le stockage local "cities" existe
        if(localStorage.getItem("cities")){
            
            var citiesStock = JSON.parse(localStorage.getItem("cities")); // Récupération des données locales pour "cities"
            var citiesMax = citiesStock.length; // Nombre max de données stockées dans "cities"
            var city = []; // Initialisation du nouveau tableau de données à stocker
            
            var i = 0;
            for(; i < citiesMax; i++){
                
                // Récupération et envoi des anciennes données au nouveau tableau de données sinon écrasement des données
                city.push({
                   
                    name: citiesStock[i].name,
                    country: citiesStock[i].country
                    
                });
                
            }
            
            // Ajout de la nouvelle donnée au tableau
            city.push({
                
                name: name,
                country: country
                
            });
            
            // Transformation JSON
            var cities = JSON.stringify(city);
            
            // Mise à jour des données pour l'entrée "cities"
            localStorage.setItem("cities", cities);
            
        }else{
            
            // Si pas de stockage local "cities"
            // Création de l'entrée sous forme de tableau
            var city = [
                
                {
                    name: name,
                    country: country
                }
                
            ];
            
            // Transformation JSON
            var cities = JSON.stringify(city);
            
            // Envoie de la première donnée
            localStorage.setItem("cities", cities);
            
        }
        
    };
    
    // Vérification si ville existe déjà ou non dans localstorage pour message confirmation ou erreur
    city.verification = function(name, country){
        
        if(localStorage.getItem("cities")){
            
            var citiesStock = JSON.parse(localStorage.getItem("cities")); // Récupération des données locales pour "cities"
            var citiesMax = citiesStock.length; // Nombre max de données stockées dans "cities"

            var i = 0;
            for(; i < citiesMax; i++){

                // Lancement de la vérification si ville existe déjà
                var verifName = citiesStock[i].name + "," + citiesStock[i].country;
                var cityName = name + "," + country;

                if(cityName === verifName){

                    return "City Exist";

                }

            }
            
        }
        
    };
    
    // Effacer toutes les villes du localstorage
    city.clear = function(){
        
        localStorage.removeItem("cities");
        
    };
    
    // Afficher toutes les villes du localstorage
    city.view = function(){
        
        if(localStorage.getItem("cities")){
            
            var citiesStock = JSON.parse(localStorage.getItem("cities"));
            
            return citiesStock;
            
        }
        
    };
    
    // Suppression d'une ville
    city.remove = function(name, country){
        
        var citiesStock = JSON.parse(localStorage.getItem("cities"));
        var citiesMax = citiesStock.length; // Nombre max de données stockées dans "cities"
        var nameTest = name + "," + country; // Ville à supprimer
        var city = [];
        
        // Création du nouvel objet à renvoyer au localStorage sans l'entrée à supprimer
        var j = 0;
        for(; j < citiesMax; j++){
            
            var cityCompareNew = citiesStock[j].name + "," + citiesStock[j].country; // Comparaison avec les villes du localStorage

            if(nameTest !== cityCompareNew){
                
                // Récupération et envoi des anciennes données au nouveau tableau de données sinon écrasement des données
                city.push({

                    name: citiesStock[j].name,
                    country: citiesStock[j].country

                });
                
            }
            
        }

        // Transformation JSON du nouvel objet
        var cities = JSON.stringify(city);

        // Mise à jour des données pour l'entrée "cities"
        localStorage.setItem("cities", cities);

        // Retour index au front
        var i = 0;
        for(; i < citiesMax; i++){
            
            var cityCompare = citiesStock[i].name + "," + citiesStock[i].country; // Comparaison avec les villes du localStorage

            if(nameTest === cityCompare){
                
                // Si correspondance, renvoie de l'index i pour suppression du front
                return i;
                
            }

        }
        
    };
    
    // Initialisation du bouton et swipe si ville dans localStorage
    city.exist = function(){
        
        // Si localStorage "cities" existe
        if(localStorage.getItem("cities")){
            
            var citiesStock = JSON.parse(localStorage.getItem("cities")); // Récupération des données locales pour "cities"
            var citiesMax = citiesStock.length; // Nombre max de données stockées dans "cities"
            
            // Si localstorage vide retourne faux donc n'affiche pas
            if(citiesMax <= 0){
                
                return false;
                
            }else{
                
                return true;
                
            }

        }else{
            
            return false;

        }
        
    };
    
    return city;
    
});