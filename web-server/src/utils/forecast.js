const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d4c0f9a01851d5951e4f60019c7a7908/'+ latitude + ',' + longitude + '?units=si'

    request({ url: url, json: true }, (error, response) => {

        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error){
            callback('Location not found!', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast