const axios= require('axios');

exports.nationalScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/national")
        .then(response=>{
            console.log("Inside national");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.internationalScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/international")
        .then(response=>{
            console.log("Inside international");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.businessScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/business")
        .then(response=>{
            console.log("Inside business");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.sportsScheduler=()=>{
    axios.get("http://localhost:8080/newsOnAir/sports")
        .then(response=>{
            console.log("Inside sports");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.prsblogScheduler=()=>{
    axios.get("http://localhost:8080/prsIndia/blogs")
        .then(response=>{
            console.log("Inside prs blogs");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.prsarticleScheduler=()=>{
    axios.get("http://localhost:8080/prsIndia/articles")
        .then(response=>{
            console.log("Inside prs articles");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.poispeechScheduler=()=>{
    axios.get("http://localhost:8080/presidentOfIndia/speeches")
        .then(response=>{
            console.log("Inside poispeech");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.poipressScheduler=()=>{
    axios.get("http://localhost:8080/presidentOfIndia/pressReleases")
        .then(response=>{
            console.log("Inside poipress");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.pibScheduler=()=>{
    axios.get("http://localhost:8080/pressInformationBureau/pressReleases")
        .then(response=>{
            console.log("Inside pib");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.nitiScheduler=()=>{
    axios.get("http://localhost:8080/nitiAayog/nitiBlogs")
        .then(response=>{
            console.log("Inside nitiblogs");
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.idsaScheduler=()=>{
    axios.get("http://localhost:8080/idsa/commentsAndBriefs")
        .then(response=>{
            console.log("Inside idsa");
        })
        .catch(err=>{
            console.log(err);
        })
}

