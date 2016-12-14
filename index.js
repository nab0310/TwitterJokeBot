console.log('Its alive');

var twit = require('twit');

var keys = require('./permissions.js');

var knockknock = require('knock-knock-jokes')

console.log(knockknock()) // returns a knock knock joke

var T = new twit(keys);

// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// })

T.get('users/show', { screen_name: 'NickBehrens'}, function(err, data, response) {
	console.log(data);
})

var stream = T.stream('statuses/filter', {follow: ['419216928','3510233482','738767076']});

stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){
	console.log("Got a tweet!");

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	if(replyto === null){
		var newTweet = '@' + from+ ' '+knockknock();
		tweetIt(newTweet, eventMsg.id_str);
	}
}

function tweetIt(txt, statusID){
	var tweet = {
		status: txt,
		in_reply_to_status_id: statusID
	}

	T.post('statuses/update',tweet,tweeted);

	function tweeted(err, data, response) {
		if(err){
			console.log("This went wrong! "+err);
		}else{
			console.log("It worked!");
		}
	}
}