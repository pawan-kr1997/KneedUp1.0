const axios= require('axios');

const nitiScheduler=()=>{
    axios.get("http://localhost:8080/nitiAayog/nitiBlogs")
        .then(response=>{
            console.log("Inside nitiblogs");
        })
        .catch(err=>{
            console.log(err);
        })
}

module.exports= nitiScheduler;