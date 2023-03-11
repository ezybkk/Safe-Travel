const Spot = require('../model/spots');
const Restaurant = require('../model/restaurant');
const Hotel = require('../model/hotel');
const Hotline = require('../model/hotline');

const getDashboard = async (req, res) => {
    const user = await req.user;
    res.render('dashboard/dashboard', { user });
  }

const getTouristSpot = async (req, res) => {
  
  const user = await req.user;
  const spots = await Spot.find({})
  res.render('dashboard/dashboardSpots', { user ,spots});
}

const getSpecificTouristSpot = async(req,res)=>{
  const {id} = req.params
  const user = await req.user;
const spot = await Spot.findById({_id:id});

res.render('dashboard/dashboardspotSpecific',{spot,user})
}

const getRestaurant = async (req, res) => {
  const user = await req.user;
  const restaurants = await Restaurant.find({})
  res.render('dashboard/dashboardRestaurant', { user ,restaurants});
}

const getSpecificRestaurant = async(req,res)=>{
  const {id} = req.params
  const user = await req.user;
const restaurant = await Restaurant.findById({_id:id});

res.render('dashboard/dashboardrestaurantSpecific',{restaurant,user})
}

const getHotel = async (req, res) => {
  
  const user = await req.user;
  const hotels = await Hotel.find({})
  res.render('dashboard/dashboardHotel', { user ,hotels });
}

const getSpecificHotel = async(req,res)=>{
  const {id} = req.params
  const user = await req.user;
const hotel = await Hotel.findById({_id:id});

res.render('dashboard/dashboardhotelSpecific',{hotel,user})
}

const getFavorite = async (req, res) => {
  const user = await req.user;
  res.render('dashboard/dashboardFavorite', { user });
}

const postComment = async(req,res)=>{
  const {id} = req.params
  const {comment}= req.body
  const user = await req.user
  console.log(id)
  const commentz = await Spot.updateOne({_id:id},{$push:{comment:[{
    message:comment,
    userId:user._id,
  }]}})
  console.log(`${commentz} helo`)
}

 
  module.exports = {
    getDashboard,
    getTouristSpot,
    getSpecificTouristSpot,
    getRestaurant,
    getHotel,
    getSpecificRestaurant,
    getSpecificHotel,
    getFavorite,
    postComment

  };