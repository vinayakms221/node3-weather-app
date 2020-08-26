const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=9ba4e1490166d2a474fd675976260533&query='+latitude+','+longitude;

    request({url, json: true},(error,{body})=>{   //normally url: url but here we are using es6 shorthand notation
    if (error) {
        callback('unable to connect to weather server!!',undefined)
    } else if(body.error) {
        callback('Unable to find location',undefined)
    } else{
        callback(undefined, body.current.weather_descriptions[0]+'. it is currently '+ body.current.temperature + ' degrees out. It feels like  ' + body.current.feelslike +' degrees out'
        )
    }
})
}
 module.exports=forecast