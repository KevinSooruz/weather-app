<!--First block-->
<div id="block1" class="block" ng-class="{hideResponse: result === true || viewCities === true, show: result === false || viewCities === false}" ng-swipe-left="showResultSwipe()">
    <button class="btn btnMaterial" ng-class="{none: cities === false}" ng-click="viewCity()"><i class="glyphicon glyphicon-option-vertical"></i></button>
    <header></header>
    <div class="content container">
        <p>Recherchez une ville pour afficher la m&eacute;t&eacute;o</p>
        <form name="searchCity">
            <div class="row">
                <div class="col-md-1 col-sm-2 col-xs-2">
                    <label for="city"><i class="glyphicon glyphicon-map-marker"></i></label>
                </div>
                <div class="col-md-11 col-sm-10 col-xs-10">
                    <input type="search" placeholder="Ville" autocomplete="off" class="form-control" name="city" ng-model="city" ng-minlength="3" />
                </div>
            </div>
            <button class="btn btnGhostWhite btnGhostBig" type="submit" ng-click="search(city)" ng-class="{none: goSearch === true}">Rechercher</button>
        </form>
        <div id="loader" ng-class="{none: goSearch === false}">
            <span>Recherche en cours</span>
            <span><i class="glyphicon glyphicon-refresh"></i></span>
        </div>
    </div>
</div>

<!--Second block-->
<div id="block2" class="block" ng-class="{show: result === true, hideResponse: result === false}" ng-swipe-right="hideResultSwipe()">
    <div id="weatherDay">
        <div class="filter filterBlue">
            <div class="container">
                <div id="city">
                    <i class="glyphicon glyphicon-menu-left" ng-click="hideResult()"></i>
                    <span>{{cityName}}<br /><span class="country">{{cityCountry}}</span></span>
                </div>
                <div class="inline">
                    <div id="date" class="col-md-6 col-sm-6 col-xs-6 left">
                        <span id="dateDay">{{dayActif}}</span>
                        <span id="dateDate">{{dateActif}}</span>
                    </div>
                    <div id="weather" class="col-md-6 col-sm-6 col-xs-6 right">
                        <img id="iconDay" alt="Temps" src="images/icons/{{iconDayActif}}.png" />
                    </div>
                </div>
                <div id="temperature">{{temperatureDay}}<span class="degree">°</span></div>
                <span id="humPress">Humidit&eacute; : {{humidityDay}} % - Pression : {{pressureDay}} hpa<br />Vitesse du vent : {{speedDay}} km/h {{rain}}</span>
            </div>
        </div>
    </div>
    <div id="otherDays" class="container">
        <button class="btn btnMaterial" ng-click="addCity(cityName, cityCountry)">+</button>
        <ul>
            <li ng-repeat="day in days" class="inline">
                <div class="inline">
                    <div class="col-md-6 col-sm-6 col-xs-6 dates">
                        <span class="otherDay inline">{{day.day}}</span>
                        <span class="otherDate inline">{{day.date}}</span>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6 temps">
                        <img class="iconOtherDays" alt="Temps" src="images/icons/small/{{day.icon}}.png" />
                        <span class="tempOtherDay">{{day.temp}}°</span>
                    </div>
                </div>
                <div class="inline otherInfos small">
                    <div class="col-md-6 col-sm-8 col-xs-8 left">
                        <span class="inline humPressOtherDays">Humidit&eacute; : {{day.humidityOtherDay}} %<br />Pression : {{day.pressureOtherDay}} hpa<br />Vent : {{day.speedOtherDay}} km/h<br />{{day.rainOtherDay}}</span>
                    </div>
                    <div class="col-md-6 col-sm-4 col-xs-4 right">
                        <span class="inline minTemp">min : {{day.minTemp}}°</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>

<!--Third block-->
<div id="block3" class="block" ng-class="{hideCities: viewCities === false, showCities: viewCities === true}" ng-swipe-left="">
    <div id="headerCity" class="container-fluid">
        <div class="filter filterBlue">
            <i class="glyphicon glyphicon-menu-left" ng-click="hideCities()"></i>
            <span class="title">Villes sauvegard&eacute;es</span>
        </div>
    </div>
    <div id="listCities" class="container">
        <ul>
            <li ng-repeat="city in cities | orderBy: 'name' | orderBy: 'country'">
                <i class="glyphicon glyphicon-remove" ng-click="removeCity(city.name, city.country)"></i>
                <span class="name">{{city.name}}</span><br />
                <span class="country">{{city.country}}</span>
            </li>
        </ul>
    </div>
</div>

<div id="correctAddBox" ng-class="{show: correctAdd === true, hideCorrect: correctAdd === false, wrong: cityExist === true}"><i class="glyphicon {{iconVerif}}"></i> <b>{{cityName}}</b> {{verifText}}</div>