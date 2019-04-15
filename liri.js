// spotify keys and npm calls
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//all other api calls
var axios = require("axios")

var selection = process.argv[2];
var input = process.argv.slice(3);
var type = input.join(' ')
console.log(type);

switch (selection){
    
    case "concert-this":
        var band = "https://rest.bandsintown.com/artists/" + type + "/events?app_id=codingbootcamp";
        console.log(band)
        axios.get(band).then(function(response){
                // console.log(response.data);
                console.log(response.data[0].venue.name);
                console.log(response.data[0].venue.city + ", " + response.data[0].venue.region);
                console.log(response.data[0].datetime);
            })
        break;
    case "spotify-this-song":
        spotify.search({
            type: "track",
            query: type
        }, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                // console.log(data);
                console.log(data.tracks.items[0].artists[0].name)
                console.log(data.tracks.items[0].name)
                console.log(data.tracks.items[0].album.name)
                console.log(data.tracks.items[0].external_urls.spotify)
            }
        })
        // * Artist(s)

        // * The song's name
   
        // * A preview link of the song from Spotify
   
        // * The album that the song is from
        break;
    case "movie-this":
        var movie = "http://www.omdbapi.com/?apikey=trilogy&t=" + type;
        console.log(movie)
        axios.get(movie).then(function(response){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Ratings[0].Value);
            console.log(response.data.Ratings[1].Value);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
            })
        break;
    case "do-what-it-says":
        console.log("Do what it do!")
        break;
    default:
        console.log("Not the right question")
}