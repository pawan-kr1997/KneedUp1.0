const axios= require('axios');

const nationalScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/national")
        .then(response=>{
            console.log("Inside national");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= nationalScheduler;