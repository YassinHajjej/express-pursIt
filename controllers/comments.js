const Listing = require('../models/listing');

module.exports = {
    create,
    delete: deleteComment
};

async function deleteComment(req, res) {
    // Find the listing containing the comment to delete
    const listing = await Listing.findOne({ 'comments._id': req.params.id, 'comments.author': req.user._id });
  
    // If the listing doesn't exist or the comment doesn't belong to the user, redirect
    if (!listing) {
      return res.redirect('/listings');
    }
  
    // Remove the comment from the comments array using the remove method
    listing.comments.remove(req.params.id);
  
    // Save the updated listing
    await listing.save();
  
    // Redirect back to the listing's page
    res.redirect(`/listings/${listing._id}`);
  }

async function create(req, res) {
    try {
        // Find the listing where the comment will be added
        const listing = await Listing.findById(req.params.listingId);

        if (!listing) {
            return res.status(404).send('Listing not found');
        }

        // Create a new comment with user-centric info
        const newComment = {
            text: req.body.text,
            author: req.user._id,
            userName: req.user.name,
            userAvatar: req.user.avatar
        };

        // Add the new comment to the listing's comments array
        listing.comments.push(newComment);

        // Save the updated listing
        await listing.save();

        // Redirect back to the listing's page
        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Error creating comment');
    }
}
