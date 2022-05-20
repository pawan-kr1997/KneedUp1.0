const axios= require('axios');

const internationalScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/international")
        .then(response=>{
            console.log("Inside international");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= internationalScheduler;