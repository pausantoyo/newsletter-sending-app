/* The NewsletterController class handles creating, uploading files, and sending newsletters to
subscribed recipients */

// Import the necessary modules
const { Router } = require('express');
const { Newsletter, Recipient } = require('../models');
const MailProvider = require('../providers/MailProvider');
const multer = require('multer');
const path = require('path');
const { URL_FRONTEND } = require('../config');

// Configure the storage for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/newsletter');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// NewsletterController class
class NewsletterController {
    static instance;
    prefix = 'newsletter'; // Prefix for the routes

    // Singleton pattern
    static getInstance() {
        if (!NewsletterController.instance) {
            NewsletterController.instance = new NewsletterController();
        }
        return NewsletterController.instance;
    }

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    // Initialize the routes
    initializeRoutes() {
        this.router.post('/createNewsletter', this.createNewsletter.bind(this));
        this.router.post('/uploadFile', upload.single('file'), this.uploadFile.bind(this));
        this.router.post('/:id/send', this.sendNewsletter.bind(this));
    }

    // Create a newsletter
    async createNewsletter(req, res) {
        try {
            console.log(req.body);
            const newsletter = await Newsletter.create(req.body);
            res.status(201).json(newsletter);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }

    // Upload a file
    async uploadFile(req, res) {
        try {
            return res.json({ fileURL: req.file.path });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: error.message });
        }
    }
    
    // Send a newsletter
    // async sendNewsletter(req, res) {
    //     try {
    //         // Find the newsletter by id
    //         const newsletter = await Newsletter.findByPk(req.params.id);
    //         if (!newsletter) {
    //             return res.status(404).json({ error: 'Newsletter not found' });
    //         }

    //         // Find all recipients that are subscribed
    //         const recipients = await Recipient.findAll({ where: { subscribed: true }});
    //         const fileName = path.basename(newsletter.fileURL);
    //         const fileExtension = path.extname(fileName).toLowerCase();

    //         // Convert the image to a PDF
    //         let pdfBuffer;
    //         if (fileExtension === '.png') {
    //             pdfBuffer = await MailProvider.convertPngToPdf(newsletter.fileURL);
    //         }

    //         // Send the newsletter to all recipients
    //         for (const recipient of recipients) {
    //             const attachments = fileExtension === '.png'
    //                 ? [
    //                     {
    //                         filename: 'newsletter.pdf',
    //                         content: pdfBuffer,
    //                         contentType: 'application/pdf'
    //                     }
    //                 ]
    //                 : [
    //                     {
    //                         path: newsletter.fileURL,
    //                         filename: fileName,
    //                         cid: 'unique@nodemailer.com'
    //                     }
    //                 ];

    //             // Send the email
    //             await MailProvider.sendMail({
    //                 to: recipient.email,
    //                 subject: newsletter.title,
    //                 text: newsletter.description,
    //                 attachments,
    //                 html: `<h1>${newsletter.title}</h1><p>${newsletter.description}</p>
    //                     ${fileExtension === '.png' ? '<img src="cid:unique@nodemailer.com"/>' : ''}
    //                     <p>Click <a href=${URL_FRONTEND}/unsubscribe,>here</a> to unsubscribe.</p>`
    //             });
    //         }
    //         res.status(200).json({ message: 'Newsletter sent' });
    //     } catch (error) {
    //         res.status(400).json({ error: error.message });
    //     }
    // }
    async sendNewsletter(req, res) {
        try {
            // Find the newsletter by id
            const newsletter = await Newsletter.findByPk(req.params.id);
            if (!newsletter) {
                return res.status(404).json({ error: 'Newsletter not found' });
            }
    
            // Find all recipients that are subscribed
            const recipients = await Recipient.findAll({ where: { subscribed: true }});
            const fileName = path.basename(newsletter.fileURL);
            const fileExtension = path.extname(fileName).toLowerCase();
    
            // Convert the image to a PDF
            let pdfBuffer;
            if (fileExtension === '.png') {
                pdfBuffer = await MailProvider.convertPngToPdf(newsletter.fileURL);
            }
    
            // Send the newsletter to all recipients
            for (const recipient of recipients) {
                const attachments = fileExtension === '.png'
                    ? [
                        {
                            filename: 'newsletter.pdf',
                            content: pdfBuffer,
                            contentType: 'application/pdf'
                        }
                    ]
                    : [
                        {
                            path: newsletter.fileURL,
                            filename: fileName,
                            cid: 'unique@nodemailer.com'
                        }
                    ];
    
                // Construct the unsubscribe URL with parameters
                const unsubscribeUrl = `${URL_FRONTEND}/unsubscribe?idType=${encodeURIComponent(newsletter.idType)}&idNewsletter=${encodeURIComponent(newsletter.idNewsletter)}&idRecipient=${encodeURIComponent(recipient.idRecipient)}`;
    
                // Send the email
                await MailProvider.sendMail({
                    to: recipient.email,
                    subject: newsletter.title,
                    text: newsletter.description,
                    attachments,
                    html: `<h1>${newsletter.title}</h1><p>${newsletter.description}</p>
                        ${fileExtension === '.png' ? '<img src="cid:unique@nodemailer.com"/>' : ''}
                        <p>Click <a href="${unsubscribeUrl}">here</a> to unsubscribe.</p>`
                });
            }
            res.status(200).json({ message: 'Newsletter sent' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    
}

module.exports = NewsletterController;
