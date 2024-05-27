/* Defines a Sequelize model for a recipient */
module.exports = (sequelize, DataTypes) => {
    // Define the Recipient model
    const Recipient = sequelize.define('Recipient', {
        idRecipient: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        subscribed: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: false
    });

    return Recipient;
};
