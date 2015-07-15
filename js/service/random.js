services.factory("Random", function(){
    
    var random = {};
    
    random.run = function(){
        
        var nb = Math.floor((Math.random() * 16) + 1);
        
        return nb;
        
    };
    
    return random;
    
});