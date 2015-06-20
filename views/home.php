<header></header>

<!--First block-->
<div id="block1" class="container-fluid block">
    <form name="searchCity">
        <label for="city">Recherchez une ville afin d&rsquo;afficher la m&eacute;t&eacute;o</label>
        <input type="search" placeholder="Ville" class="form-control" name="city" ng-model="city" ng-minlength="3" />
        <button class="btn btnGreen" ng-click="search(city)" ng-class="{none: goSearch == true}">Rechercher</button>
    </form>
    <div id="loader" ng-class="{none: goSearch == false}">
        <span>Recherche en cours</span>
        <span><i class="glyphicon glyphicon-refresh"></i></span>
    </div>
</div>

<!--Second block-->
<div id="block2" class="container-fluid block" ng-class="{show: result == true}">
    <ul>
        <li ng-repeat="day in days"></li>
    </ul>
</div>

<footer></footer>