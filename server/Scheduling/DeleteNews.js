const User = require('../Models/User');
const Post = require('../Models/Post');
const mongoose= require('mongoose');


const DeleteNews= () =>{
    let date= Date.now()-432000000;
    Post.deleteMany({'source': { $in: [
        mongoose.Types.ObjectId('627b99ca127e484a9c8cf96d'),
        mongoose.Types.ObjectId('62794c2b06a9d74e0872f4f6')
    ]}, createdAt:{$lt:date}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err);
    })

}

module.exports= DeleteNews;