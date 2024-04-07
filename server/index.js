const express = require('express')
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { error, Console } = require('console');
const fs = require('fs');
   

const login = require('./endpoints/login.js').login;
const getAverages = require('./endpoints/getAverages.js').getAverages;
const getMeasurments = require('./endpoints/getMeasurments.js').getMeasurments;
const alarmOFF = require('./endpoints/alarm.js').alarmOFF;


global.path  = "./data.json";
//let path = '/home/pi/Desktop/sensor.json'
app.listen(5274);















































let timeout = 100;
fs.watch(path, (eventType, filename) => {
    if (filename) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            let x = require(path);
            let dataBlock = {
                Temperature: parseFloat(x.temp.toFixed(1)),
                Quality: parseFloat(x.CO.toFixed(1)),
                Humidity: parseFloat(x.AirQuality.toFixed(1)),
                Date: x.Date,
                Time: x.Time
            };


            // Update highs
            if (highs.temperature === undefined || highs.temperature < dataBlock.Temperature) {
                highs.temperature = dataBlock.Temperature;
            }
            if (highs.quality === undefined || highs.quality < dataBlock.Quality) {
                highs.quality = dataBlock.Quality;
            }
            if (highs.humidity === undefined || highs.humidity < dataBlock.Humidity) {
                highs.humidity = dataBlock.Humidity;
            }

            if (lows.temperature === undefined || lows.temperature > dataBlock.Temperature) {
                lows.temperature = dataBlock.Temperature;
            }
            if (lows.quality === undefined || lows.quality > dataBlock.Quality) {
                lows.quality = dataBlock.Quality;
            }
            if (lows.humidity === undefined || lows.humidity > dataBlock.Humidity) {
                lows.humidity = dataBlock.Humidity;
            }
        
            sums.temperature += dataBlock.Temperature;
            sums.quality += dataBlock.Quality;
            sums.humidity += dataBlock.Humidity;
            sums.count ++;
            
            averages.temperature = parseFloat((sums.temperature/sums.count).toFixed(1));
            averages.quality = parseFloat((sums.quality/sums.count).toFixed(1));
            averages.humidity = parseFloat((sums.humidity/sums.count).toFixed(1));








            database.push(dataBlock);
            delete require.cache[require.resolve(path)];
        }, 100);
    } else {
        console.log('No');
    }
});






