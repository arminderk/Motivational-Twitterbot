function getTweets() {
    let displayTweets = $('#displayTweets');
    let query = $('#query')[0].value;
    let number = $('#number')[0].value;
    
    fetch(`/tweets/get/${query}/${number}`)
        .then(res => res.json())
        .then(function(tweets) {
            displayTweets.empty(); // Remove all childNodes (tweets) before displaying new tweets
            for(let i = 0; i<tweets.length; i++) {
                displayTweets.append(`
                    <div class="card" id="tweet">
                        <div class="card-header">
                            Quote ${i+1}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>${tweets[i]}<p>   
                            </blockquote>
                        </div>
                    </div>
                `);
            }
        });
}

function postTweets() {
    let alert = $('#alert');
    let displayTweet = $('#displayTweet');

    fetch(`/tweets/post`)
        .then(res => res.json())
        .then(function(tweet) {
            alert.empty();
            displayTweet.empty();
            if(tweet.alert == "Success") {
                alert.append(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Tweet Posted Successfully!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 
                `);
                displayTweet.append(`
                    <div class="card" id="tweet">
                        <div class="card-header">
                            Quote by ${tweet.author}
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <p>"<i>${tweet.quote}</i>"<p>   
                            </blockquote>
                        </div>
                    </div>
                `);
            }
            else {
                alert.append(`
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        Couldn't Post Tweet! Please try again.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div> 
                `);
            }
        })
}