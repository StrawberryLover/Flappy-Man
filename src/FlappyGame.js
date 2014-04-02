var Game = function() {
	var score = 0, highscore = (localStorage.highscore)?parseInt(localStorage.highscore, 10):0,
	mute = false, pipes = [], pipeID, pipeTimeOut, end = false, on = false;

	function constructur() {

		Player.init();
		on = true;
		$("#Game-score").html(score);
		$("#innerHS").html(highscore);

		//Start spawning pipes
		pipeID = requestAnimationFrame(loopPipe);

		//Start Collison detector
		requestAnimationFrame(loopCollision);
	}

	function getON() {
		return on;
	}

	function loopPipe() {
		newPipe();
		
		//Wait 2 sec before spawning another pipe
		pipeTimeOut = setTimeout(function(){pipeID = requestAnimationFrame(loopPipe);}, 2000);
	}

	function incrementScore(){
		score++;
		if(!isMuted()){
			$("#scoreS").get(0).load();
			$("#scoreS").get(0).play();
		}
		$("#Game-score").html(score);
		if(score > highscore) {
			highscore = score;
			localStorage.setItem("highscore", score);
			$("#innerHS").html(score);
		}
	}

	function resetGame(){
		//Set Death Screen
		$(".overlay").removeClass("loadOver");
		$(".dasModel").removeClass("loadText");

		//Reset Scoure
		$("#Game-score").html(0);
		score = 0;

		//Reset pipes
		$('.pipeContainer').remove();
		pipes = [];
		window.clearTimeout(pipeTimeOut);
		cancelAnimationFrame(pipeID);

		end = false;
		on = false;

		$("#mainS").get(0).load();
		$("#mainS").get(0).play();
		if(!isMuted()){
			$("#mainS").get(0).muted = false;
		}

		//Reset Ground and bg
		$("#Ground").css('-webkit-animation-play-state', 'play');
		$("#Game-body").css('-webkit-animation-play-state', 'play');

		//Reset Player
		$("#Game-char").css('-webkit-animation-play-state', 'play');
		$("#Game-char").css({top: ($(window).height() / 100 ) * 35});
		document.getElementById('Game-char').style['-webkit-transform'] = "translate3d(0, 0, 0) rotate(" + 0 + "deg)";
	}

	function newPipe() {
		if(end) return;

		var downHeight = Math.floor((Math.random()*$(window).height()/2.2)+150),
			upHeight = $(window).height() - downHeight - 105;

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
		var nextPipe = pipes[0], rotation = Player.getRotation();

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
		var boxTop = box.top + 35 + (Math.sin(Math.abs(rotation) / 90) * 8);
		var boxLeft = box.left;
		var boxRight = box.left + 75;
		var boxBottom = boxTop + boxHeight - 85 - (Math.sin(Math.abs(rotation) / 90) * 8);


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
		$("#Game-body").css('-webkit-animation-play-state', 'paused');
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

	$(window).on("click keydown touchstart", function(e) {
		var ID = e.target.id;
		var parID = $(e.target).parent().attr('id');

		if(ID === "reset"  || parID === "reset"  || ID === "Game-mute")
			return;

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
