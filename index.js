console.log('Its alive');

var twit = require('twit');

var keys = require('./permissions.js');

var knockknock = require('knock-knock-jokes');

var MonkeyLearn = require('monkeylearn');

var ml = new MonkeyLearn('0209052bc1311824816e8f4773e40ba740b2cc0d');

console.log(knockknock()) // returns a knock knock joke

var T = new twit(keys);

// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
//   console.log(data)
// })

// T.get('users/show', { screen_name: 'NickBehrens'}, function(err, data, response) {
// 	console.log(data);
// })
// T.get('users/show', { screen_name: 'jackcoleman5'}, function(err, data, response) {
// 	console.log(data);
// })
//
/* Reply to people every time they tweet */
var stream = T.stream('statuses/filter', {follow: ['419216928','3510233482','738767076']});

stream.on('tweet',tweetEvent);

function tweetEvent(eventMsg){
	var from = eventMsg.user.screen_name;

	console.log("Got a tweet from "+from+"!");

	if(from !== 'shittyKnockJoke'){
		var newTweet = '@' + from+ ' '+knockknock();
		tweetIt(newTweet, eventMsg.id_str);
	}
}
/*Tweet by getting images from a site */
//TODO

/*Analize tweets sent to us and reply based on their setiment*/
//TODO
var streamUser = T.stream('user');

streamUser.on('tweet',mentionMe);

function mentionMe(eventMsg){

	var replyto = eventMsg.in_reply_to_screen_name;
	var text = [eventMsg.text];
	var from = eventMsg.user.screen_name;

	console.log("Got a tweet from "+from+"!");

	if(replyto === 'shittyKnockJoke'){
		console.log("They are talking to me!");
		var module_id = 'cl_qkjxv9Ly';
		var p = ml.classifiers.classify(module_id, text, true);

		p.then(function (res) {
		    console.log(res.result);
			if(res.result[0][0].label=="positive"){
				console.log("It was Postive!");
				var newTweet = '@' + from+ ' Why thank you good sir! I like you a lot too!';
				tweetIt(newTweet, eventMsg.id_str);
			}
			if(res.result[0][0].label=="neutral"){
				var newTweet = '@' + from+ ' Meh.';
				tweetIt(newTweet, eventMsg.id_str);
			}
			if(res.result[0][0].label=="negative"){
				var newTweet = '@' + from+ " Wow, I didn't like you either!";
				tweetIt(newTweet, eventMsg.id_str);
				console.log("It was negaive.");
			}
		});
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
