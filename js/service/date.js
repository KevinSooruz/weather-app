services.factory("Ndate", function(){
    
    var ndate = {};
    
    var days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    
    ndate.day = function(number){
        
        var dayNumber = ndate.timestamp(number).getDay();
        var day = days[dayNumber];
        
        return day;
        
    };
    
    ndate.fullDate = function(number){
        
        var date = ndate.timestamp(number).getDate();
        var monthNumber = ndate.timestamp(number).getMonth();
        var month = months[monthNumber];
        var year = ndate.timestamp(number).getFullYear();
        
        return date + " " + month + " " + year;
        
    };
    
    ndate.timestamp = function(time){
        
        return new Date(time * 1000);
        
    };
    
    return ndate;
    
});