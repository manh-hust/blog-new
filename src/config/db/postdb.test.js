const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    database: 'Mydb',
    username: 'postgres',
    password: '744074',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
})

function test() {
    // db.authenticate()
    //     .then(function () {
    //         console.log('Postgres sussecess !')
    //     })
    //     .catch(function (err) {
    //         console.log(err.message)
    //     })
    
    // const Users  = sequelize.define('User',{
    //     username: Sequelize.STRING,
    //     password: Sequelize.STRING,
    // })
    const Customer = sequelize.define('"Store"."Customer"',{})
    Customer.findAll({
        raw: true,
    })
    .then(function (users) {
        console.log(users)
    })
    .catch((err) => {
        console.log(err.message)
    })
    // const   = db.define('User',{
    //     username: sequelize.STRING,
    //     password: sequelize.STRING,
    // })

    // Users.create({
    // })
    // Users.bulkCreate([
    // ])
    // Users.update({
    //     username: 'XXXX'
    // },{
    //     where: {id: 1}
    // })
    // Users.destroy({
    //     where: {id:3}
    // }) 
    // Users.findAll({
    //         id: [1,4],
    //     // Làm sạch sữ liệu khi lấy ra
    //     raw: true
    // })
    //     .then(function (users) {
    //         console.log(users)
    //     })
    //     .catch(function (err){
    //         console.log(err.message)
    //     })
}

module.exports = {
    test,
    sequelize
}