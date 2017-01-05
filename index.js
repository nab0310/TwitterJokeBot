console.log('Its alive');

var tweets ={};
var numberOfTweets = 0;

var twit = require('twit');

var keys = require('./permissions.js');

var knockknock = require('knock-knock-jokes');

var MonkeyLearn = require('monkeylearn');

var fs = require('fs');

const scribble = require('scribbletune');

var ml = new MonkeyLearn('0209052bc1311824816e8f4773e40ba740b2cc0d');

//console.log(knockknock()) // returns a knock knock joke

var T = new twit(keys);
/*Parsing the Tweet File when we have data and want to get musical :)
parseTweetFile();

function parseTweetFile(){
	console.log("Starting to parse file");
	fs.readFile('tweetDataForUSA.json', 'utf8', function (err, data) {
  		if (err) throw err;
  		obj = JSON.parse(data);
		parseTweetDataJSON(obj);
	});
}

function parseTweetDataJSON(data){
	var i =0;
	var notesData = [];
	console.log("Starting to parse through data");
	while(data[i]!=undefined){
		var sharp = true;
		console.log("Data at "+i+" is: "+data[i].text);
		var text = data[i].text+"";
		var noteNum = i%11;
		for(var j=0;j<text.length;j++){
			var char = text.charAt(j);
			if(char == 'a'){
				if(sharp){
					notesData.push('a'+noteNum);
				}else{
					notesData.push('a#'+noteNum);
				}
			}
			if(char == 'A'){
				if(sharp){
					notesData.push('Amaj');
				}else{
					notesData.push('A#maj');
				}
			}
			if(char == 'b'){
				if(sharp){
					notesData.push('a'+noteNum);
				}else{
					notesData.push('a#'+noteNum);
				}
			}
			if(char == 'B'){
				if(sharp){
					notesData.push('Bmaj');
				}else{
					notesData.push('B#maj');
				}
			}
			if(char == 'c'){
				if(sharp){
					notesData.push('c'+noteNum);
				}else{
					notesData.push('c#'+noteNum);
				}
			}
			if(char == 'C'){
				if(sharp){
					notesData.push('Cmaj');
				}else{
					notesData.push('C#maj');
				}
			}
			if(char == 'd'){
				if(sharp){
					notesData.push('d'+noteNum);
				}else{
					notesData.push('d#'+noteNum);
				}
			}
			if(char == 'D'){
				if(sharp){
					notesData.push('Dmaj');
				}else{
					notesData.push('D#maj');
				}
			}
			if(char == 'e'){
				if(sharp){
					notesData.push('e'+noteNum);
				}else{
					notesData.push('e#'+noteNum);
				}
			}
			if(char == 'E'){
				if(sharp){
					notesData.push('Emaj');
				}else{
					notesData.push('E#maj');
				}
			}
			if(char == 'f'){
				if(sharp){
					notesData.push('f'+noteNum);
				}else{
					notesData.push('f#'+noteNum);
				}
			}
			if(char == 'F'){
				if(sharp){
					notesData.push('Fmaj');
				}else{
					notesData.push('F#maj');
				}
			}
			if(char == 'g'){
				if(sharp){
					notesData.push('g'+noteNum);
				}else{
					notesData.push('g#'+noteNum);
				}
			}
			if(char == 'G'){
				if(sharp){
					notesData.push('Gmaj');
				}else{
					notesData.push('G#maj');
				}
			}
			if(sharp){
				sharp = false;
			}else{
				sharp = true;
			}
		}

		var from = data[i].from;
		i++;
	}
	console.log(notesData);
	var clipNum = 0;
	var spliceStart =0;
	var spliceEnd = 15;
	var numberOfNotes = 0;
	var data = JSON.stringify(notesData,null,2);
	fs.writeFile("NotesData.json",data);
	while(numberOfNotes < notesData.length) {
		var notesForBar = notesData.slice(spliceStart,spliceEnd);
		fs.appendFile("NotesForBar",JSON.stringify(notesForBar,null,2));
		let clip = scribble.clip({
			notes: notesForBar,
			pattern: 'x_x_x_--',
			sizzle:true
		});
		scribble.midi(clip,"clip"+clipNum+".mid");
		clipNum++;
		if(spliceEnd+15>notesData.length){
			spliceEnd = notesData.length;
		}else{
			spliceEnd = spliceEnd + 15;
		}
		spliceStart = spliceStart + 15;
		numberOfNotes = numberOfNotes + 15;
	}
	// combineMidiFiles(clipNum-1);
}

function combineMidiFiles(clipNum){
	var i=0;
	var finalMidi = "";
	while(i<clipNum){
		fs.readFile('clip'+i+'.mid','utf8', function (err, data) {
			fs.appendFile("finalMidi.mid",data);
		});
		fs.unlink('clip'+i+'.mid');
		i++;
	}
	fs.writeFile("finalMidi.mid",finalMidi);
}
*/


/*Typical Post Status with Twit
T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})
*/

/*Show Data From a User
T.get('users/show', { screen_name: 'NickBehrens'}, function(err, data, response) {
	console.log(data);
})
T.get('users/show', { screen_name: 'jackcoleman5'}, function(err, data, response) {
	console.log(data);
})
*/

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
/*Get Data For all tweets in the USA
var USA = [ '-124.25', '26.26', '-58.68', '48.33' ];

var streamUS = T.stream('statuses/filter', { locations: USA });

streamUS.on('tweet',tweetEventUS);

function tweetEventUS(eventMsg){
	var text = [eventMsg.text];
	var from = eventMsg.user.screen_name;
	var object = {from:eventMsg.user.screen_name,text:eventMsg.text};
	tweets[numberOfTweets] = object;
	console.log("Got a tweet from "+from+"!");
	var jsonData = JSON.stringify(tweets,null,2);
	fs.writeFile("tweetDataForUSA.json", jsonData);
}
*/

/*Analize Text Setiment with MonkeyLearnvar
module_id = 'cl_qkjxv9Ly';
var p = ml.classifiers.classify(module_id, text, true);

p.then(function (res) {
	if(res.result[0][0].label=="positive"){
		numberOfPositive++;
	}
	if(res.result[0][0].label=="neutral"){
		numberOfMeh++;
	}
	if(res.result[0][0].label=="negative"){
		numberOfNegative++;
	}
});
*/

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
