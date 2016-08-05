$(document).ready(function() {
	$('#words').val(getWordList());
	var wordList = $('#words').val().split(' ');
	var wrongArray = ['<b>List of Words Spelt Incorrectly</b>'];
	var totalQues = 0;
	var correctNum = 0;
	var wrongNum = 0;

	
    
	$('#listen').click(function() {
		var msg = new SpeechSynthesisUtterance($('#currentWord').text());
    	window.speechSynthesis.speak(msg);
	})

	$('#btnBlue').click(function(event) {
		$('#giveUp').css('display', 'block');
		$('#spellInput').css('display', '');
		$('#correct').remove();
		$('#wrong').remove();
		$('#listen').attr('hidden', false);
		var currentText = $(this).text();
		$(this).text('Next');
		var nextWord = wordList[Math.floor(Math.random() * wordList.length)];
		$('#currentWord').text(nextWord);
		$('#userSpelling').val('');		
		$('#btnBlue').attr('disabled', true);
		$('#currentWord').attr('hidden', true);
		
		if ($('#wrongList a:last-child').text() != wrongArray[wrongArray.length - 1] &&
			wrongArray.length != 1)
			$('#wrongList').append('<a class="list-group-item">'+ wrongArray[wrongArray.length - 1] + '</a>');

	});

	$('#goBtn').click(function() {
		$('#correct').remove();
		$('#wrong').remove();	
		var inputSpelling = $('#userSpelling').val();
		if (inputSpelling == $('#currentWord').text()) {
			$('#center').append('<div class="alert alert-success" role="alert" id="correct"> <strong>Well done!</strong> Correct :) </div>');
			$('#btnBlue').attr('disabled', false);
			$('#currentWord').attr('hidden', false);
		}
		else {
			$('#center').append('<div class="alert alert-danger" role="alert" id="wrong"> <strong>Woops!</strong> Try Again.. </div>');
			
			if (wrongArray[wrongArray.length - 1] != $('#currentWord').text())
				wrongArray.push($('#currentWord').text());
		}
	})

	$('#giveUp').click(function() {
		$('#center').append('<div class="alert alert-warning" role="alert" id="wrong"> <strong>Too Bad!</strong> Learn this for next time! </div>');
		$('#currentWord').attr('hidden', false);
		$('#btnBlue').attr('disabled', false);
		if (wrongArray[wrongArray.length - 1] != $('#currentWord').text())
				wrongArray.push($('#currentWord').text());	
	})
});

