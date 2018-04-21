require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var Spotify = require("node-spotify-api");
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2];
var parameter = process.argv[3];

start(input, parameter);

function start(input,parameter){
	switch(input){
	 case "my-tweets":
	 	my_tweets();
	 	break;
	 case "spotify-this-song":
	 	if(parameter == null){
	 		parameter = "The Sing";
	 	}
	 	spotify_this_s(parameter);
	 	break;
	 case "movie-this":
	 	if(parameter == null){
	 		parameter = "Mr. Nobody";
	 	}
	    movie_this(parameter);
	    break;
	 case "do-what-it-says":
	    do_what_it_says();
	    break;
	 default :
	 	console.log("please insert expected command");
	}
}

function my_tweets(){
	var params = {q: 'degay606',count:20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log("Tweet " + tweets[i].text + " Created at " + tweets[i].created_at );
	  	}
	    
	  }
	});
}

function spotify_this_s(arg){
	spotify.search({ type: 'track', query: arg }, function(err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
	 	for(var i = 0; i < data.tracks.items.length; i++){
	 		data.tracks.items[i];
	 		console.log("Artist: " + data.tracks.items[i].artists[0].name);
	 		console.log("Song: " + data.tracks.items[i].name);
	 		console.log("Album: " + data.tracks.items[i].album.name);
	 		console.log("Preview Link: " + data.tracks.items[i].preview_url);
	 	}
	});

}

function movie_this(param){
	request("http://www.omdbapi.com/?t=" + param + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var obj = JSON.parse(body);			
			console.log("Title: " + obj.Title);
			console.log("Year: " + obj.Year);
			console.log("Imdb Rating: " + obj.imdbRating);
			console.log("Country: " + obj.Country);
			console.log("Language: " + obj.Language);
			console.log("Plot: " + obj.Plot);
			console.log("Actors: " + obj.Actors);
			console.log("Rotten Tomatoes Rating: " + obj.tomatoRating);
			console.log("Rotten Tomatoes URL: " + obj.tomatoURL);			
		} else {
			console.log("Error :"+ error);
			return;
		}
	});
}

function do_what_it_says(){
	fs.readFile("random.txt", "utf8", function(error, data){
			if (error) {
				console.log("Error " + error);
				return;
			} 
			var split = data.split(",");
			start(split[0], split[1]);
	});
}	