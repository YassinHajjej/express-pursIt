const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

// Import the controller function for rendering the user profile
const userCtrl = require('../controllers/user');

// Define the route for the user profile
router.get('/', ensureLoggedIn, userCtrl.profile);

module.exports = router;