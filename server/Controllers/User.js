const User = require('../Models/User');
const jwt= require('jsonwebtoken');

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
                    Name: true,
                    Place: true,
                    Animal: true,
                    Thing: true
                },
                bookmark:[]
            })

            return userNew.save();

        })
        .then(result=>{
            console.log('user has been added');
            res.status(200).json({message:'user has been added'});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}

exports.loginUser = (req, res, next) => {
    const {emailId, password}= req.body;

    User.findOne({emailId: emailId})
    .then(user=>{
        
        if(!user){
            const error= new Error('User does not exist');
            error.statusCode= 422;
            throw error;
        }

        if(user.password !== password){
            const error= new Error('Password does not match');
            error.statusCode= 422;
            throw error;
        }

        const token=jwt.sign({
            emailId: user.emailId,
            userId: user._id.toString() 
        }, 'marvelnewssecret', {expiresIn: '1h'});

        res.status(200).json({message: 'User verified', user: user, token: token});
    
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode= 500;
        }
        next(err);
    });
}


exports.getCategory= (req, res, next)=>{
    
    User.findOne({_id: req.userId})
        .then(user=>{
            if(!user){
                const error= new Error('No user found');
                error.statusCode= 422;
                throw error;
            }
            
            res.status(200).json({message:'Category data sent', category:user.category});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode= 500;
            }
            next(err); 
        })
}


exports.postCategory= (req, res, next)=>{

    const updatedName= req.body.Name;
    const updatedPlace= req.body.Place;
    const updatedAnimal= req.body.Animal;
    const updatedThing= req.body.Thing;



    User.findOne({_id: req.userId})
        .then(user=>{
            if(!user){
                const error= new Error('No user found');
                error.statusCode= 422;
                throw error;
            }
            
            user.category.Animal= updatedAnimal;
            user.category.Name= updatedName;
            user.category.Place= updatedPlace;
            user.category.Thing= updatedThing;
            
            
            user.markModified('category');            
            return user.save();
        })
        .then(result=>{
            res.status(200).json({message:'Category data refreshed', result: result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode= 500;
            }
            next(err); 
        })
}