/* Defines a Sequelize model for a newsletter type */
module.exports = (sequelize, DataTypes) => {
    // Define the NewsletterType model
    const NewsletterType = sequelize.define('NewsletterType', {
        idType: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    });

    return NewsletterType;
};
