const User = require('../Models/User');
const Post = require('../Models/Post');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.signupUser = (req, res, next) => {
    const { emailId, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        const error = new Error('Passwords do not match');
        error.statusCode = 404;
        throw error;
    }

    User.findOne({ emailId: emailId })
        .then(user => {
            if (user) {
                const error = new Error('User with this email id already exists');
                error.statusCode = 404;
                throw error;
            }

            const userNew = new User({
                emailId: emailId,
                password: password,
                category: {
                    news: true,
                    president: true,
                    niti: true,
                    idsa: true,
                    pib: true,
                    prs: true
                },
                bookmark: []
            })

            return userNew.save();

        })
        .then(result => {
            console.log('user has been added');
            res.status(200).json({ message: 'user has been added' });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.loginUser = (req, res, next) => {
    const { emailId, password } = req.body;

    User.findOne({ emailId: emailId })
        .then(user => {

            if (!user) {
                const error = new Error('User does not exist');
                error.statusCode = 422;
                throw error;
            }

            if (user.password !== password) {
                const error = new Error('Password does not match');
                error.statusCode = 422;
                throw error;
            }

            const token = jwt.sign({
                emailId: user.emailId,
                userId: user._id.toString()
            }, 'marvelnewssecret', { expiresIn: '1h' });

            res.status(200).json({ message: 'User verified', user: user, token: token });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}


exports.getCategory = (req, res, next) => {

    User.findOne({ _id: req.userId })
        .then(user => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 422;
                throw error;
            }

            res.status(200).json({ message: 'Category data sent', category: user.category });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


exports.postCategory = (req, res, next) => {

    const updatedNews = req.body.News;
    const updatedPresident = req.body.President;
    const updatedNiti = req.body.Niti;
    const updatedIdsa = req.body.Idsa;
    const updatedPib = req.body.Pib;
    const updatedPrs = req.body.Prs;

    //console.log("niti    "+ updatedNiti+"  president   "+updatedPresident);

    User.findOne({ _id: req.userId })
        .then(user => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 422;
                throw error;
            }

            user.category.news = updatedNews;
            user.category.president = updatedPresident;
            user.category.niti = updatedNiti;
            user.category.idsa = updatedIdsa;
            user.category.pib = updatedPib;
            user.category.prs = updatedPrs;


            user.markModified('category');
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Category data refreshed', result: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.getBookmarks = (req, res, next) => {

    let userDetail = null;

    User.findOne({ _id: req.userId })
        .then(user => {
            userDetail = user;
            const postId = req.params.postId;
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 422;
                throw error;
            }

            return Post.findOne({ _id: postId })
                .populate('source')
        }
        )
        .then(post => {
            console.log(post.source.name);

            let postCategory = '';

            if (post.source.name === 'newsOnAir' && post.category === 'national') {
                postCategory = 'News on Air / National news';
            }
            else if (post.source.name === 'newsOnAir' && post.category === 'international') {
                postCategory = 'News on Air / International news';
            }
            else if (post.source.name === 'newsOnAir' && post.category === 'business') {
                postCategory = 'News on Air / Business news';
            }
            else if (post.source.name === 'newsOnAir' && post.category === 'sports') {
                postCategory = 'News on Air / Sports news';
            }
            else if (post.source.name === 'presidentOfIndia' && post.category === 'speeches') {
                postCategory = 'President of India / Speeches';
            }
            else if (post.source.name === 'presidentOfIndia' && post.category === 'pressReleases') {
                postCategory = 'President of India / Press releases';
            }
            else if (post.source.name === 'idsa' && post.category === 'comments and briefs') {
                postCategory = 'Institute for Defence Studies and Analysis / Comments and Briefs';
            }
            else if (post.source.name === 'prsIndia' && post.category === 'blogs') {
                postCategory = 'PRS India / Blogs';
            }
            else if (post.source.name === 'prsIndia' && post.category === 'articles') {
                postCategory = 'PRS India / Articles';
            }
            else if (post.source.name === 'nitiAayog' && post.category === 'niti blogs') {
                postCategory = 'Niti Aayog / Niti blogs';
            }
            else if (post.source.name === 'pressInformationBureau' && post.category === 'press releases') {
                postCategory = 'Press Information Bureau / Press releases';
            }
            else {
                postCategory = ' ';
            }


            const postId = post._id;
            const postDate = post.createdAt;
            const postURL = post.url;
            const postTitle = post.title;

            let oldBookmark = [...userDetail.bookmark];
            let updatedBookmark = oldBookmark.concat({
                id: postId,
                date: postDate,
                title: postTitle,
                url: postURL,
                category: postCategory
            })

            userDetail.bookmark = updatedBookmark;
            return userDetail.save();
        })
        .then(result => {
            //console.log(result);
            res.status(200).json({ message: 'Result after adding bookmark', user: result });
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}


exports.getUnmarks = (req, res, next) => {
    const postId = req.params.postId;

    User.findOne({ _id: req.userId })
        .then(user => {
            let oldBookmark = [...user.bookmark];

            let updatedBookmark = oldBookmark.filter(el => el.id.toString() !== postId.toString());
            console.log("Updated Bookmark:  " + updatedBookmark);
            user.bookmark = [...updatedBookmark];
            return user.save();
        })
        .then(result => {
            res.status(200).json({ message: 'Post unmarked', user: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.initBookmark = (req, res, next) => {
    User.findOne({ _id: req.userId })
        .then(user => {
            if (!user) {
                const error = new Error('No user found');
                error.statusCode = 422;
                throw error;
            }

            res.status(200).json({message:'init bookmark', data: user.bookmark});

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}