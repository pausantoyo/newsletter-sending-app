/* The RecipientController class handles CRUD operations for managing
recipients, including creating single recipients, bulk recipients, uploading recipients from a file,
and unsubscribing recipients. */

// Import the necessary modules
const { Router } = require('express');
const { Recipient, Unsubscriptions } = require('../models');
const multer = require('multer');
const fs = require('fs');
const MailProvider = require('../providers/MailProvider');


// Configure the storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/recipients');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// RecipientController class
class RecipientController {
    static instance;
    prefix = 'recipient'; // Prefix for the routes

    // Singleton pattern
    static getInstance() {
        if (!RecipientController.instance) {
            RecipientController.instance = new RecipientController();
        }
        return RecipientController.instance;
    }

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    // Initialize the routes
    initializeRoutes() {
        this.router.post('/createRecipient', this.createRecipient.bind(this));
        this.router.post('/bulk', this.createRecipientsBulk.bind(this));
        this.router.post('/uploadFile', upload.single('file'), this.uploadRecipients.bind(this));
        this.router.put('/:id/unsubscribe', this.unsubscribeRecipient.bind(this));
    }

    // Create a recipient
    async createRecipient(req, res) {
        try {

            // Check if the recipient already exists
            const { email } = req.body;
            const existingRecipient = await Recipient.findOne({ where: { email } });

            if (existingRecipient) {
                return res.status(200).json({ message: 'Recipient already exists' });
            }

            // Create the recipient
            const recipient = await Recipient.create(req.body);
            res.status(201).json(recipient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Create multiple recipients
    async createRecipientsBulk(req, res) {
        try {
            // Get the emails from the request body
            const emails = req.body.emails;
            const existingRecipients = await Recipient.findAll({ where: { email: emails } });

            // Filter out the existing recipients
            const existingEmails = existingRecipients.map(recipient => recipient.email);
            const newEmails = emails.filter(email => !existingEmails.includes(email));

            if (newEmails.length === 0) {
                return res.status(200).json({ message: 'All recipients already exist' });
            }

            // Create the new recipients
            const recipients = await Recipient.bulkCreate(newEmails.map(email => ({ email })));
            res.status(201).json(recipients);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Upload recipients from a file
    async uploadRecipients(req, res) {
        try {
            // Get the file path and read the data
            const filePath = req.file.path;
            const recipients = [];

            // Check if the file is a text file
            if (req.file.mimetype === 'text/plain') {
                // Read the file and extract the emails
                const data = fs.readFileSync(filePath, 'utf-8');
                const emails = data.split('\n').map(line => line.trim()).filter(email => email);

                // Check if the recipients already exist
                const existingRecipients = await Recipient.findAll({ where: { email: emails } });
                const existingEmails = existingRecipients.map(recipient => recipient.email);
                const newEmails = emails.filter(email => !existingEmails.includes(email));

                if (newEmails.length === 0) {
                    return res.status(200).json({ message: 'All recipients already exist' });
                }

                // Create the new recipients
                newEmails.forEach(email => recipients.push({ email }));
                await Recipient.bulkCreate(recipients);
                res.status(201).json(recipients);
            } else {
                res.status(400).json({ error: 'Unsupported file type' });
            }
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    // Unsubscribe a recipient
    async unsubscribeRecipient(req, res) {
        try {
            // Get the recipient id and newsletter id from the request
            const { id } = req.params;
            const { idNewsletter, idType } = req.body;
            const recipient = await Recipient.findByPk(id);
            if (!recipient) {
                return res.status(404).json({ error: 'Recipient not found' });
            }

            // Create an unsubscription record
            await Unsubscriptions.create({
                idRecipient: id,
                idNewsletter,
                idType,
                date: new Date()
            });

            // Send an email to the recipient
            await MailProvider.sendMail({
                to: recipient.email,
                subject: 'Unsubscription Confirmation',
                text: `You have successfully unsubscribed from the newsletter.`,
                html: `<p>You have successfully unsubscribed from <strong>the newsletter</strong>.</p>`
            });

            // Update the recipient's subscription status
            await recipient.update({ subscribed: false });
            res.status(200).json({ message: 'Recipient unsubscribed' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = RecipientController;
