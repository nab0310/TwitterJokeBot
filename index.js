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
T.get('users/show', { screen_name: 'jackcoleman5'}, function(err, data, response) {
	console.log(data);
})

/* Reply to people every time they tweet */
var stream = T.stream('statuses/filter', {follow: ['419216928','3510233482','738767076']});

stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;

	console.log("Got a tweet from "+from+"!");

	if(from !== 'shittyKnockJoke'){
		var newTweet = '@' + from+ ' '+knockknock();
		tweetIt(newTweet, eventMsg.id_str);
	}
}
/*Tweet by getting images from a site */
//TODO

/*Tweet using AI to combine things or do some processing before tweeting*/
//TODO

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
