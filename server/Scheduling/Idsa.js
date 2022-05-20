const axios= require('axios');

const idsaScheduler=()=>{
    axios.get("http://localhost:8080/idsa/commentsAndBriefs")
        .then(response=>{
            console.log("Inside idsa");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= idsaScheduler;