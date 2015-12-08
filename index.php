<?php
require_once("app.php");

$app = new App();
$app->getTrafficURL();
echo $app->startView();