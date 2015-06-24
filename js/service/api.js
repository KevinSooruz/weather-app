services.factory("Api", function($http){
   
    var api = {};
    
    api.get = function(url){
        
        return $http({
            
            method: "GET",
            url: url
            
        }).then(function(response){
            
            return response.data;
            
        });
        
    };
    
    return api;
    
});