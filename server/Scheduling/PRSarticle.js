const axios= require('axios');

const prsarticleScheduler=()=>{
    axios.get("http://localhost:8080/prsIndia/articles")
        .then(response=>{
            console.log("Inside prs articles");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= prsarticleScheduler;