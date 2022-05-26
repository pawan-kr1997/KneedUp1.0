const Source = require('../Models/Source');
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


//-----------------  Used to push Source "Institute for Defence Studies and Analysis(IDSA)" to the database  -----------------

// exports.initSource = (req, res, next) => {

//     const source = new Source({
//         name: 'idsa',
//         url: 'https://www.idsa.in/'
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

//-----------------  Used to push Source "Niti Aayog" to the database  -----------------

// exports.initSource = (req, res, next) => {

//     const source = new Source({
//         name: 'nitiAayog',
//         url: 'https://www.niti.gov.in/'
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
//-----------------  Used to push Source "Niti Aayog" to the database  -----------------

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


exports.getNewsPost = (req, res, next) => {


    Post.find({ category: req.category })
        .then(posts => {
            res.status(200).json({ message: 'Posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.getIdsaPost = (req, res, next) => {


    Post.find({ category: req.category, source: '6278c2a8b9bbf30d4fcb2f50' })
        .then(posts => {
            res.status(200).json({ message: 'Idsa posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.getNitiPost = (req, res, next) => {


    Post.find({ category: req.category, source: '6278ec7ff7f7b4422788e4e8' })
        .then(posts => {
            res.status(200).json({ message: 'Niti posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.getPresidentPost = (req, res, next) => {


    Post.find({ category: req.category, source: '627baa0b66a5f4c3ea42a18c' })
        .then(posts => {
            res.status(200).json({ message: 'President of india posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.getPressPost = (req, res, next) => { 


    Post.find({ category: req.category, source: '62794c2b06a9d74e0872f4f6' })
        .then(posts => {
            res.status(200).json({ message: 'Press information bureau posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.getPRSPost = (req, res, next) => {


    Post.find({ category: req.category, source: '627bcd8b92057cdddf06f1ff' })
        .then(posts => {
            res.status(200).json({ message: 'PRS India posts sent', posts: posts });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}









