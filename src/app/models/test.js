const Sequelize = require('sequelize')
const sequelize = require('../config/db/postdb.test.js')

const Task = sequelize.define('task',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING
    },
    todiId: {
        type: Sequelize.INTEGER,
    },
    isFinished: {
        type: Sequelize.BOOLEAN
    }
},{
    timestamp: false,
})

module.exports = Task;