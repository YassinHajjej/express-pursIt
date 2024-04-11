const express = require('express');
const router = express.Router();
const listingsCtrl = require('../controllers/listings');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /listings
router.get('/', listingsCtrl.index);

// GET /listings/new (form for adding a new listing)
router.get('/new', ensureLoggedIn, listingsCtrl.new);

// GET /listings/:id (show details of a listing)
router.get('/:id', ensureLoggedIn,listingsCtrl.show);

// POST /listings (create a new listing)
router.post('/', ensureLoggedIn, listingsCtrl.create);

// DELETE /listings/:id (delete a listing)
router.delete('/:id', ensureLoggedIn, listingsCtrl.delete);
// PUT /listings/:id (update a listing)
router.put('/:id', ensureLoggedIn, listingsCtrl.update); 


module.exports = router;
