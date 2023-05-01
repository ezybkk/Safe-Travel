const Spot = require('../model/spots');
const Restaurant = require('../model/restaurant');
const Hotel = require('../model/hotel');
const Hotline = require('../model/hotline');
const User = require('../model/user');
const bcrypt = require('bcrypt');

const getDashboard = async (req, res) => {
  const user = await req.user;
  res.render('dashboard/dashboard', { user });
};



const getHotline = async (req, res) => {
  const user = await req.user;
  const hotlines = await Hotline.find({});
  res.render('dashboard/dashboardHotline', { user, hotlines });
};

const getSpecificHotline = async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  const hotline = await Hotline.findById({ _id: id});
  res.render('dashboard/dashboardhotlineSpecific', { hotline, user });
}

const getTouristSpot = async (req, res) => {
  const user = await req.user;
  const spots = await Spot.find({});
  res.render('dashboard/dashboardSpots', { user, spots });
};

const getSpecificTouristSpot = async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  const spot = await Spot.findById({ _id: id });
  res.render('dashboard/dashboardspotSpecific', { spot, user });
};

const getRestaurant = async (req, res) => {
  const user = await req.user;
  const restaurants = await Restaurant.find({});
  res.render('dashboard/dashboardRestaurant', { user, restaurants });
};

const getSpecificRestaurant = async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  const restaurant = await Restaurant.findById({ _id: id });

  res.render('dashboard/dashboardrestaurantSpecific', { restaurant, user });
};

const getHotel = async (req, res) => {
  const user = await req.user;
  const hotels = await Hotel.find({});
  res.render('dashboard/dashboardHotel', { user, hotels });
};

const getSpecificHotel = async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  const hotel = await Hotel.findById({ _id: id });

  res.render('dashboard/dashboardhotelSpecific', { hotel, user });
};

const getProfile = async (req, res) => {
  const user = await req.user;
  res.render('dashboard/dashboardProfile', { user });
};

// const changeName = async (req, res) => {
//   const { id } = user._id;
//   const { firstName, lastName } = req.body;
//   const user = await req.user;
//   await user.updateOne(
//     { _id: id },
//     {
//       $push: {
//         User: [
//           {
//             firstName: firstName,
//             lastName: lastName,
//           },
//         ],
//       },
//     }
//   );
//   res.redirect('/dashboard/dashboardProfile');
// }


const changeName = async (req, res) =>{
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { firstName, lastName },
      { new: true }
    );
    res.redirect('/dashboard/dashboardProfile');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
}


const changePass = async(req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    // Fetch user from database
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
  
    // Check if the old password matches
    if (!oldPassword) {
      return res.status(400).json({ msg: 'Current password required' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
       return res.status(400).json({ msg: 'Invalid credentials' });
    }
  
    // Hash the new password
    if (!newPassword) {
      return res.status(400).json({ msg: 'New password required' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    // Update user's password in database
    user.password = hashedPassword; // update the user object's password field
    await user.save(); // save the updated user object to the database
  
    // res.json({ msg: 'Password updated successfully' });
    res.redirect('/dashboard/dashboardProfile');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// const changePass = async(req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(req.user._id);

//     // Check if current password matches
//     await user.comparePassword(req.body.currentPassword);

//     // Check if new password and confirm password match
//     if (req.body.newPassword !== req.body.confirmPassword) {
//       return res.status(400).send({ error: 'New password and confirm password do not match' });
//     }

//     // Update user password
//     user.password = req.body.newPassword;
//     await user.save();

//     res.send({ message: 'Password changed successfully' });
//   } catch (err) {
//     res.status(400).send({ error: 'Unable to change password' });
//   }
// };
  


const getFavorite = async (req, res) => {
  const user = await req.user;
  res.render('dashboard/dashboardFavorite', { user });
};

const postSpotComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const user = await req.user;
  await Spot.updateOne(
    { _id: id },
    {
      $push: {
        Comments: [
          {
            message: comment,
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
            date: new Date().toLocaleString(),
          },
        ],
      },
    }
  );
  res.redirect(`/dashboard/dashboardSpots/${id}`);
};
const postRestaurantComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const user = await req.user;
  await Restaurant.updateOne(
    { _id: id },
    {
      $push: {
        Comments: [
          {
            message: comment,
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
            date: new Date().toLocaleString(),
          },
        ],
      },
    }
  );
  res.redirect(`/dashboard/dashboardRestaurant/${id}`);
};
const postHotelComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const user = await req.user;
  await Hotel.updateOne(
    { _id: id },
    {
      $push: {
        Comments: [
          {
            message: comment,
            userId: user._id,
            userName: `${user.firstName} ${user.lastName}`,
            date: new Date().toLocaleString(),
          },
        ],
      },
    }
  );
  res.redirect(`/dashboard/dashboardHotel/${id}`);
};
const deleteComment = async (req, res) => {
  const { id, category, commentId } = req.params;
  if (category === 'spot') {
    await Spot.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          Comments: {
            _id: commentId,
          },
        },
      }
    );
    res.redirect(`/dashboard/dashboardSpots/${id}`);
  } else if (category === 'restaurant') {
    await Restaurant.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          Comments: {
            _id: commentId,
          },
        },
      }
    );
    res.redirect(`/dashboard/dashboardRestaurant/${id}`);
  } else if (category === 'hotel') {
    await Hotel.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          Comments: {
            _id: commentId,
          },
        },
      }
    );
    res.redirect(`/dashboard/dashboardHotel/${id}`);
  }
};
const addToUserFavorite = async (req, res) => {
  const { id, category, location, name } = req.params;
  const user = await req.user;
  //check first if nag exists naba siya sa favorites before mag insert para di mag doble2x ang data
  const check = await User.findOne(
    {
      _id: user._id,
    },
    {
      favorite: {
        $elemMatch: {
          id: id,
        },
      },
    }
  );
  if (check.favorite.length === 0) {
    await User.updateOne(
      { _id: user._id },
      {
        $push: {
          favorite: [
            {
              id,
              category,
              location,
              name,
            },
          ],
        },
      }
    );
  }

  res.redirect(`/dashboard/dashboardFavorite`);
};
const deleteFavorite = async (req, res) => {
  const { id } = req.params;
  const user = await req.user;
  await User.updateOne(
    {
      _id: user._id,
    },
    {
      $pull: {
        favorite: {
          id: id,
        },
      },
    }
  );
  res.redirect('/dashboard/dashboardFavorite');
};
module.exports = {
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
  postRestaurantComment,
  postHotelComment,
  addToUserFavorite,
  deleteFavorite,
  deleteComment,
  getProfile,
  changeName,
  changePass,
};
