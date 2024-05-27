/* Sets up a database connection using Sequelize */

const { Sequelize, DataTypes } = require('sequelize');
const { DATABASE_URL, DATABASE_NAME } = require('../config');

// URI de la base de datos
const dbUri = `${DATABASE_URL}/${DATABASE_NAME}`;

// Instancia de Sequelize
const sequelize = new Sequelize(dbUri, {
    dialect: 'postgres',
    logging: false
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Model definitions
db.Recipient = require('./Recipient')(sequelize, DataTypes);
db.Newsletter = require('./Newsletter')(sequelize, DataTypes);
db.NewsletterType = require('./NewsletterType')(sequelize, DataTypes);
db.Unsubscriptions = require('./Unsubscriptions')(sequelize, DataTypes);

// Relationships
db.Recipient.hasMany(db.Unsubscriptions, { foreignKey: 'idRecipient' });
db.Newsletter.hasMany(db.Unsubscriptions, { foreignKey: 'idNewsletter' });
db.NewsletterType.hasMany(db.Unsubscriptions, { foreignKey: 'idType' });

db.Unsubscriptions.belongsTo(db.Recipient, { foreignKey: 'idRecipient' });
db.Unsubscriptions.belongsTo(db.Newsletter, { foreignKey: 'idNewsletter' });
db.Unsubscriptions.belongsTo(db.NewsletterType, { foreignKey: 'idType' });

// Sync database
const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully. ✅');
        await sequelize.sync({ alter: true }); // Synchronize all models
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncDatabase();

module.exports = db;
