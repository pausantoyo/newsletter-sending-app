// Export all the environment variables
require('dotenv').config();

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://postgres:pass@localhost:5432',
    DATABASE_NAME: process.env.DATABASE_NAME || 'newsletter',
    PORT: process.env.PORT || 8080,
    MAIL_SERVICE: process.env.MAIL_SERVICE || 'smtp',
    MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    MAIL_PORT: process.env.MAIL_PORT || 587,
    MAIL_USER: process.env.MAIL_USER || 'example@gmail,com',
    MAIL_PASS: process.env.MAIL_PASS || 'password',
    NAME_USER: process.env.NAME_USER || 'Stori Card',
    URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:3000',
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost'
};
