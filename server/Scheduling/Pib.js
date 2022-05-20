const axios= require('axios');

const pibScheduler=()=>{
    axios.get("http://localhost:8080/pressInformationBureau/pressReleases")
        .then(response=>{
            console.log("Inside pib");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= pibScheduler;