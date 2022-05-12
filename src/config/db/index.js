const mongoose = require('mongoose');
// const test = require('./postdb.test');
async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI || 'mongodb+srv://DDManh:conchimxanh874@cluster0.cgmrz.mongodb.net/ddm_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // await test.test()
        console.log('Connect OKKKKK !');
    } catch (error) {
        console.log('Connect Fail !');
    }
}



module.exports = { connect };
