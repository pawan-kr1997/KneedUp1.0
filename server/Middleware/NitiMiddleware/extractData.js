const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('../../Models/Post');
const mongoose = require('mongoose');
const Source = require('../../Models/Source');

module.exports = (req, res, next) => {

    const category = req.params.category;
    let url = "";

    switch (category) {
        case 'nitiBlogs':
            url = "https://www.niti.gov.in/niti-blogs";
            req.category = 'niti blogs';
            break;

        default:
            url = "";
    }

    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];


            $('.field-content', html).each(function () {
                const content = $(this).text()
                const href = $(this).children('a').attr("href");

                if (href) {
                    articles.push({
                        title: content.trim(),
                        url: "https://www.niti.gov.in/" + href
                    });

                }

            })
            
            const temp = articles.filter(el => el.title !== '');
            //console.log(temp);



            Source.findOne({ name: 'nitiAayog' })
                .then(sourceData => {
                    sourceData.currentState = temp;
                    //console.log("``````"+sourceData.currentState);
                    return sourceData.save();
                })
                .then(result => {
                    next();
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })

}





