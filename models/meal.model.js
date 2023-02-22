const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('meals', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER(10,2),
        allowNull: false
    },
    restaurandId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    status: {
        type: DataTypes.ENUM('available','disabled'),
        allowNull: false,
        defaultValue: "available"
    }
})

module.exports = User