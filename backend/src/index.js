/* Sets up a server using Express.js framework. */

// Import required modules
const Server = require('./providers/Server');
const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

// Import controllers
const RecipientController = require('./controllers/RecipientController');
const NewsletterController = require('./controllers/NewsletterController');
const UnsubscriptionController = require('./controllers/UnsubscriptionController');
const StatisticsController = require('./controllers/StatisticsController');

// Create a new server instance
const server = new Server({
    port: PORT,
    middleWares: [express.json(), express.urlencoded({ extended: true }), cors()],
    controllers: [
        RecipientController.getInstance(),
        NewsletterController.getInstance(),
        UnsubscriptionController.getInstance(),
        StatisticsController.getInstance()
    ]
});

server.init();
