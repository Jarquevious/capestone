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
    // Endpoint to home page. Display Reviews on index page(main page)
    app.get('/', (req, res) => {
        // .find method searches DB for reviews
        Review.find({}).lean()
        .then(reviews => {
          res.render("reviews-index", { reviews });
        })
        .catch(err => {
          console.log(err.message);
       });  
     })

     app.get("/reviews/:id", function(req, res) {
        // LOOK UP THE POST
        Review.findById(req.params.id).lean()
        .then(review => {
            console.log(review)
            res.render("reviews-show", { review });
        })
        .catch(err => {
            console.log(err.message);
        });
    });
    
    // Endpoint(route)for create review form
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new.handlebars');
    })
};

    