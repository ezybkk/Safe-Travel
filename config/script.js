const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const Hotel = require('../model/hotel');
const Spot = require('../model/spots');
const Restaurant = require('../model/restaurant');
// Connection URI and database name
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@acc.3omz8gj.mongodb.net/user?retryWrites=true&w=majority`;

// Sample data to be inserted
//pang ilisi lang ning mga sud sa array if naa kay ipuno sa imong data
const data = [
  {
    Location: 'Cebu',
    Name: 'Anzani Restaurant',
    Details:
      'Anzani Restaurant lets you indulge in the finest of Mediterranean cuisine while taking in a panoramic view of Cebu City. Perched on a cliff, you can sit on the outdoor deck and watch the city come to life at night. The combination of gourmet food, cosy ambiance, and excellent service makes this restaurant really popular with overseas visitors as well as local couples out for a romantic evening.',
    Link: 'https://www.facebook.com/AnzaniRestaurant',
  },
  {
    Location: 'Cebu',
    Name: 'Food Trip Section',
    Details:
      'Food Trip Section is a Restaurant located at 7VQJ+Q4C, Cebu City, Cebu  PH.',
    Link: 'https://web.facebook.com/foodtrip.sec/?_rdc=1&_rdr',
  },
  {
    Location: 'Mandaue',
    Name: 'Nonki Japanese Restaurant',
    Details:
      'Serving fresh sushi, sashimi, maki, tempura, ramen, gyoza, and your favorite Japanese comfort food. They also deliver depending on your location.',
    Link: 'https://web.facebook.com/nonkiph/?_rdc=1&_rdr',
  },
  {
    Location: 'Lapu-Lapu',
    Name: 'Scape Skydeck',
    Details:
      'For those with pure food indulgence in mind, come satisfy your desires with our internationally-inspired plates. We love food, lots of different food, and drinks, just like you.  The team is composed of professional Kitchen and F&B staffs that come from upscale hotels and restaurants in the metro giving Scape Skydeck an extra edge from other restaurants. Dig into their gastronomic dishes while enjoying the magnifique view of the Mactan Channel and the city at night. Scape Skydeck brings you a new level of dining with class and style',
    Link: 'https://www.scapeskydeck.com/',
  },
  {
    Location: 'Lapu-Lapu',
    Name: 'Oriental Spice Gourmet',
    Details:
      'Oriental Spice Gourmet or OSG is an Asian restaurant. Although it is located along the Basak-Marigondon Road, the restaurant is very easy to miss. That’s because aside from the indeterminate acronym plastered across the restaurant facade, there is very little indication that it is, in fact, a restaurant. What makes OSG extra special is the fact that they serve nothing but authentic Southeast Asian dishes. In fact, the restaurant encourages its guests to call before actually proceeding to the restaurant as the owners frequently travel outside the country to buy ingredients and other things needed to operate the restaurant. (Note: They are also closed on Mondays and Tuesdays.)',
    Link: 'https://web.facebook.com/pages/The%20Oriental%20Spice%20Gourmet/225084734205344/',
  },
];

// Connect to the database
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to server');

    // Insert the data into the database
    // ilisan lang nimo ni diri og either Spot, Restaurant or Hotel or Hotlines and etc. if you want to insert data to a specific collection
    Restaurant.insertMany(data)
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
