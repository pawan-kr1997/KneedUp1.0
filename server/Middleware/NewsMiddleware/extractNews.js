const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('../../Models/Post');
const mongoose = require('mongoose');
const Source = require('../../Models/Source');

module.exports = (req, res, next) => {

    const category = req.params.category;
    let url = "";

    switch (category) {
        case 'national':
            url = "https://newsonair.gov.in/National-News.aspx";
            req.category="national";
            break;
        case 'international':
            url = "https://newsonair.gov.in/International-News.aspx";
            req.category='international';
            break;
        case 'business':
            url = "https://newsonair.gov.in/Business-News.aspx";
            req.category='business';
            break;
        case 'sports':
            url = "https://newsonair.gov.in/Sports-News.aspx";
            req.category='sports';
            break;
        default:
            url="";
    }

    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            $('h6', html).each(function () {
                const title = $(this).children('a').text();
                const url = $(this).children('a').attr('href');

                if (title !== '') {
                    articles.push({
                        title,
                        url: "newsonair.gov.in/" + url,

                    })
                }


            })

                    
    
            Source.findOne({ name: 'newsOnAir' })
                .then(sourceData => {
                    console.log("---------"+sourceData.data["national"]);
                    
                    sourceData.data[req.category].currentState = articles;
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
