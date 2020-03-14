const Sequelize = require('sequelize');

module.exports = (sequelize) => sequelize.define('example_table', {
    firstname: {
        type: Sequelize.TEXT,
    },
    lastname: {
        type: Sequelize.TEXT,
    }
}, {
    freezeTableName: true
});