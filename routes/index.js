var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/listings'); // Redirect to listings page instead of potential infinite redirection loop
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email']
  }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/listings', // Redirect to listings page upon successful authentication
    failureRedirect: '/listings' // Redirect to home page upon failed authentication
  }
));


// OAuth logout route
router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/listings');
  });
});



module.exports = router;