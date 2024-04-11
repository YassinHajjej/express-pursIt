const Listing = require('../models/listing');
const User = require('../models/user');

module.exports = {
    index,
    show,
    new: newListing,
    create,
    delete: deleteListing
};

async function deleteListing(req, res) {
    try {
        // Find the listing to delete
        const listing = await Listing.findOne({ _id: req.params.id, author: req.user._id });

        // If the listing doesn't exist or the user is not the author, redirect
        if (!listing) {
            return res.redirect('/listings');
        }

        // Remove the listing
        await listing.remove();

        // Redirect back to the listings page
        res.redirect('/listings');
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).send('Error deleting listing');
    }
}




async function index(req, res) {
    try {
        // Fetch listings and populate the author and comments fields with user data
        const listings = await Listing.find({}).populate('author').populate('comments.author');
        res.render('listings/index', { title: 'All Listings', listings });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).send('Error fetching listings');
    }
}


async function show(req, res) {
    try {
        const listing = await Listing.findById(req.params.id).populate('author').populate('comments.author');
        res.render('listings/show', { title: 'Listing Detail', listing });
    } catch (error) {
        console.error('Error fetching listing details:', error);
        res.status(500).send('Error fetching listing details');
    }
}




function newListing(req, res) {
    res.render('listings/new', { title: 'Add Listing', errorMsg: '' });
}

async function create(req, res) {
    try {
        // Create a new listing instance with the request body
        const newListing = new Listing(req.body);

        // Add the user-centric info to the new listing
        newListing.author = req.user._id; 
        newListing.userName = req.user.name;
        newListing.userAvatar = req.user.avatar;

        // Save the new listing
        await newListing.save();

        // Redirect to the details page of the newly created listing
        res.redirect(`/listings/${newListing._id}`);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Error creating listing');
    }
}

