<?php

class GetTraffic {

    public function __construct() {
        if(file_exists('traffic.json') && filemtime('traffic.json') > (time() - 5)){
            echo file_get_contents('traffic.json');
        }else{
            $request = file_get_contents('http://api.sr.se/api/v2/traffic/messages?format=json&pagination=false');
            file_put_contents('traffic.json',$request);
            echo file_get_contents('traffic.json');
        }
    }
}

new GetTraffic();