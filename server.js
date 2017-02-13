//dependencies
var fs = require('fs');
var express = require('express');
var cron = require('node-cron');
var TwitterPackage = require('twitter');

//hello world

//defining app
var app = express();

// Define the port to run on, serve local files
app.set('port', 3000);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('kush on port ' + port);
});


//Cron jobs
var task = cron.schedule('* * 3 * * *',function(){
    createTweet(sendTweet);
    console.log('running every 3rd hour')
});

task.start();


//twitterbot constructor
var secret = {
    "consumer_key": "KEYGOESHERE",
    "consumer_secret": "SECRETGOESHERE",
	  "access_token_key": "TOKENKEYGOESHERE",
    "access_token_secret": "TOKENSECRETGOESHERE"
};

//Setting up twitter
var Twitter = new TwitterPackage(secret);

//container for tweetmessage
var message;

//generate tweetmessage
function createTweet(callback){
  var rndNmbr = Math.floor(Math.random() *2000)
  fs.readFile('./db/quotes.json', "utf-8", function readFileCallback(err, data){
      if (err) {
          console.log(err)
      }else{
          obj = JSON.parse(data);
          message = obj.table[rndNmbr].quote.toString();
          callback();     
  }});
};

//sending tweet
function sendTweet(){
  Twitter.post('statuses/update', {status: message }, function(error, tweet, response){
      if(error){
          console.log(error);
      }
      console.log(tweet);
      console.log(response);
  })};

