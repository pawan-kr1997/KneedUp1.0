const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');


const app = express();
const url = "https://prsindia.org/articles-by-prs-team";


axios.get(url)
    .then(response => {
        const html = response.data;


        const $ = cheerio.load(html);
        const articles = [];

        const listItems= $('.view-content div');
        listItems.each((idx, el)=>{
            const title= $(el).find('div').find('div').find('div').find('h3').find('a').text();
            let url= $(el).find('div').find('div').find('div').find('h3').find('a').attr('href');
            
        if(url){
            articles.push({
                title,
                url: "prsindia.org/"+url
            })
        }
            
            
        })

        console.log(articles);
        


    })
    .catch(err => {
        console.log(err);
    })



app.listen(9080, () => console.log('Server running'));
