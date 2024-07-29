const mongoose = require('mongoose');
const { dbUrl } = require('../config/config');




const connectToDB = async () => {

    try {
        const connection = await mongoose.connect(dbUrl);
        console.log(`connected to db ${connection.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDB();