# Backend - Newsletter App

## Description
This project is the backend part of the newsletter application. It provides APIs for managing newsletters, subscribers, and sending emails.

## Requirements
- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)
- PostgreSQL (or any other database supported by Sequelize)

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/pausantoyo/newsletter-sending-app
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure environment variables:
    Create a `.env` file in the project root with the following variables:
    ```env
    DATABASE_URL=postgres://user:password@localhost:5432
    DATABASE_NAME=newsletter_db
    PORT=8080
    MAIL_SERVICE=smtp
    MAIL_HOST=smtp.office365.com
    MAIL_PORT=587
    MAIL_USER=your_email@example.com
    MAIL_PASS=your_email_password
    NAME_USER=Your Name
    FRONTEND_URL=http://localhost:3000
    BACKEND_URL=http://localhost
    ```
    Keep in mind that for the mail connection you will need to create a device password if you have the two factor authentication.

## Running in Development
1. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2. The backend will be available at `http://localhost:8080`

## Docker
### Building the Image
```bash
docker build -t newsletter-backend .
```
### Running the container
``` bash
docker run -p 8080:8080 --env-file .env newsletter-backend
```

