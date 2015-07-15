// init : https://www.airpair.com/angularjs/posts/testing-angular-with-karma#6-testing-controllers
// https://lostechies.com/gabrielschenker/2013/12/30/angularjspart-7-getting-ready-to-test/
// http://www.tuesdaydeveloper.com/2013/06/angularjs-testing-with-karma-and-jasmine/
// http://developpementagile.com/posts/2013/may/tests-javascript-avec-jasmine-partie-1
// https://docs.angularjs.org/guide/unit-testing
// http://www.ng-newsletter.com/advent2013/#!/day/19
// http://www.occitech.fr/blog/2013/10/les-tests-angularjs-le-guide-de-a-a-z-partie-1-les-tests-unitaires/

"use strict";

describe("hello", function(){
    
    it("should work", function(){
        
        expect(true).toBe(true);
        
    });
    
});

describe("testing 'HomeCtrl'", function() {
    
    var $scope, controller;
 
  beforeEach(module('app'));
  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('homeCtrl', {
      $scope: $scope
    });
  }));

    describe("init loader", function(){
        
        it("must to be false", function () {

            expect($scope.goSearch).toBe(false);

        });
        
    });
    
    describe("test", function(){
    
    it("must to be false", function(){
            
            expect(test).toBe(false);
            
        });
    
    });
    
    

});
