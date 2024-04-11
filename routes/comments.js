const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// POST route for creating a new comment
router.post('/:listingId', ensureLoggedIn, commentsCtrl.create);

// DELETE route for deleting a comment
router.delete('/:listingId/:commentId', ensureLoggedIn, commentsCtrl.delete);


module.exports = router;
