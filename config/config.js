const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
};