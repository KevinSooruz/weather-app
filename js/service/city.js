services.factory("City", function(){
    
    var city = {};
    
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
    
    city.clear = function(){
        
        localStorage.removeItem("cities");
        
    };
    
    return city;
    
});