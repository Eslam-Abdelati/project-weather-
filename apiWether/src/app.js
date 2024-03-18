
const request = require("request")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000


///////////////////////////////////////////////////////////////


const path = require('path')
app.use(express.static(path.join(__dirname, '../public')))

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '../apiWether/views'))

///////////////////////////////////////////////////////////
const hbs = require('hbs')
const partialsPath = path.join(__dirname, '../apiWether/partials')
hbs.registerPartials(partialsPath)
////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {

    res.render('index', {
        titel: 'weather',
        dec: 'Today is weather',

    })
})

app.get('/servic', (req, res) => {
    res.render('servic', {
        titel: 'servic',
        dec: 'this is servic page'
    })
})

app.get('/team', (req, res) => {
    res.render('team', {
        titel: 'TEAM',
        dec: 'this is team page'
    })
})


const geocode = require('./wether/geocode')
const forecast = require('./wether/forecastFile')


app.get('/wether', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error})
        }

        forecast(data.latitude, data.longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: req.query.address
            })
        })
    })
})












app.get('*', (req, res) => {
    res.send('ERROR : 404 page not found')
})
app.listen(port, () => {
    console.log(`app listen port : ${port}`);
})