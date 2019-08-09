const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const public_directory = path.join(__dirname, '../public');
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

// Setup handleabars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

// Setup static directory to serve
app.use(express.static(public_directory));

// Setup the routes to render the views
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Abhishek'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Abhishek'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abhishek',
        help_paragraph: 'This is help page.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errors: "No address term provided"
        });
    };

    address = req.query.address;

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({
                error
            });
        };

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            };

            res.send({
                location: location,
                forecast: forecastData,
                address: address
            });
        });
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errors: "You must provide search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help page note found baby',
        title: '404 unknow Help URL',
        name: 'Abhishek'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Unknown URL. Please redirect back',
        title: '404 unknow URL',
        location: 'Redirect back'
    });
});

app.listen(8080);