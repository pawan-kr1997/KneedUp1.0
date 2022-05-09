const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const userRoutes= require('./Routes/User');
const postRoutes= require('./Routes/Post');

const app=express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(postRoutes);

app.use((error, req, res, next)=>{
    console.log(error);
    const status= error.statusCode || 500;
    const message= error.message;
    res.status(status).json({message: message});
})


mongoose.connect('mongodb+srv://Pawan:LTsVDUziRvX9bbiq@cluster0.lfx5w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        .then(result=>{
            app.listen(8080, ()=> console.log('Server connected'));
        })
        .catch(err=> console.log(err));


