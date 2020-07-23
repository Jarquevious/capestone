const Review = require('../models/review');
module.exports = app => {
    // CREATE
    app.post("/reviews/new", (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const review = new Review(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        review.save((err, post) => {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
        })
    });
};