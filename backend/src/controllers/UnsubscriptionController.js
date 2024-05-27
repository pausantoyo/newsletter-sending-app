/* The UnsubscriptionController class handles unsubscription-related
operations */

// Import the necessary modules
const { Router } = require('express');
const { Newsletter, Recipient, Unsubscriptions } = require('../models');

// UnsubscriptionController class
class UnsubscriptionController {
    static instance;
    prefix = 'unsubscription'; // Prefix for the routes

    // Singleton pattern
    static getInstance() {
        if (!UnsubscriptionController.instance) {
            UnsubscriptionController.instance = new UnsubscriptionController();
        }
        return UnsubscriptionController.instance;
    }

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    // Initialize the routes
    initializeRoutes() {
        this.router.get('/getAll', this.getAllUnsubscription.bind(this));
    }

    // Get all unsubscriptions
    async getAllUnsubscription(req, res) {
        try {
            const unsubscriptions = await Unsubscriptions.findAll();
            res.status(200).json(unsubscriptions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = UnsubscriptionController;
