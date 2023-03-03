const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const Meal = db.define('meals', {
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
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    restaurandId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    status: {
        type: DataTypes.STRING,
        allowNull: false ,
        defaultValue: "available"
    }
})

module.exports = Meal