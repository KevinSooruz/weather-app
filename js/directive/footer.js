app.directive("footer", function(){
    
   return{
       retrict: "E",
       replace: "true",
       templateUrl: "views/footer.php",
       link: function(scope){
           
           scope.tab1 = true;
           
           scope.changeActive = function(){
               
               if(scope.tab1 === true){
                   
                   scope.tab1 = false;
                   
               }else{
                   
                   scope.tab1 = true;
                   
               }
               
            };
        }
    };
    
});