const request = require('request')

const forecast = (lat, long , callback)=>{
    //http://api.weatherstack.com/current?access_key=fc88b8fa8dbca35d8b43b3365045036e&query=Chennai&units=f

    const url ='http://api.weatherstack.com/current?access_key=fc88b8fa8dbca35d8b43b3365045036e&query='+encodeURI(lat)+','+encodeURI(long)+'&units=f'
    request({url, json: true}, (error, {body})=>{
        if(error){
            callback('Internet connection is invalid', undefined)
        }else if(body.error){
            callback('URL passed is incorrect', undefined)
        }else{
            callback(undefined,  body.current.weather_descriptions[0]+'. It is currently '+ body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out. The humidity is '+body.current.humidity+'%')
        }
    })
}

module.exports = forecast