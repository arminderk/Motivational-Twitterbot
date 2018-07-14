/* Config */
var Twit = require('twit');
var config = require('./config');
var https = require('https');
var url = require('url');
var T = new Twit(config);

/* Express */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

/* Use static files */
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  res.render('index');
})

app.get('/get.html', function(req, res) {
  res.sendFile(__dirname + '/get.html');
})

/********** Get Request to Search Twitter **********/
app.get('/tweets/get/:query/:number', function(req, res) {
  var tweets = [];
  let query = req.params.query;
  let numOfTweets = req.params.number;

  var params = {
    q: query,
    count: numOfTweets
  }
  
  T.get('search/tweets', params, gotData);
  
  function gotData(err, data, response) {
    var tweet = data.statuses;
    for(var i = 0; i<tweet.length; i++) {
      tweets.push(tweet[i].text);
      // console.log(tweet[i].text);
    }
    res.json(tweets);
  }
})

/***** Random Quote from External API *****/
app.get(`/tweets/post`, function(req, res) {
    https.get("https://talaikis.com/api/quotes/random/", (response) => {
      let data = "";
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        var parsed = JSON.parse(data);
        var quote = '@QuoteoftheDay: "' + parsed.quote + '" - ' + parsed.author;
        
        var tweet = {
          //status: r 
          status: quote
        }
  
        T.post('statuses/update', tweet, tweeted);
        res.json({quote: parsed.quote, author: parsed.author});
  
        function tweeted(err, data, response) {
          if (err) {
            console.log("Something went wrong!");
          }
          else {
            console.log("It's working!");
          }
        }
      });
    }).end();
  })

app.listen(3000, () => console.log("Listening on Port 3000"));
  
  
  //var stream = T.stream('user');
  //stream.on('follow', followed);
  //
  //function followed(eventMsg) {
  //  console.log("Follow Event!");
  //  var name = eventMsg.source.name;
  //  var screenName = eventMsg.source.screen_name;
  //  tweetThis('.@' + screenName + ' how are you doing?');
  //}
  
  
  /********** Send Tweets in An Interval **********/
  // tweetThis();
  // setInterval(tweetThis, 1000*15);
  
  
  /********** Post to Twitter **********/
  
  // function tweetThis(text) {
  
  /***** Array of Quotes: Old Implementation *****/
  //  var quotes = ['"If you want to achieve greatness stop asking for permission. ~Anonymous" ',
  //'"Things work out best for those who make the best of how things work out. ~John Wooden" ',
  //'"To live a creative life, we must lose our fear of being wrong. ~Anonymous',
  //'"If you are not willing to risk the usual you will have to settle for the ordinary. ~Jim Rohn" ',
  //'"Trust because you are willing to accept the risk, not because it’s safe or certain. ~Anonymous" ',
  //'"Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. ~Swami Vivekananda" ',
  //'"All our dreams can come true if we have the courage to pursue them. ~Walt Disney" ',
  //'"Good things come to people who wait, but better things come to those who go out and get them. ~Anonymous" ',
  //'"If you do what you always did, you will get what you always got. ~Anonymous" ',
  //'"Success is walking from failure to failure with no loss of enthusiasm. ~Winston Churchill" ',
  //'"Just when the caterpillar thought the world was ending, he turned into a butterfly. ~Proverb" ',
  //'"Successful entrepreneurs are givers and not takers of positive energy. ~Anonymous" ',
  //'"Whenever you see a successful person you only see the public glories, never the private sacrifices to reach them. ~Vaibhav Shah" ',
  //'"Opportunities don’t happen, you create them. ~Chris Grosser" ',
  //'"Try not to become a person of success, but rather try to become a person of value. ~Albert Einstein" ',
  //'"Great minds discuss ideas; average minds discuss events; small minds discuss people. ~Eleanor Roosevelt" ',
  //'"I have not failed. I’ve just found 10,000 ways that won’t work. ~Thomas A. Edison" ',
  //'"If you don’t value your time, neither will others. Stop giving away your time and talents- start charging for it. ~Kim Garst" ',
  //'"A successful man is one who can lay a firm foundation with the bricks others have thrown at him. ~David Brinkley" ',
  //'"No one can make you feel inferior without your consent. ~Eleanor Roosevelt" '];
  
    
  /***** Selected random quote from array above *****/
  //  var r = "@QuoteoftheDay: " + quotes[Math.floor(Math.random() * quotes.length)];