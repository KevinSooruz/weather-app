services.factory("Win", function(){
    
    var win = {};
    
    win.width = function(){
        
        var width = document.body.innerWidth || window.innerWidth;
        return width;
        
    };
    
    return win;
    
});