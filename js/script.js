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