const mongoose = require('mongoose');
require('dotenv').config();

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@acc.3omz8gj.mongodb.net/user?retryWrites=true&w=majority`;

console.log(uri);
const connexion = mongoose
  .connect(uri, connectionParams)
  .then(() => console.log('Connected to User Database'))
  .catch((err) => console.log(err));

module.exports = connexion;
