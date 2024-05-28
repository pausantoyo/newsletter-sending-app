

// Import the necessary modules
const { Router } = require('express');
const { Newsletter, Recipient, Unsubscriptions } = require('../models');
const sequelize = require('sequelize');



// NewsletterController class
class StatisticsController {
    static instance;
    prefix = 'statistics'; // Prefix for the routes

    // Singleton pattern
    static getInstance() {
        if (!StatisticsController.instance) {
            StatisticsController.instance = new StatisticsController();
        }
        return StatisticsController.instance;
    }

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    // Initialize the routes
    initializeRoutes() {
        this.router.get('/getAll', this.getAll.bind(this));
    }

    // Get all statistics
    async getAll(req, res) {
        try {
            const totalNewsletters = await Newsletter.count();
            const totalRecipients = await Recipient.count({ where: { subscribed: true }});
            const totalUnsubscriptions = await Unsubscriptions.count();
            console.log(totalNewsletters, totalRecipients, totalUnsubscriptions);
            
            // Get the type of newsletter with most unsubscriptions
            const unsubscriptionsByType = await Unsubscriptions.findAll({
                attributes: ['idType', [sequelize.fn('COUNT', 'idType'), 'count']],
                group: ['idType'],
                order: [[sequelize.literal('count'), 'DESC']],
                limit: 1,
            });
            
            const mostUnsubscribedType = unsubscriptionsByType[0]?.idType || null;
    
            res.json({
                totalNewsletters,
                totalRecipients,
                totalUnsubscriptions,
                mostUnsubscribedType,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = StatisticsController;
