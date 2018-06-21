

let add = require('timelite');

let request = require('request');

let _ip = "205.153.36.170";
let apiKey = '44d9535d03cf69a0e039518aac11f910';
let locationUrl = `http://api.ipstack.com/${_ip}?access_key=${apiKey}`;

request(locationUrl, function (err, response, body) {
    if(err) {
        console.log('error:', error);
    } else {
        let info = JSON.parse(body);
        let lat = `${info.latitude}`;
        let lng = `${info.longitude}`;
        let location = `${info.location.capital}`;
        let lightURL = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`;

        request(lightURL, location, function(err, response, body) {
            if(err) {
                console.log('error:', error);
            } else {
                let info = JSON.parse(body);
                let placeName = location; 
                let results = new Object(info.results);
                for(let key in results) {
                    if (results.hasOwnProperty(key)) {
                        console.log(results[key]);
                    }
                }                
                
                console.log(typeof results);
                console.log(results);
            }
        })
    }
})

