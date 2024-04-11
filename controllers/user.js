const User = require('../models/user');
const Listing = require('../models/listing');
const listings = require('./listings');


module.exports = {
  profile
};

async function profile(req, res) {
  try {
      // Find user's information
      const user = await User.findById(req.user._id);

      // Find all listings posted by the user
      const userListings = await Listing.find({ author: req.user._id });

      // Render the user profile page with user's listings and name
      res.render('user/profile', { user, listings: userListings });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching user profile');
  }
}