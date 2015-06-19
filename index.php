<!DOCTYPE html>
<html lang="fr" ng-app="app">
<head>
<title>Weather App</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
<meta name="description" content="Weather App : toute la météo">
<meta name="keywords" content="weather app, web app, application web, javascript">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="white" />
<!-- icon for iOS Devices -->
<link rel="apple-touch-icon" href="images/icon.png"/>
<link rel="apple-touch-icon" sizes="57x57" href="images/icon.png"/>
<link rel="apple-touch-icon" sizes="72x72" href="images/icon-2.png"/>
<link rel="apple-touch-icon" sizes="114x114" href="images/icon-3.png" />
<!--Splash screen for iOS Devices -->
<link rel="apple-touch-startup-image" href="images/splashscreen.png"/>
<link rel="apple-touch-startup-image" sizes="320x460" href="images/splash-screen.png" />
<link rel="apple-touch-startup-image" sizes="640x960" href="images/splash-screen-2.png" />
<link rel="apple-touch-startup-image" sizes="768x1004" href="images/splash-screen-3.png" />
<link rel="apple-touch-startup-image" sizes="1024x748" href="images/splash-screen-4.png" />
<!--<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">-->
<link rel="stylesheet" type="text/css" href="css/style.css">
<link href="http://fonts.googleapis.com/css?family=Lato:400,300,900" rel="stylesheet" type="text/css">
<link rel="shortcut icon" type="image/jpg" href="images/favico.jpg">
</head>
<body>
    
    <div class="all container-fluid" ng-controller="allCtrl" ng-view></div>
    
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-touch.js"></script>
<script type="text/javascript" src="js/app.js"></script>

</body>
</html>