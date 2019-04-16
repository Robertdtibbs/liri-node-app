// spotify keys and npm calls
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//all other api calls
var axios = require("axios");
// moment require
var moment = require("moment");
var fs = require("fs");


// User entry variables
var selection = process.argv[2];
var input = process.argv.slice(3);
var type = input.join(' ')
console.log(type);

//// switch here

switch (selection) {

    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        songthis();
        break;
    case "movie-this":
        moviethis();
        break;
    case "do-what-it-says":
        whatitsay();
        break;
    default:
        console.log("Not the right question")
}

///// all function below this line.

function concert() {
    var band = "https://rest.bandsintown.com/artists/" + type + "/events?app_id=codingbootcamp";
    axios.get(band).then(function (response) {
        // console.log(response.data);
        console.log("Venue: " + response.data[0].venue.name);
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
        var concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY hh:00 A")
        console.log("Date: " + concertDate);
    })
}

function songthis() {
    if (!type) {
        type = "The Sign";
    }

    spotify.search({
        type: "track",
        query: type
    }, function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            // console.log(data);
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Track: " + data.tracks.items[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Listen: " + data.tracks.items[0].external_urls.spotify)
        }
    })
};

function moviethis() {
    if (!type) {
        type = "Mr Nobody";
    }

    var movie = "http://www.omdbapi.com/?apikey=trilogy&t=" + type;
    axios.get(movie).then(function (response) {
        console.log("Movie title: " + response.data.Title);
        console.log("Release year: " + response.data.Year);
        console.log("Imdb rating: " + response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes rating: " +response.data.Ratings[1].Value);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Cast: " + response.data.Actors);
    })
}

function whatitsay(){
    fs.readFile("random.txt", "UTF8", function (err, data) {
        if (err) {
            console.log(err)
        }

        var dataArr = data.split(",  ")
        console.log(dataArr)
        console.log(dataArr[0])
    })
}