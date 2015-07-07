<!DOCTYPE html>
<html lang="fr" ng-app="app">
<head>
<title>City Weather</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
<meta name="description" content="City Weather : retrouvez toute la météo">
<meta name="keywords" content="city weather, web app, application web, javascript">
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="white" />
<!-- icon for iOS Devices -->
<link rel="apple-touch-icon" href="images/icon.png"/>
<link rel="apple-touch-icon" sizes="57x57" href="images/icon.png"/>
<link rel="apple-touch-icon" sizes="72x72" href="images/icon-2.png"/>
<link rel="apple-touch-icon" sizes="114x114" href="images/icon-3.png" />
<!--Splash screen for iOS Devices -->
<!-- iPhone (Retina) -->
<link href="images/apple-startup-iphone-retina.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPhone 5 -->
<link href="images/apple-startup-iphone-tall-retina.png"  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad Portrait -->
<link href="images/apple-startup-ipad-portrait.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
<!-- iPad Landscape -->
<link href="images/apple-startup-ipad-landscape.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image">
<!-- iPad Portrait (Retina) -->
<link href="images/apple-startup-ipad-retina-portrait.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!-- iPad Landscape (Retina) -->
<link href="images/apple-startup-ipad-retina-landscape.png" media="(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image">
<!--<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">-->
<link rel="stylesheet" type="text/css" href="css/style.css">
<link href='http://fonts.googleapis.com/css?family=Lato:300,400,900' rel='stylesheet' type='text/css'>
<link rel="shortcut icon" type="image/jpg" href="images/favico.png">
</head>
<body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-56855439-2', 'auto');
  ga('send', 'pageview');
</script>
    
    <!--Global container-->
    <div id="all" ng-controller="allCtrl" ng-view></div>

<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-route.js"></script>
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-touch.js"></script>
<script type="text/javascript" src="js/app.js"></script>

</body>
</html>