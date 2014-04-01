
var Game = function() {
<<<<<<< Updated upstream
	var pipes = {list: [], count: 0};
	var score = 0;
	var mute = false;

=======
	var pipes = [], pipeID, end = false;
>>>>>>> Stashed changes
	function constructur() {
		Player.init();

		
		//Start spawning pipes
		requestAnimationFrame(loopPipe);

		//Start Collison dedector
		requestAnimationFrame(loopCollision);
	}

	function loopPipe() {
		newPipe();
<<<<<<< Updated upstream

=======
		
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
		sound: setSound
	};
}();

$(window).on("click keydown", function(e) {
	if(e.keyCode == 32 || e.type == "click") {
		Player.move();
	}
});


=======
		removePipe: removePipe
	};
}();

>>>>>>> Stashed changes
$(window).bind('oanimationend animationend webkitAnimationEnd', function() { 
	Game.removePipe();
});

var Player = function() {
	var state = {toPos: 0};
	
	

	function constructur() {
		state.toPos = $("#Game-char").position().top;
		requestAnimationFrame(fall);
	}

	function flyAway() {
		var top = $("#Game-char").position().top;
		var upTo = top - 80;

		//Rais the birdMan 60px
		state.toPos = (upTo > 0)?upTo:0;
	}

	function fall() {
		var playerTop = parseInt($("#Game-char").css("top"));

		if(state.toPos >= playerTop && !groundHit(playerTop)) {		//Fall Down
			var topString = (Math.floor(playerTop + 2)).toString() + 'px';
			$("#Game-char").css({top : topString});
			state.toPos = playerTop + 2;
		} else {										//Rise Up
			$("#Game-char").css("top", (playerTop - 4));
		}

		requestAnimationFrame(fall);
	}

	function groundHit(charHeiht) {
		return ($(window).height() < (charHeiht + 90));
	}

	return {
		init: constructur,
		move: flyAway
	};
}();

$(document).ready(function() {
    Game.init();

    $("#Game-mute").click(function() {
		Game.sound();
	});
});

$(window).on("click keydown", function(e) {
	if(e.keyCode == 32 || e.type == "click") {
		Player.move();
	}
});
