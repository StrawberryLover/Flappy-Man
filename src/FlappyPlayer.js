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
