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
                <link rel='stylesheet' href='style/style.css' media='screen'>
                <script src='https://code.jquery.com/jquery-2.1.4.min.js'></script>
                <script src='script/script.js'></script>
            </head>
            <body>
                <div id='listBox'>
                    <h2 id='headline'>Trafiklista</h2>
                    <ul id='list'>

                    </ul>
                </div>
                <div id='map'></div>
                <script async defer src=$properties></script>
            </body>
        </html>";

        return $view;
    }

    public function getTrafficURL() {
        $result = file_get_contents('http://api.sr.se/api/v2/traffic/messages?format=json');

        $file = fopen('traffic.json', 'w');
        fwrite($file, $result);
        fclose($file);
    }
}