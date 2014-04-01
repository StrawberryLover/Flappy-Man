var Game = function() {
	var score = 0, mute = false;
	var pipes = [], pipeID, end = false;

	function constructur() {
		Player.init();

		
		//Start spawning pipes
		requestAnimationFrame(loopPipe);

		//Start Collison dedector
		requestAnimationFrame(loopCollision);
	}

	function loopPipe() {
		newPipe();
		
		//Wait 3sec before spawning another pipe
		setTimeout(function(){requestAnimationFrame(loopPipe);}, 2000);
	}

	function incrementScore(){
		score++;
		$("#Game-score").innerHTML = score;
	}

	function newPipe() {
		if(end) return;

		var downHeight = Math.floor((Math.random()*$(window).height()/2.2)+150),
			upHeight = $(window).height() - downHeight - 150;

		var pipeHtml = "<div class='pipeContainer'>";
			pipeHtml +=	"<div class='pipe upPipe' style='height:"+ upHeight +"px'>";
				pipeHtml +=	"<img src='css/less/img/upPipe.gif' /></div>";
			pipeHtml += "<div class='pipe downPipe' style='height:"+ downHeight +"px'>";
				pipeHtml +=	"<img src='css/less/img/downPipe.gif' /></div></div>";

		var pipe = $(pipeHtml);
		$("#Game-body").append(pipe);
		pipes.push(pipe);
	}

	function removePipe() {
		$('.pipeContainer:first').remove();
		pipes.shift();
	}

	function loopCollision() {
		var nextPipe = pipes[0];

		//Check if ther are any pipes in the game
		if(nextPipe === null)
			return false;

		//Get nextPipe Info
		var upPipe = nextPipe.children(".upPipe");

		var pipeLeft = upPipe.offset().left;
		var pipeRight = pipeLeft + 80;
		var pipeTop = upPipe.offset().top + upPipe.height();
		var pipeBottom = pipeTop + 250;

		//Get Player Info
		var box = document.getElementById('Game-char').getBoundingClientRect();
		var boxRight = box.left + 90;
		var boxBottom = box.top + box.height;
		var boxTop = box.top;

		if(boxRight > pipeLeft) {
			if(!(boxTop > pipeTop && boxBottom < pipeBottom)) {
				endGame();
				return;
			}
		} 

		requestAnimationFrame(loopCollision);
	}

	function endGame() {
		//Pause Ground, Pipes and Player
		$("#Ground").css('-webkit-animation-play-state', 'paused');
		$(".pipe").css('-webkit-animation-play-state', 'paused');
		$("#Game-char").css('-webkit-animation-play-state', 'paused');
		end = true;
	}

	function setSound() {
		if(mute) {
			mute = !mute;
			$("#Game-mute").attr("src","/css/less/img/VolumeOff.png");
		}
		else {
			$("#Game-mute").attr("src","/css/less/img/VolumeOn.png");
			mute = !mute;
		}
	}

	return {
		init: constructur,
		sound: setSound,
		removePipe: removePipe
	};
}();

$(window).on("click keydown", function(e) {
	if(e.keyCode == 32 || e.type == "click") {
		Player.move();
	}
});

$(window).bind('oanimationend animationend webkitAnimationEnd', function() { 
	Game.removePipe();
});