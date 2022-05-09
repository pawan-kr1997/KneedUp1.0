const jwt= require('jsonwebtoken');

module.exports= (req, res, next)=>{
    const token= req.headers.authorization;

    //const token= req.get('Authorization').split(' ')[1];
    

    let decodedToken;
    try{
        decodedToken= jwt.verify(token, 'marvelnewssecret');
    }
    catch(err){
        res.status(200).json({message:'Not logged In', category:{Name:true, Place:true, Animal:true, Thing:true}})
        err.statusCode= 500;
        throw err;
    }

    if(!decodedToken){
        const error= new Error('not authenticated');
        error.statusCode= 401;
        throw error;
    }

    req.userId= decodedToken.userId;
    next();

}