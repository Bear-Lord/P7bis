const express = require('express'); // Framework d'infrastructure d'applications Web Node.js
const bodyParser = require('body-parser'); //Permet de gérer les demandes POST provenant de l'application front-end
const xss = require('xss-clean'); //Permet d'éviter les failles XSS lors de rentrées de données dans les input
const helmet = require("helmet");  // Permet de sécuriser les en-têtes HTTP

// Utilisation du framework express
const app = express();

//routes
const routesPosts = require('./routes/routesPosts');
const routesUsers = require('./routes/routesUsers');
const routesMod = require('./routes/routesMod');

//Middleware header qui permet à toutes les demandes de toutes les origines d'accéder à notre API 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(xss());
app.use (helmet()); 
app.use(bodyParser.json());

app.use('/api/posts', routesPosts);
app.use('/api/auth', routesUsers);
app.use('/api/moderation', routesMod);

module.exports = app;