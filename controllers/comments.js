const Comment = require('../models/comment');

module.exports = function (app) {
    
    // CREATE Comment
    app.post("/reviews/:school_alias/comments", function (req, res) {
        const comment = new Comment(req.body);
        comment.school_alias = req.params.school_alias;
        comment
            .save()
            .then(review => {
                res.redirect(`/reviews/${req.params.school_alias}`);
            })
            .catch(err => {
                console.log(err);
            });
    });
};