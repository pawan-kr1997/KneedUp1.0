const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        category: {
            type: String
        },
        bookmarked:{
            type: Boolean,
            required: true
        },
        source: {
            type: Schema.Types.ObjectId,
            ref: 'Source',
            required: true

        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);