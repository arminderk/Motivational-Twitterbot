function getTweets() {
    let query = $('#query')[0].value;
    let number = $('#number')[0].value;
    
    fetch(`/tweets/get/${query}/${number}`)
        .then(res => res.json())
        .then(tweets => console.log(tweets));
}