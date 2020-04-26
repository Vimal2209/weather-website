const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port  = process.env.PORT || 3000
const app = express()

//Define paths for Express config
const publicpathDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)

//Setup static directory to serve
app.use(express.static(publicpathDirectoryPath))

hbs.registerPartials(partialsPath)

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Vimal'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Vimal'
    })
})
app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Vimal'
    })
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must include an address or location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(latitude, location, (error, forecastData)=>{
            if(error){
               return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        name: 'Vimal',
        title: 'Help Doc',
        errorMessage: 'Help documentation is not created'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        name: 'Vimal',
        title: '404',
        errorMessage: 'This page does not exists'
    })
})

app.listen(port, ()=>{
    console.log("Port listens at 3000")
})