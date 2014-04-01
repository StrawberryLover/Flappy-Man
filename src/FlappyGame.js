var Game = function() {
	var score = 0, mute = false;
	var pipes = [], pipeID, end = false, on = false;

	function constructur() {

		Player.init();
		on = true;
		$("#Game-score").html(score);
		//Start spawning pipes
		requestAnimationFrame(loopPipe);

		//Start Collison detector
		requestAnimationFrame(loopCollision);
	}

	function getON() {
		return on;
	}

	function loopPipe() {
		newPipe();
		
		//Wait 2 sec before spawning another pipe
		setTimeout(function(){requestAnimationFrame(loopPipe);}, 2000);
	}

	function incrementScore(){
		score++;
		$("#scoreS").get(0).load();
		$("#scoreS").get(0).play();
		$("#Game-score").html(score);
	}

	function resetGame(){
		//reset score
		$(".overlay").removeClass("load");
		$(".dasModel").removeClass("load");
		$("#Game-score").html(0);
		score = 0;
		//delete pipes
		$('.pipeContainer').remove();
		pipes = [];
		on = false;
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
	}

	function loopCollision() {
		var nextPipe = pipes[0];

		//Check if ther are any pipes in the game
		if(nextPipe === null)
			return false;

		//Get nextPipe Info
		var upPipe = nextPipe.children(".upPipe");
		var downPipe = nextPipe.children(".downPipe");

		var pipeLeft = upPipe.offset().left;
		var pipeRight = pipeLeft + 80;
		var pipeTop = upPipe.offset().top + upPipe.height();
		var pipeBottom = $(window).height() - downPipe.height();

		//Get Player Info
		var box = document.getElementById('Game-char').getBoundingClientRect();
		var boxHeight = box.height + 20;
		var boxWidth = box.width;
		var boxTop = box.top + 25;
		var boxLeft = box.left;
		var boxRight = box.left + 75;
		var boxBottom = boxTop + boxHeight - 55;


		if(boxBottom >= $("#Ground").offset().top + 15) {
			endGame();
			return;
		}


		if(boxRight > pipeLeft) {
			if(!(boxTop > pipeTop && boxBottom < pipeBottom)) {
				endGame();
				return;
			}
		} 

		if(boxRight > pipeLeft + upPipe.width()){
			pipes.shift();
			incrementScore();
		}

		requestAnimationFrame(loopCollision);
	}

	function endGame() {
		//Pause Ground, Pipes and Player
		$("#Ground").css('-webkit-animation-play-state', 'paused');
		$(".pipe").css('-webkit-animation-play-state', 'paused');
		$("#Game-char").css('-webkit-animation-play-state', 'paused');
		end = true;

		Player.end();
	}

	function setSound() {
		if(mute) {
			$("#Game-mute").attr("src","/css/less/img/VolumeOn.png");
			$("#mainS").get(0).muted = false;
		}
		else {
			$("#Game-mute").attr("src","/css/less/img/VolumeOff.png");
			$("#mainS").get(0).muted = true;
		}
		mute = !mute;
	}

	function isMuted(){
		return mute;
	}

	return {
		init: constructur,
		sound: setSound,
		removePipe: removePipe,
		isMuted: isMuted,
		isON: getON,
		resetGame: resetGame
	};
}();

$(document).ready(function() {
	$("#Game-body").on("click keydown", function(e) {
		if(e.keyCode == 32 || e.type == "click") {
			if(!Game.isON())
				Game.init();

			if(!Game.isMuted()){
				$("#flapS").get(0).load();
				$("#flapS").get(0).play();
			}

			Player.move();
		}
	});
});


$(window).bind('oanimationend animationend webkitAnimationEnd', function() { 
	Game.removePipe();
});
