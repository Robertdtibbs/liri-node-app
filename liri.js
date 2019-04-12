require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify)

var selection = process.argv[2];

switch (selection){
    
    case "concert-this":
        console.log("the concert tag worked")
        break;
    case "spotify-this-song":
        console.log("Spotify worked")
        break;
    case "movie-this":
        console.log("Movie worked")
        break;
    case "do-what-it-says":
        console.log("Do what it do!")
        break;
    default:
        console.log("Not the right question")
}