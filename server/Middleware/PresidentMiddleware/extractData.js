const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('../../Models/Post');
const mongoose = require('mongoose');
const Source = require('../../Models/Source');

module.exports = (req, res, next) => {

    const category = req.params.category;
    let url = "";

    
    req.sourceName="presidentOfIndia" ;
    req.sourceId='627baa0b66a5f4c3ea42a18c';

    switch (category) {
        case 'speeches':
            url = "https://presidentofindia.nic.in/speeches.htm";
            req.category = 'speeches';
            break;

        case 'pressReleases':
            url = "https://presidentofindia.nic.in/press-release.htm";
            req.category = 'pressReleases';
            break;

        default:
            url = "";
    }

    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];

            const listItems = $("li");
        

            listItems.each((idx, el) => {
                const date = $(el).children("span").text();
                const content = $(el).children("p").text();
                const url = $(el).children("p").children("a").attr("href");

                if (date && content && url) {
                    articles.push({
                        date: date.trim(),
                        title: content.trim(),
                        url: "https://presidentofindia.nic.in/" + url.trim()
                    })
                }


            })



            Source.findOne({ name: 'presidentOfIndia' })
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





