const https = require("https");
https
  .get(
    "https://content.googleapis.com/youtube/v3/search?part=snippet&q=vueTutorial&key=AIzaSyDhcNHM0I5oATNaPDBlEM92En1ZJuCcVyM",
    resp => {
      let data = "";
      // A chunk of data has been recieved.
      resp.on("data", chunk => {
        data += chunk;
      });
      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        console.log(JSON.parse(data).explanation);
      });
    }
  )
  .on("error", err => {
    console.log("Error: " + err.message);
  });
