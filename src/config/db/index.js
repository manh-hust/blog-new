const mongoose = require('mongoose');
// const test = require('./postdb.test');
async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, {
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
