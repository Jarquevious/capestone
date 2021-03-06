const Review = require('../models/review');
const Comment = require('../models/comment');

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

    function getComments(school_alias) {
        console.log('Test')
        Comment.find({})
            .then(comments => {
                console.log('Test')

                console.log(`comments:${comments}`) 
                return comments
            })
            .catch(err => {
                console.log(`err.message:${err.message}`);
        });
    };
        
    // Endpoint to home page. Display Reviews on index page(main page)
    app.get('/', (req, res) => {
        // .find method searches DB for reviews
        Review.find({}).lean()
        .then(reviews => {
          res.render("index", { reviews });
        })
        .catch(err => {
          console.log(err.message);
       });  
     })
    // display single review
     app.get("/reviews/:school_alias", function(req, res) {
        // // LOOK UP THE POST
        // Review.findById(req.params.id)
        // .then(review => {
        //     console.log('This is the comments', comments)
        //     // Comment.find({ reviewId: req.params.id }).then(comments => {
        //         // get one comment id
        //         // respond with the template with both values
        //         res.render("reviews-show", { review, comments });
        //     })    
        // })
        // .catch(err => {
        //     console.log(err.message);
        // });
        // .find method searches DB for reviews
        'use strict';
 
        const yelp = require('yelp-fusion');
        const client = yelp.client('jsMEans2yKbx6lwoAE5zIdt5QKlCCkcIm7MNglC8J2p9ksxZTkLdOUsv_4l1b-9_uJSiTH0n3SCARXd1YQHrNYUeM4ysfJCFKtJtLdHxNBbltq1AF4S4HPtaQf4dX3Yx');
        
        client.business(req.params.school_alias).then(response => {
            let school = response.jsonBody;
            let comments = getComments(req.params.school_alias)
            console.log(comments)
            res.render('reviews-show', {school, comments});

        }).catch(e => {
        console.log(e);
        }); 
    });
    
    // Endpoint(route)for create review form
    app.get('/review/new', (req, res) => {
        res.render('new.handlebars');
    })

    // find schools 
    app.post("/find/schools", (req, res) => {
        // city
        let city = req.body.city

        'use strict';
 
        const yelp = require('yelp-fusion');
        const client = yelp.client('jsMEans2yKbx6lwoAE5zIdt5QKlCCkcIm7MNglC8J2p9ksxZTkLdOUsv_4l1b-9_uJSiTH0n3SCARXd1YQHrNYUeM4ysfJCFKtJtLdHxNBbltq1AF4S4HPtaQf4dX3Yx');
        
        client.search({
            term: 'Middle Schools',
            location: city,
        }).then(response => {
            schools = response.jsonBody.businesses;
            res.render('index', {schools});
        }).catch(e => {
            console.log(e);
        });
    });
    // app.get('/detail/:id', (req, res) => {
    //     // .find method searches DB for reviews
    //     'use strict';
 
    //     const yelp = require('yelp-fusion');
    //     const client = yelp.client('jsMEans2yKbx6lwoAE5zIdt5QKlCCkcIm7MNglC8J2p9ksxZTkLdOUsv_4l1b-9_uJSiTH0n3SCARXd1YQHrNYUeM4ysfJCFKtJtLdHxNBbltq1AF4S4HPtaQf4dX3Yx');
        
    //     client.business(req.params.id).then(response => {
    //     let school = response.jsonBody;
    //     var comments = Comment.find({"school_alias":school.alias}).lean();
    //         console.log(comments)
    //     res.render('review-detail', {school, comments});

    //     }).catch(e => {
    //     console.log(e);
    //     }); 
    //  })
};

    