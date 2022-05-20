const axios= require('axios');

const sportsScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/sports")
        .then(response=>{
            console.log("Inside sports");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= sportsScheduler;