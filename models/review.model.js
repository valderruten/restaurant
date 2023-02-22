const { DataTypes } = require('sequelize');
const { db } = require('../database/db');

const User = db.define('reviews', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
   

    restaurantId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    
    rating: {
        type: DataTypes.ENUM(1,2,3,4,5),
        allowNull: false        
    }
})

module.exports = User