/* The Server class sets up an Express server with controllers, connects to a PostgreSQL
database, and creates the database if it does not exist. */

// Import required modules
const express = require('express');
const cors = require('cors');
const { sequelize } = require('../models');
const { DATABASE_URL, DATABASE_NAME, PORT, BACKEND_URL } = require('../config');
const { Client } = require('pg');

// Define the Server class
class Server {
    // Constructor for the Server class
    constructor({ port, postgresUri, middleWares, controllers }) {
        this._app = express();
        this.port = port;
        this.postgresUri = postgresUri;
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));
        this.loadControllers(controllers);
    }

    // Load controllers into the Express app
    loadControllers(controllers) {
        controllers.forEach(controller => {
            this._app.use(`/${controller.prefix}`, controller.router);
        });
    }

    // Initialize the server
    async init() {
        try {
            await this.createDatabaseIfNotExists();
            await sequelize.authenticate();
            console.log('Database connected successfully.✨');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        // Start the server
        this._app.listen(this.port, () => {
            console.log(`Server 🚀: Running @'${BACKEND_URL}:${PORT}'`);
        });
    }

    // Create the database if it does not exist
    async createDatabaseIfNotExists() {
        const client = new Client({
            connectionString: DATABASE_URL,
        });

        try {
            // Connect to the PostgreSQL server
            await client.connect();
            const dbName = DATABASE_NAME;

            // Check if the database exists
            const result = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
            if (result.rowCount === 0) {
                await client.query(`CREATE DATABASE ${dbName}`);
                console.log(`Database ${dbName} created successfully. ✅`);
            } else {
                console.log(`Database ${dbName} already exists.`);
            }
        } catch (error) {
            console.error('Error creating database:', error);
        } finally {
            await client.end();
        }
    }
}

module.exports = Server;
