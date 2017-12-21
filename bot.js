console.log("Bot starts");

var Twit = require('twit');

var config = require('./config');

var https = require('https');

var T = new Twit(config);

/********** Get Request to Search Twitter **********/

//var params = {
//  q: 'contest',
//  count: 20
//}
//
//T.get('search/tweets', params, gotData);
//
//function gotData(err, data, response) {
//  var tweets = data.statuses;
//  for(var i = 0; i<tweets.length; i++) {
//    console.log(tweets[i].text);
//  }
//}


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
tweetThis();
setInterval(tweetThis, 1000*15);


/********** Post to Twitter **********/

function tweetThis(text) {

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
  
  /***** Random Quote from External API *****/
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

      function tweeted(err, data, response) {
        if (err) {
          console.log("Something went wrong!");
        }
        else {
          console.log("It's working");
        }
      }
    });
  }).end();  
  
}


    