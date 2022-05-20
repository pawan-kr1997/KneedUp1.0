const axios= require('axios');

const poipressScheduler=()=>{
    axios.get("http://localhost:8080/presidentOfIndia/pressReleases")
        .then(response=>{
            console.log("Inside poipress");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= poipressScheduler;