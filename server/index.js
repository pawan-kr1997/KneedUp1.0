const express= require('express');
const mongoose= require('mongoose');
const cors= require('cors');

const userRoutes= require('./Routes/User');
const postRoutes= require('./Routes/Post');

const national= require('./Scheduling/National');
const international= require('./Scheduling/International');
const business= require('./Scheduling/Business');
const sports= require('./Scheduling/Sports');
const niti= require('./Scheduling/Nitiblogs');
const idsa= require('./Scheduling/Idsa');
const pib= require('./Scheduling/Pib');
const prsblog= require('./Scheduling/PRSblog');
const prsarticle= require('./Scheduling/PRSarticle');
const poispeech= require('./Scheduling/PoiSpeeches');
const poipress= require('./Scheduling/PoiPress');
const notificationEmail= require('./Scheduling/NotificationEmail');
const deleteNews= require('./Scheduling/DeleteNews');

require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());

// setInterval(national, 10000);
// setInterval(international, 7000);
// setInterval(business, 13000);
// setInterval(sports, 16000);
// setInterval(niti, 6000);
// setInterval(idsa, 6000);
//setInterval(pib, 6000);
// setInterval(prsblog, 6000);
// setInterval(prsarticle, 6000);
//setInterval(poispeech, 6000);
// setInterval(poipress, 6000);

//setInterval(notificationEmail, 6000);
//setInterval(deleteNews, 6000);



app.use(userRoutes);
app.use(postRoutes);

app.use((error, req, res, next)=>{
    console.log(error);
    const status= error.statusCode || 500;
    const message= error.message;
    res.status(status).json({message: message}); 
})


mongoose.connect(process.env.DATABASE)
        .then(result=>{
            app.listen(8080, ()=> console.log('Server connected'));
        })
        .catch(err=> console.log(err));


