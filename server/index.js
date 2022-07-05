const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./Routes/User');
const postRoutes = require('./Routes/Post');

const national = require('./Scheduling/National');
const international = require('./Scheduling/International');
const business = require('./Scheduling/Business');
const sports = require('./Scheduling/Sports');
const niti = require('./Scheduling/Nitiblogs');
const idsa = require('./Scheduling/Idsa');
const pib = require('./Scheduling/Pib');
const prsblog = require('./Scheduling/PRSblog');
const prsarticle = require('./Scheduling/PRSarticle');
const poispeech = require('./Scheduling/PoiSpeeches');
const poipress = require('./Scheduling/PoiPress');
const notificationEmail = require('./Scheduling/NotificationEmail');
const deleteNews = require('./Scheduling/DeleteNews');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// setInterval(national, 3600000);
// setInterval(international, 7200000);
// setInterval(business, 7200000);
// setInterval(sports, 3600000);
// setInterval(niti, 86400000);
// setInterval(idsa, 86400000);
// setInterval(pib, 3600000);
// setInterval(prsblog, 86400000);
// setInterval(prsarticle, 86400000);
// setInterval(poispeech, 86400000);
// setInterval(poipress, 86400000);

// setInterval(notificationEmail, 86400000);
// setInterval(deleteNews, 86400000);

const PORT = process.env.PORT || 8080;

app.use(userRoutes);
app.use(postRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
})


if (process.env.NODE_ENV == "production") {
    app.use(express.static("client/build"));
}



mongoose.connect(process.env.DATABASE)
    .then(result => {
        app.listen(PORT, () => console.log('Server connected'));
    })
    .catch(err => console.log(err));


