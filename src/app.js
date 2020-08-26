const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { dir } = require('console')
const { response } = require('express')

const app = express()
//for finding port
const port = process.env.PORT || 3000
//defining paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname,'../templates/partials')


// normally we have to store the hanldebars in views directory in this case we are using templates as the name so we have to give the name seperately thats why we write the code below(second line)
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory to serve ie normal html pages if any
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'THE WEATHER APP',
        name: 'Vinayak'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'vinayak'

    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'this is some helpful text',
        title: 'Help',
        name:'Vinayak'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error: "you must provide an address"
        })
    }

    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error) {
            return res.send({
                error:error
            })
        } 
        
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error){
                return res.send({
                    error: error
                })
            }
            // console.log(location) 
            // console.log(forecastdata)
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address,
                //location: 'philadelphia'
            })
          })
    })
    
    // res.send({
    //     address: req.query.address,
    //     forecast: 'its partly cloudy',
    //     location: 'philadelphia'
    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/k',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Vinayak',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Vinayak',
        errorMessage: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
})