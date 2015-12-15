<?php

class GetTraffic {
/*
 * Checks first if there already is a traffic.json file and if the file is older than 15 minutes. If it is it calls for the content
 * from the file and if the file doesnt exist or if it's to old then it makes a request to the api and writes over the file content.
 */
    public function __construct() {
        if(file_exists('traffic.json') && filemtime('traffic.json') > (time() - 900)){
            echo file_get_contents('traffic.json');
        }else{
            $result = file_get_contents('http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false');

            file_put_contents('traffic.json',$result);
            echo file_get_contents('traffic.json');
        }
    }
}

new GetTraffic();