/* The MailProvider class handles email sending functionality, including converting PNG images to PDF
and sending emails with attachments. */

// Import required modules
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const nodemailer = require('nodemailer');
const { MAIL_SERVICE, MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS, NAME_USER } = require('../config');

// Define the MailProvider class
class MailProvider {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: MAIL_SERVICE,
            host: MAIL_HOST,
            port: MAIL_PORT,
            secure: false,
            auth: {
                user: MAIL_USER,
                pass: MAIL_PASS
            },
            tls: { rejectUnauthorized: false }
        });
    }

    // Convert a PNG image to a PDF document
    async convertPngToPdf(pngPath) {
        const pngBuffer = await sharp(pngPath).toBuffer();
        const pdfDoc = await PDFDocument.create();
        const pngImage = await pdfDoc.embedPng(pngBuffer);
        const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: pngImage.width,
            height: pngImage.height,
        });
        const pdfBytes = await pdfDoc.save();
        return pdfBytes;
    }

    // Send an email with the specified parameters
    async sendMail({ to, subject, text, html, attachments }) {
        try {
            await this.transporter.sendMail({
                from: `${NAME_USER} <${MAIL_USER}>`,
                to,
                subject,
                text,
                html,
                attachments
            });
            console.log(`Email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending email to ${to}:`, error);
        }
    }
}

module.exports = new MailProvider();



