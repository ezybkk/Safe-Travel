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
      Location: "Bogo",
      Name: "Ze Marco Cafe and Restaurant",
      Details:"Ze Marco Cafe and Restaurant is situated in a picturesque location surrounded by lush greenery, providing a peaceful and relaxing atmosphere that is perfect for an enjoyable dining experience. They offer and boast a range of exotic and delicious dishes, from appetizers to main courses and desserts. On top of that, they provide excellent service.",
      Link: "https://www.facebook.com/thezemarcorestaurant/",
    },
    {
      Location: "Bogo",
      Name: "Capitancillo Cafe and Restaurant",
      Details: "Capitancillo Cafe and Restaurant is located in the City of Bogo. It is a delightful eatery that is known for its exceptional cuisine and cozy ambiance. They also offer a variety of menus to cater to everyone’s palate. On top of that, they also ensure to carefully prepares each dish with fresh ingredients to offer you with best taste and quality.",
      Link: "https://www.facebook.com/Capitancillocafeandrestaurant/",
    },
    {
      Location: "Carcar",
      Name: "The Big Dipper ",
      Details:"The Big Dipper is one of the famous food stops at Carcar City. This is a good choice to bring your family and have fun together dining at this place. They also offer boodle sets and great amenities. Aside from experiencing their impeccable menus and welcoming ambiance, you can also enjoy the festivity of nature where you can fish making this restaurant a unique place to dine on.",
      Link: "https://www.facebook.com/thebigdipperfunfishing/",
    },
    {
      Location: "Naga",
      Name: "Osting's By The Sea Seafood And Grill",
      Details:"Osting’s By The Sea Seafood and Grill is situated near Naga Boardwalk which is a perfect place to dine after wandering around the boardwalk or near destinations. You can also enjoy the scenic view while savoring their delicious and tasteful foods. In addition to that, they also provide Live Band every Wednesday to Sunday to give you an exquisite and enjoyable dining experience.",
      Link: "https://www.facebook.com/OstingBytheSea/",
    },
    {
      Location: "Talisay",
      Name: "Hukad - South Town Mall",
      Details:"Hukad is a Filipino-themed restaurant that offers an ambiance that is both comfortable and relaxing. Their menu is a culinary adventure filled with delicious classic Filipino comfort foods such as crispy pata, sinigang, lechon kawali, and other regional specialties. Moreover, they also offer traditional desserts such as puto, halo-halo, and bibingka, all made with high-quality ingredients and prepared with authentic recipes. ",
      Link: "https://www.facebook.com/hukadsouthtownmallofficial",
    },
    {
      Location: "Toledo",
      Name: "Courtyard",
      Details:"The Courtyard restaurant offers a relaxing and welcoming ambiance, perfect for those looking for a refined yet informal dining experience. Their menu is varied and enticing, offering a range of dishes to suit all tastes and appetites. Their drinks are also equally impressive, with a range of fine wines, craft beers, and signature cocktails, all designed to perfectly complement the delicious food on offer and give you a memorable dining experience.",
      Link: "https://www.facebook.com/courtyardunlimited/",
    },
    {
      Location: "Toldo",
      Name: "Lagkaw Bar and Restaurant",
      Details:"Lagkaw Bar and Restaurant offer a cozy and relaxing ambiance perfect for dining and unwinding. It has a rustic and tropical-inspired interior with wooden furnishings and warm lighting that creates a homey feel. As for the menu, it offers a great selection of Filipino dishes with a twist. Overall, it is an ideal place for family gatherings, intimate dates, and even small celebrations.",
      Link: "https://www.facebook.com/lagkawbar/",
    },
    {
      Location: "Cebu City",
      Name: "Krab Seafood Restaurant",
      Details:"Krab Seafood Restaurant is a seafood lover’s delight, offering the freshest catch of the day served in a cozy and inviting atmosphere. They offer an extensive menu of seafood dishes, including delicious crab, shrimp, lobster, and fish. It also includes Asian-inspired dishes such as Thai curries and sushi rolls, as well as vegetarian and gluten-free options. Whether you’re looking for a casual lunch or a special night out, this place is a perfect destination for seafood lovers.",
      Link: "https://www.facebook.com/krabseafoodresto/",
    },
    {
      Location: "Lapu Lapu City",
      Name: "Opon Republik",
      Details:"Opon Republik is a modern restaurant that offers an eclectic mix of Filipino and international cuisine. It also offers you a comfortable and contemporary ambiance that is perfect for both casual dining and special occasions. Their menu is extensive and includes appetizers, soups, salads, meat dishes, seafood, pasta, and vegetarian options. In addition to the food, they also boast a variety of drink menu. Overall, it is a great place to enjoy delicious food and drinks in a stylish and comfortable environment.",
      Link: "https://www.facebook.com/oponrepublik/",
    },
    {
      Location: "Mandaue City",
      Name: "Tokyo Table",
      Details:"Tokyo Table is a popular Japanese restaurant located in Mandaue City. They offer a vibrant ambiance that is perfect for casual dining, business meetings, and intimate gatherings. Their menu features a wide range of Japanese dishes highlighting local flavors fused into it. Then they also ensure to use of fresh ingredients to prepare their dishes. Overall, this is a great place to enjoy a meal with family and friends.",
      Link: "https://www.facebook.com/TokyoTable/",
    },
    {
      Location: "Balamban",
      Name: "D' Village Antique House and Diner",
      Details:"D' Village Antique House and Diner offer a combination of exquisite antique decor and delicious food. The ambiance of the restaurant is rustic and charming, with antique furnishing and decor that is sure to transport you back in time. They also provide a diverse variety and range of dishes that are sure to satisfy every taste bud. This restaurant is surely worth checking out!",
      Link: "https://web.facebook.com/pages/D-Village-Antique-House-and-Diner/283325498834342",
    },
    {
      Location: "Bantayan",
      Name: "Deigo’s Kitchen",
      Details:"Deigo’s Kitchen is a restaurant known for its vibrant and upbeat ambiance as well as mouth-watering dishes. They have a wide range of menu selections that could cater to the taste buds of all food enthusiasts. Overall, this is a perfect place for a fun night out with friends or a romantic dinner with your significant other.",
      Link: "https://web.facebook.com/diegoskitchen/?_rdc=1&_rdr",
    },
    {
      Location: "Cordova",
      Name: "Lantaw Floating Native Restaurant",
      Details:"Lantaw Floating Native Restaurant boasts a vibrant and cheerful ambiance that is perfect for a relaxed dining experience. Situated on the water, it offers you stunning views of the surrounding seascape that add to the lively atmosphere. As for the menu, they serve a variety of traditional Filipino dishes as well as a selection of seafood specialties that showcase the freshest catch of the day. Overall, they will offer a unique and enjoyable dining experience that is perfect for anyone looking to immerse themselves in Filipino culture while enjoying delicious food in a beautiful setting.",
      Link: "https://www.facebook.com/LantawFloatingNativeRestaurant/",
    },
    
    // {
    //   Location: "",
    //   Name: "",
    //   Details:"",
    //   Link: "",
    // },

];
//cebu, lapu2, mandaue, liloan, toledo, 
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
