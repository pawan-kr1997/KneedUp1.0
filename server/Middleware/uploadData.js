const mongoose = require('mongoose');

const Post = require('../Models/Post');
const Source = require('../Models/Source');

//Logic to upload newly published scrapped posts to the database

module.exports = (req, res, next) => {

    let currentArticles = [];
    let oldArticles = [];
    let toBeAddedArticles = [];

    Source.findOne({ name: req.sourceName })
        .then(sourceData => {
            currentArticles = [...sourceData.data[req.category].currentState];
            oldArticles = [...sourceData.data[req.category].oldState];


            if (oldArticles.length === 0) {
                oldArticles = [...currentArticles];
                toBeAddedArticles = [...currentArticles];
                toBeAddedArticles = toBeAddedArticles.reverse();

                sourceData.data[req.category].oldState = [...oldArticles];
                return sourceData.save();
            }
            else if (currentArticles[0].title === oldArticles[0].title) {
                oldArticles = [...currentArticles];
                sourceData.data[req.category].oldState = [...oldArticles];
                return sourceData.save();
            }
            else {
                let index = currentArticles.length;      
                for (let i = 0; i < currentArticles.length; i++) {
                    if (oldArticles[0].title === currentArticles[i].title) {
                        index = i;
                        break;
                    }
                }

                for (let i = 0; i < index; i++) {
                    toBeAddedArticles.push({
                        title: currentArticles[i].title,
                        url: currentArticles[i].url
                    })
                }

                toBeAddedArticles = toBeAddedArticles.reverse();
                oldArticles = [...currentArticles];
                sourceData.data[req.category].oldState = [...oldArticles];

                return sourceData.save();
            }

        })
        .then(result => {

            let mongoInsertArray=[];

            for (let i = 0; i < toBeAddedArticles.length; i++) {
                mongoInsertArray.push({
                    title: toBeAddedArticles[i].title,
                    url: toBeAddedArticles[i].url,
                    category: req.category,
                    bookmarked: false,
                    source: mongoose.Types.ObjectId(req.sourceId)
                })
            }

            if (toBeAddedArticles.length > 0) {
                Post.insertMany(mongoInsertArray)
                    .then(output => {
                        console.log("Post has been saved: ");
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            else {
                next();
            }

            
        })
        .catch(err => {
            console.log(err);
        })
}   