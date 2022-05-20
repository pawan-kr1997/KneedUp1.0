const axios= require('axios');

const businessScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/business")
        .then(response=>{
            console.log("Inside business");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= businessScheduler;