const Review = require('../models/review');
module.exports = app => {
    // CREATE
    app.post("/reviews/new/review", (req, res) => {
        // INSTANTIATE INSTANCE OF POST MODEL
        const review = new Review(req.body);
        // SAVE INSTANCE OF POST MODEL TO DB
        console.log(res.body)
        review.save((err, review) => {
            console.log(review)
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
        })
    });

    app.get('/', (req, res) => {
        Review.find({}).lean()
        .then(reviews => {
          res.render("reviews-index", { reviews });
        })
        .catch(err => {
          console.log(err.message);
       });    })
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new.handlebars');
    })
};