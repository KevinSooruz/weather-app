services.factory("Random", function(){
    
    var random = {};
    
    random.run = function(elem){
        
        var nb = Math.floor((Math.random() * 16) + 1);
        var elem = document.getElementById(elem);
        
        elem.style.backgroundImage = "url(images/bg" + nb + ".jpg)";
        
    };
    
    return random;
    
});