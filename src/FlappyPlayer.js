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
