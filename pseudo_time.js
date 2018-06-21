let http = require('http');
let request = require('request');
let myJSON = require('JSON');

let _ip = http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                console.log("My public IP address is: " + ip);
                return ip
            });
        });

let apiKey = '44d9535d03cf69a0e039518aac11f910';
let locationUrl = `http://api.ipstack.com/${_ip}?access_key=${apiKey}`; 

function getBodyInfo(url, callback) {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (error || response.statusCode !== 200) {
            return callback(error || {statusCode: response.statusCode});
        }
        callback(null, JSON.parse(body))
    });
}

getBodyInfo(locationUrl, function(err, body) {
    if(err) {
        console.log(err);
    } else {
        js_traverse(body);
    }
})

