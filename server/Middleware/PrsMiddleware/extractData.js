const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('../../Models/Post');
const mongoose = require('mongoose');
const Source = require('../../Models/Source');

module.exports = (req, res, next) => {

    const category = req.params.category;
    let url = "";

    switch (category) {
        case 'blogs':
            url = "https://prsindia.org/theprsblog";
            req.category = 'blogs';
            break;

        case 'articles':
            url = "https://prsindia.org/articles-by-prs-team";
            req.category = 'articles';
            break;

        default:
            url = "";
    }

    axios.get(url)
        .then(response => {
            const html = response.data;


            const $ = cheerio.load(html);
            const articles = [];

            const listItems = $('.view-content div');
            listItems.each((idx, el) => {
                const title = $(el).find('div').find('div').find('div').find('h3').find('a').text();
                let url = $(el).find('div').find('div').find('div').find('h3').find('a').attr('href');

                if (url) {
                    articles.push({
                        title,
                        url: "prsindia.org/" + url
                    })
                }


            })



            Source.findOne({ name: 'prsIndia' })
                .then(sourceData => {
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





