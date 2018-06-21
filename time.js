

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
        let lightURL = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today&formatted=0`;

        request(lightURL, location, function(err, response, body) {
            if(err) {
                console.log('error:', error);
            } else {
                let info = JSON.parse(body);
                let placeName = location; 

                //all results from JSON parse
                let results = new Object(info.results);

                //sunrise TIME
                let sunrise = results.sunrise; 

                //sunset TIME
                let sunset = results.sunset;

                //day length
                let day_length = results.day_length;

                //splitting day length by : 
                let min = day_length.split(':');

                //convert to full day minutes
                let day_minutes = (+min[0]*60 +(+min[1]))
                
                //minutes in night
                let night_minutes = 1440-day_minutes;

                //day minutes in six installments for the animals
                let wadokei_day = day_minutes/6;

                //night minutes in six installments for the animals
                let wadokei_night = night_minutes/6;

                //convert back to : format
                function toTime(minutes){
                    var sign = minutes <0 ? "-" : "";
                    var hrs = Math.floor(Math.abs(minutes));
                    var mins = Math.floor(Math.abs(minutes)*60 % 60)
                    var sec = Math.floor(Math.abs((minutes)*60)/60);
                    return sign + (hrs < 10 ? "0" : "") + hrs + ":" + (mins < 10 ? "0" : "") + mins + ":" + (sec < 10 ? "0" :"") + sec;
                };

                //add times
                function addTimes(time1, time2){
                    let nextHour = time1 + time2;
                    return nextHour;
                }
                
                console.log(addTimes(sunrise,toTime(wadokei_day/60)))
                //getting all times 
                // for(let key in results) {
                //     if (results.hasOwnProperty(key)) {
                //         console.log(results[key]);
                //     }
                // } 
                


                console.log(placeName);
                console.log(typeof results);
                console.log(results);
                console.log(sunrise);
                console.log(sunset);
                console.log(day_length);
                console.log(day_minutes);
                console.log(night_minutes);
                console.log(wadokei_day);
                console.log(wadokei_night);
                console.log(toTime(wadokei_day/60));
                console.log(toTime(wadokei_night/60));
            }
        })
    }
})

