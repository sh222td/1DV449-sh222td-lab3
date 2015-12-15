<?php
require_once('properties/properties.php');

class App {

    private $properties;

    public function __construct() {
        $this->properties = new Properties();
    }

    public function startView() {
        $properties = $this->properties->getAPIkey();
        $view = "<!DOCTYPE html>
        <html>
            <head>
                <meta charset = 'UTF-8'>
                <link rel='stylesheet' href='style/style.css' media='screen'>
            </head>
            <body>
                <div id='listBox'>
                    <h2 id='headline'>Trafikklista</h2>
                    <div id='buttonBox'>
                    <input id='buttonAll' class='button' type='button' value='Samtliga'>
                    <input id='buttonRoadTraffic' class='button' type='button' value='Vägtrafik'>
                    <input id='buttonCollectiveTraffic' class='button' type='button' value='Kollektivtrafik'>
                    <input id='buttonPlannedInterference' class='button' type='button' value='Planerad störning'>
                    <input id='buttonAlternative' class='button' type='button' value='Övrigt'>
                    </div>
                    <ul id='list'>
                    </ul>
                </div>
                <div id='map'></div>
                <script async defer src=$properties></script>
            </body>
            <script src='script/script.js'></script>
            <script src='https://code.jquery.com/jquery-2.1.4.min.js'></script>
        </html>";

        return $view;
    }
}