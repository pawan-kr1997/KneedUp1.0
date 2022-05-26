const User = require('../Models/User');
const Post = require('../Models/Post');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { builtinModules } = require('module');
require('dotenv').config();

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.APIKEY
    }
}))

const NotificationEmail=()=>{

    let data={
        idsa: 0,
        nitiAayog: 0,
        pressInformationBureau: 0,
        newsOnAir: 0,
        presidentOfIndia: 0,
        prsIndia: 0
    }



    let date= Date.now()- 86400000;

    Post.find({createdAt:{$gt:date}})
        .populate('source')
        .then(posts=>{

            for(let i=0; i<posts.length; i++){
                let tempData={...data,
                [posts[i].source.name]: data[posts[i].source.name]+1}
                    
                data= tempData;
            }

            return User.find()
        })
        .then(users=>{
            for(let i=0; i<users.length; i++){
                 transport.sendMail({
                    to: users[i].emailId,
                    from: '"KneedUp" <hello@kneedup.com>',
                    subject: 'Notification of new posts',
                    text: 'Notification',
                    html: `<p><h3>Post Notification</h3></p>
                           <p><strong>News of air :</strong> ${data.newsOnAir} new posts</p>
                           <p><strong>Niti Aayog :</strong> ${data.nitiAayog} new posts</p>
                           <p><strong>Institute for Defence studies and analysis :</strong> ${data.idsa} new posts</p>
                           <p><strong>Press information bureau :</strong> ${data.pressInformationBureau} new posts</p>
                           <p><strong>President of India :</strong> ${data.presidentOfIndia} new posts</p>
                           <p><strong>PRS India :</strong> ${data.prsIndia} new posts</p>
                           <br>
                           <p>For viewing the posts visit us on:<a href="http://localhost:3000/"> http://localhost:3000/</a></p>
                           `
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
    
}

module.exports= NotificationEmail;


