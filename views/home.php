<!--First block-->
<div id="block1" class="block">
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
<div id="block2" class="block" ng-class="{show: result === true, hideResponse: result === false}">
    <div id="weatherDay">
        <div class="filter filterBlue">
            <div id="city">
                <i class="glyphicon glyphicon-chevron-left" ng-click="hideResult()"></i>
                <span>{{cityDay}} / {{cityCountry}}</span>
            </div>
            <div class="inline">
                <div id="date" class="col-md-6 col-sm-6 col-xs-6 left">
                    <span id="dateDay">{{dayActif}}</span>
                    <span id="dateDate">{{dateActif}}</span>
                </div>
                <div id="weather" class="col-md-6 col-sm-6 col-xs-6 right">
                    <img id="iconDay" src="images/icons/{{iconDayActif}}.png" />
                </div>
            </div>
            <div id="temperature">{{temperatureDay}}°C</div>
            <span id="humPress">Humidit&eacute; : {{humidityDay}} % - Pression : {{pressureDay}} hpa</span>
        </div>
    </div>
    <div id="otherDays" class="col-md-12">
        <ul>
            <li ng-repeat="day in days"></li>
        </ul>
    </div>
</div>