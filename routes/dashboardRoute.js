const express = require('express');
const router = express.Router();
const { 
  getDashboard, 
  getTouristSpot,
  getSpecificTouristSpot,
  getRestaurant,
  getHotel,
  getSpecificRestaurant,
  getSpecificHotel,
  getFavorite,
  postComment
} = require('../controller/dashboardController');
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require('../controller/loginController');

router.get('/dashboardHotel', checkAuthenticated, getHotel);
router.get('/dashboardRestaurant', checkAuthenticated, getRestaurant);

router.get('/dashboardSpots/:id',checkAuthenticated,getSpecificTouristSpot);
router.get('/dashboardRestaurant/:id',checkAuthenticated,getSpecificRestaurant);
router.get('/dashboardHotel/:id',checkAuthenticated, getSpecificHotel);

router.get('/', checkAuthenticated, getDashboard);
router.get('/dashboardSpots', checkAuthenticated, getTouristSpot);

router.get('/dashboardFavorite', checkAuthenticated, getFavorite);
router.post('/dashboardSpots/comment/:id',checkAuthenticated,postComment)

module.exports = router;