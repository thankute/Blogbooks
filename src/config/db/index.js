const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL, () => {
            console.log("DB connected successfully");
        })
    } catch (error) {
        console.log("Connected failed");
    }
}

module.exports = { connect };
