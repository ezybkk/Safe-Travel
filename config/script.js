const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Hotel = require('../model/hotel');
const Spot = require('../model/spots');
const Restaurant = require('../model/restaurant');
const Hotline = require('../model/hotline');
// Connection URI and database name
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@acc.3omz8gj.mongodb.net/user?retryWrites=true&w=majority`;

// Sample data to be inserted
//pang ilisi lang ning mga sud sa array if naa kay ipuno sa imong data
const data = [
  {
    Location: 'Cebu',
    BFP: '160',
    Police:'166',
    Hospital: '(032) 233 9300',
  },
  {
    Location: 'Lapu-Lapu',
    BFP: '0923 815 7667',
    Police:'032 255-3943',
    Hospital: '(032) 340 2994',
  },
  {
    Location: 'Mandaue',
    BFP: '(032) 344 4747',
    Police: '032 344-6221',
    Hospital: '+63.32.345-1486 ',
  },
  {
    Location: 'Liloan',
    BFP: '5643781',
    Police:'5642200',
    Hospital: '5130214',
  },
  {
    Location: 'Toledo',
    BFP: '+63 966 216 5466',
    Police:'(419) 255-8443',
    Hospital: '217-849-3911',
  },
];
//cebu, lapu2, mandaue, liloan, toledo, 
// Connect to the database
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to server');

    // Insert the data into the database
    // ilisan lang nimo ni diri og either Spot, Restaurant or Hotel or Hotlines and etc. if you want to insert data to a specific collection
    Hotline.insertMany(data)
      .then((result) => {
        console.log('Inserted', result.length, 'documents');
        mongoose.connection.close();
      })
      .catch((err) => {
        console.log('Error inserting data:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });
