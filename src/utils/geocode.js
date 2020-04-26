const request = require('request')

const geocode = (address, callback)=>{
    const mapUrl ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURI(address) +'.json?access_token=pk.eyJ1IjoidmltYWwyMjA5IiwiYSI6ImNrOTJ1ZnV5eTAzZXQzaHFtajVhZ2t3cTcifQ._dZiwdnjxyniDMLbAE2Tgg'
    
    request({url: mapUrl, json: true},(error, {body})=>{
        if(error){
            callback('Improper internet connectivity', undefined)
        }else if(body.features.length === 0){
            callback('Url is invalid', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports= geocode