
var Game = function() {
	var pipes = {list: [], count: 0};

	function constructur() {
		Player.init();

		//Start spawning pipes
		requestAnimationFrame(loopPipe);
	}

	function loopPipe() {
		newPipe();


		//Wait 3sec before spawning another pipe
		setTimeout(function(){requestAnimationFrame(loopPipe);}, 3000);
	}

	function newPipe() {
		var downHeight = Math.floor((Math.random()*$(window).height()/2.2)+150),
			upHeight = $(window).height() - downHeight - 150;

		var pipeHtml = "<div class='pipeContainer'>";
			pipeHtml +=	"<div class='pipe upPipe' style='height:"+ upHeight +"px'>";
				pipeHtml +=	"<img src='css/less/img/upPipe.gif' /></div>";
			pipeHtml += "<div class='pipe downPipe' style='height:"+ downHeight +"px'>";
				pipeHtml +=	"<img src='css/less/img/downPipe.gif' /></div></div>";

		$("#Game-body").append(pipeHtml);
	}

	return {
		init: constructur
	};
}();

$(window).on("click keydown", function(e) {
	if(e.keyCode == 32 || e.type == "click") {
		Player.move();
	}
});

$(window).bind('oanimationend animationend webkitAnimationEnd', function() { 
	$('.pipeContainer:first').remove();
});
var Player = function() {
	var state = {toPos: 0};

	function constructur() {
		state.toPos = $("#Game-char").position().top;
		//requestAnimationFrame(fall);
	}

	function flyAway() {
		var top = $("#Game-char").position().top;
		var upTo = top - 80;

		//Rais the birdMan 60px
		state.toPos = (upTo > 0)?upTo:0;
	}

	function fall() {
		var top = $("#Game-char").position().top;

		if(state.toPos >= top && !groundHit(top)) {		//Fall Down
			$("#Game-char").css("top", (top + 2));
			state.toPos = top + 2;
		} else {										//Rise Up
			$("#Game-char").css("top", (top - 4));
		}

		requestAnimationFrame(fall);
	}

	function groundHit(charHeiht) {

		//Floor Hit
		if($(window).height() < charHeiht + 90) {
			return true;
		}

		return false;
	}

	return {
		init: constructur,
		move: flyAway
	};
}();

$(document).ready(function() {
    Game.init();
});
