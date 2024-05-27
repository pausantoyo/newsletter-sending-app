/* Defines a Sequelize model for a Newsletter entity */

module.exports = (sequelize, DataTypes) => {
    // Define the Newsletter model
    const Newsletter = sequelize.define('Newsletter', {
        idNewsletter: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING
        },
        fileURL: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        idType: {
            type: DataTypes.INTEGER
        },
        creationDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        timestamps: false 
    });

    return Newsletter;
};
