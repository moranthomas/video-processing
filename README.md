# video-processing

## Prerequisites 
Install ffmpeg on your system (e.g. using homebrew on mac), the npm package alone is not sufficient

## Download the video file segments to local directory and store in mp4
The format of the url per segment will change depending on the source

## Read the video filenames from the current directory and store in an array. 
Use lodash remove to filter out only the mp4 files

## Finally call the merge function leveraging ffmpeg mergeToFile method
