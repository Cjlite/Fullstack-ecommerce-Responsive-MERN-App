// const mongoose = require('mongoose')

// mongoose.set("strictQuery", false);
// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => console.log("Connect to Databse"))
//     .catch((err) => console.log(err));


const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chetanecommerce';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

module.exports = mongoose;
