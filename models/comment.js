const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");


const CommentSchema = new Schema({
    // author : { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    school_alias: { type: String, required: true },
    // comments: [{type: Schema.Types.ObjectId, ref: "Comment"}] 
});

// Always populate the author field
CommentSchema
    .pre('findOne', Populate('school_alias'))
    .pre('find', Populate('school_alias'))
    .pre('findOne', Populate('content'))
    .pre('find', Populate('content'))
    
module.exports = mongoose.model("Comment", CommentSchema);