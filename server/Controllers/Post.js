const Post = require('../Models/Post');

//-----------------  Used to push Source "News on Air" to the database  -----------------

// exports.initSource = (req, res, next) => {

//     const source = new Source({
//         name: 'prsIndia',
//         url: 'https://prsindia.org/'
//     })

//     source.save()
//         .then(result => {
//             console.log(result);
//             res.status(200).json({ message: 'Hello world' });
//             //next();
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }

//---------------------------------------------------------------------------------------


//Logic to extract posts of a particular category
exports.getPosts = (req, res, next) => {


    Post.find({ category: req.category, source: req.sourceId })
        .then(posts => {
            res.status(200).json({ message: 'posts of sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}






