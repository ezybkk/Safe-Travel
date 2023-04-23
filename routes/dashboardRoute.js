const express = require('express');
const router = express.Router();
const {
  getDashboard,
  getHotline,
  getSpecificHotline,
  getTouristSpot,
  getSpecificTouristSpot,
  getRestaurant,
  getHotel,
  getSpecificRestaurant,
  getSpecificHotel,
  getFavorite,
  postSpotComment,
  postHotelComment,
  postRestaurantComment,
  addToUserFavorite,
  deleteFavorite,
  deleteComment,
} = require('../controller/dashboardController');
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require('../controller/loginController');


router.get('/dashboardHotline', checkAuthenticated, getHotline);
router.get('/dashboardHotline/:id', checkAuthenticated, getSpecificHotline);

router.get('/dashboardHotel', checkAuthenticated, getHotel);
router.get('/dashboardRestaurant', checkAuthenticated, getRestaurant);

router.get('/dashboardSpots/:id', checkAuthenticated, getSpecificTouristSpot);
router.get(
  '/dashboardRestaurant/:id',
  checkAuthenticated,
  getSpecificRestaurant
);
router.get('/dashboardHotel/:id', checkAuthenticated, getSpecificHotel);

router.get('/', checkAuthenticated, getDashboard);
router.get('/dashboardSpots', checkAuthenticated, getTouristSpot);

router.get('/dashboardFavorite', checkAuthenticated, getFavorite);
router.post('/dashboardSpots/comment/:id', checkAuthenticated, postSpotComment);
router.post(
  '/dashboardHotel/comment/:id',
  checkAuthenticated,
  postHotelComment
);
router.post(
  '/dashboardRestaurant/comment/:id',
  checkAuthenticated,
  postRestaurantComment
);
router.post(
  '/dashboardFavorites/:id/:category/:location/:name',
  checkAuthenticated,
  addToUserFavorite
);
router.post('/dashboardFavorites/:id', checkAuthenticated, deleteFavorite);
router.post(
  '/deleteComment/:id/:category/:commentId',
  checkAuthenticated,
  deleteComment
);
module.exports = router;
