/* Defines a Sequelize model for a unsubscription */

module.exports = (sequelize, DataTypes) => {
    // Define the Unsubscriptions model
    const Unsubscriptions = sequelize.define('Unsubscriptions', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idRecipient: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Recipients',
                key: 'idRecipient'
            }
        },
        idNewsletter: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Newsletters',
                key: 'idNewsletter'
            }
        },
        idType: {
            type: DataTypes.INTEGER,
            references: {
                model: 'NewsletterTypes',
                key: 'idType'
            }
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false
    });

    return Unsubscriptions;
};
