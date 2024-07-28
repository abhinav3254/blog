const mongoose = require('mongoose');


const connectToDB = async () => {

    try {
        const connection = await mongoose.connect(`mongodb+srv://mitesh908:mitesh908@cluster0.6yr3wix.mongodb.net/`);
        console.log(`connected to db ${connection.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDB();