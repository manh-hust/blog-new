const mongoose = require('mongoose');
const test = require('./postdb.test');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ddm_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await test.test()
        console.log('Connect OKKKKK !');
    } catch (error) {
        console.log('Connect Fail !');
    }
}



module.exports = { connect };
