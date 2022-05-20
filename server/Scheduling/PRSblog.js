const axios= require('axios');

const prsblogScheduler=()=>{
    axios.get("http://localhost:8080/prsIndia/blogs")
        .then(response=>{
            console.log("Inside prs blogs");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= prsblogScheduler;