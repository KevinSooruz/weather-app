var app=angular.module("app",["ngRoute","ngTouch","services"]),services=angular.module("services",[]);app.config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"views/home.php",controller:"homeCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("allCtrl",function(){}),app.controller("homeCtrl",function($scope,$timeout,WindSpeed,Api,Ndate,Random,Win,City){$scope.goSearch=!1,$scope.result=!1,$scope.viewCities=!1,$scope.cityExist=!1,$scope.correctAdd=!1,Random.run("headerCity"),$scope.cities=City.exist();var results;results=!1,$scope.hideResult=function(){$scope.result=!1},$scope.hideResultSwipe=function(){Win.width()<=771&&($scope.result=!1)},$scope.showResultSwipe=function(){Win.width()<=771&&results===!0&&($scope.result=!0)},$scope.viewCity=function(){$scope.viewCities=!0,$scope.cities=City.view()},$scope.hideCities=function(){$scope.viewCities=!1,$scope.indexMoveLeft=""},$scope.hideCitiesSwipe=function(){Win.width()<=771&&($scope.viewCities=!1,$scope.indexMoveLeft="")},$scope.showCitiesSwipe=function(){City.exist()===!0&&Win.width()<=771&&$scope.viewCity()},$scope.search=function(city){if(Random.run("weatherDay"),$scope.searchCity.city.$error.minlength!==!0&&void 0!==city&&""!==city){$scope.goSearch=!0;var maxDays=10;Api.get("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&mode=json&units=metric&cnt="+maxDays+"&lang=fr&type=accurate").then(function(response){if($scope.goSearch=!1,"404"!==response.cod){$scope.result=!0,results=!0,$scope.cityName=response.city.name,$scope.cityCountry=response.city.country,$scope.temperatureDay=response.list[0].temp.day.toFixed(0),$scope.iconDayActif=response.list[0].weather[0].icon,$scope.dayActif=Ndate.day(response.list[0].dt),$scope.dateActif=Ndate.fullDate(response.list[0].dt),$scope.humidityDay=response.list[0].humidity.toFixed(0),$scope.pressureDay=response.list[0].pressure.toFixed(0),$scope.speedDay=WindSpeed.km(response.list[0].speed).toFixed(0),response.list[0].rain?$scope.rain="- Précipitations : "+response.list[0].rain+" mm":$scope.rain="";for(var daysInfo=[],i=1;maxDays>i;i++){var rainResponse;response.list[i].rain&&(rainResponse="Précipitations : "+response.list[i].rain+" mm"),daysInfo.push({day:Ndate.day(response.list[i].dt),date:Ndate.fullDate(response.list[i].dt),temp:response.list[i].temp.max.toFixed(0),minTemp:response.list[i].temp.min.toFixed(0),icon:response.list[i].weather[0].icon,humidityOtherDay:response.list[i].humidity.toFixed(0),pressureOtherDay:response.list[i].pressure.toFixed(0),speedOtherDay:WindSpeed.km(response.list[i].speed).toFixed(0),rainOtherDay:rainResponse})}$scope.days=daysInfo}})["catch"](function(error,data,status,config){console.error(error,data,status,config)})["finally"](function(){$scope.goSearch=!1})}},$scope.removeIndexActif=function(){$scope.index=""},$scope.addCity=function(name,country){var verification=City.verification(name,country);"City Exist"===verification?($scope.cityExist=!0,$scope.iconVerif="glyphicon-remove",$scope.verifText="existe déjà dans vos favoris"):(City.add(name,country),$scope.cityExist=!1,$scope.iconVerif="glyphicon-ok",$scope.verifText="a été ajouté à vos favoris"),$scope.correctAdd=!0,$timeout(function(){$scope.correctAdd=!1},2500),$scope.cities=!0},$scope.removeCity=function(name,country,max){var index=City.remove(name,country);$scope.cities.splice(index,1),backHome(max)},$scope.removeCityResponsive=function(index){$scope.indexMoveLeft===index?$scope.indexMoveLeft="":$scope.indexMoveLeft=index},$scope.deleteCityResponsive=function(name,country,index,max){$scope.index="";var indexSplice=City.remove(name,country);$scope.completeDelete=index,$timeout(function(){$scope.deleteMoveTop=index,backHome(max)},600),$timeout(function(){$scope.completeDelete="",$scope.indexMoveLeft="",$scope.deleteMoveTop="",$scope.cities.splice(indexSplice,1)},1200)};var backHome=function(max){1>=max&&($scope.viewCities=!1,$scope.cities=!1)};$scope.searchFromCities=function(city,country,index){$scope.viewCities=!1,$scope.city=city,$timeout(function(){$scope.search(city+","+country)},600),$scope.index=index}}),app.directive("header",function(){return{restrict:"E",replace:"true",templateUrl:"views/header.php"}}),app.directive("footer",function(){return{retrict:"E",replace:"true",templateUrl:"views/footer.php",link:function(scope){scope.tab1=!0,scope.changeActive=function(){scope.tab1===!0?scope.tab1=!1:scope.tab1=!0}}}}),services.factory("WindSpeed",function(){var windSpeed={};return windSpeed.km=function(speed){var speedKm=3.6*speed;return speedKm},windSpeed}),services.factory("Api",function($http){var api={};return api.get=function(url){return $http({method:"GET",url:url}).then(function(response){return response.data})},api}),services.factory("Ndate",function(){var ndate={},days=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"],months=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];return ndate.day=function(number){var dayNumber=ndate.timestamp(number).getDay(),day=days[dayNumber];return day},ndate.fullDate=function(number){var date=ndate.timestamp(number).getDate(),monthNumber=ndate.timestamp(number).getMonth(),month=months[monthNumber],year=ndate.timestamp(number).getFullYear();return date+" "+month+" "+year},ndate.timestamp=function(time){return new Date(1e3*time)},ndate}),services.factory("Random",function(){var random={};return random.run=function(elem){var nb=Math.floor(16*Math.random()+1),elem=document.getElementById(elem);elem.style.backgroundImage="url(images/bg"+nb+".jpg)"},random}),services.factory("Win",function(){var win={};return win.width=function(){var width=document.body.innerWidth||window.innerWidth;return width},win}),services.factory("City",function(){var city={};return city.add=function(name,country){if(localStorage.getItem("cities")){for(var citiesStock=JSON.parse(localStorage.getItem("cities")),citiesMax=citiesStock.length,city=[],i=0;citiesMax>i;i++)city.push({name:citiesStock[i].name,country:citiesStock[i].country});city.push({name:name,country:country});var cities=JSON.stringify(city);localStorage.setItem("cities",cities)}else{var city=[{name:name,country:country}],cities=JSON.stringify(city);localStorage.setItem("cities",cities)}},city.verification=function(name,country){if(localStorage.getItem("cities"))for(var citiesStock=JSON.parse(localStorage.getItem("cities")),citiesMax=citiesStock.length,i=0;citiesMax>i;i++){var verifName=citiesStock[i].name+","+citiesStock[i].country,cityName=name+","+country;if(cityName===verifName)return"City Exist"}},city.clear=function(){localStorage.removeItem("cities")},city.view=function(){if(localStorage.getItem("cities")){var citiesStock=JSON.parse(localStorage.getItem("cities"));return citiesStock}},city.remove=function(name,country){for(var citiesStock=JSON.parse(localStorage.getItem("cities")),citiesMax=citiesStock.length,nameTest=name+","+country,city=[],j=0;citiesMax>j;j++){var cityCompareNew=citiesStock[j].name+","+citiesStock[j].country;nameTest!==cityCompareNew&&city.push({name:citiesStock[j].name,country:citiesStock[j].country})}var cities=JSON.stringify(city);localStorage.setItem("cities",cities);for(var i=0;citiesMax>i;i++){var cityCompare=citiesStock[i].name+","+citiesStock[i].country;if(nameTest===cityCompare)return i}},city.exist=function(){if(localStorage.getItem("cities")){var citiesStock=JSON.parse(localStorage.getItem("cities")),citiesMax=citiesStock.length;return 0>=citiesMax?!1:!0}return!1},city});