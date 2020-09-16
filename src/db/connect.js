const mongoose = require('mongoose');

const dbUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_DB_URL
  : process.env.DB_URL;

const connectToDatabase = () => mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion to MongoDB successful !'));

module.exports = connectToDatabase;
