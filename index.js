
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
                let results = info.results; 
                let sunrise = results.sunrise; 
                let sunset = results.sunset;
                let day_length = results.day_length;

                let min = day_length.split(':');
                let day_minutes = (+min[0]*60 +(+min[1]))
                let wadokei_day = day_minutes/6;

                let full_day = 1440; 
                let MS_PER_MINUTE = 60000;

                let night_length = full_day-day_minutes; 
                let wadokei_night = night_length/6;

                let day_divisions = wadokei_day/4;
                let night_divisions = wadokei_night/4;

                let rabbit = sunrise; 
                


                console.log(placeName);
                console.log(sunrise);
                console.log(sunset);
                console.log(results);
                console.log(day_minutes);
                console.log(wadokei_day);
                console.log(night_length);
                console.log(wadokei_night);
                console.log(day_divisions);
                console.log(night_divisions);
                console.log(rabbit);
            }
        })
    }
});
