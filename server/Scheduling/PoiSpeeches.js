const axios= require('axios');

const poispeechScheduler=()=>{
    axios.get("http://localhost:8080/presidentOfIndia/speeches")
        .then(response=>{
            console.log("Inside poispeech");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= poispeechScheduler;