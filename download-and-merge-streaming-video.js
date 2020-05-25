
// Download first
//downloadAndStore ()

// Then merge later
mergeVideos()

// Download the video file segments to local directory and store in mp4
function downloadAndStore () {
    const https = require('https');
    const fs = require('fs');

    // The format of the url per segment will change depending on the source
    var base_url = "https://dacasts3-vh.akamaihd.net/i/secure/152164/152164_,884983.raw,.csmil/segment";

    for ( i=94; i<95; i++ ) {
      const file = fs.createWriteStream("file"+i+".mp4");
      const request = https.get(base_url+""+i+"_0_av.ts?", function(response) {
        response.pipe(file);
      });
    }
}

function readAndFilterFileNames() {
   // Read the video filenames from the current directory and store in an array
   var _ = require('lodash');
   const fs = require('fs');
   var dirPath = ".";
   var fileNames = fs.readdirSync(dirPath);

   // Use lodash remove to filter out only the mp4 files
   var evens = _.remove(fileNames, function(n) {
     return !(n.includes(".mp4"));
   });
   console.log(fileNames);
   return fileNames;
}


// Note - install ffmpeg on mac using homebrew to get to work, the npm package alone was not sufficient
function mergeVideos() {
    var fluent_ffmpeg = require("fluent-ffmpeg");

    var mergedVideo = fluent_ffmpeg();
    //var videoNames = ['./file421.mp4', './file422.mp4'];
    var videoNames = readAndFilterFileNames();

    videoNames.forEach(function(videoName){
        mergedVideo = mergedVideo.addInput(videoName);
    });

    // This method is not efficient for larger numbers of (even small) videos
    mergedVideo.mergeToFile('./mergedVideo.mp4', './tmp/')
    .on('error', function(err) {
        console.log('Error ' + err.message);
    })
    .on('end', function() {
        console.log('Finished!');
    });

}
