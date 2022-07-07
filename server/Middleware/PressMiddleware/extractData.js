const axios = require('axios');
const cheerio = require('cheerio');
const Post = require('../../Models/Post');
const mongoose = require('mongoose');
const Source = require('../../Models/Source');

//Logic to extract data from original site and passing to the source model

module.exports = (req, res, next) => {

    const category = req.params.category;
    let url = "";

    req.sourceName="pressInformationBureau";
    req.sourceId='62794c2b06a9d74e0872f4f6';

    switch (category) {
        case 'pressReleases':
            url = "https://www.pib.gov.in/indexd.aspx";
            req.category = 'press releases';
            break;

        default:
            url = "";
    }

    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const articles = [];
            
            $('.release_list li',html).each(function(){
                const title= $(this).find('a').text();
                const url= $(this).find('a').attr('href');
    
                articles.push({
                    title,
                    url: "https://pib.gov.in/" + url    
                })
            }) 



            Source.findOne({ name: 'pressInformationBureau' })
                .then(sourceData => {
                    sourceData.currentState = articles;
                    
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





