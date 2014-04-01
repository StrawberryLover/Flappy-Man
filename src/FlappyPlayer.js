var Player = function() {
	var velocity = 0, position = 0, rotation = 0, 
		gravity = 0.25, fallIterval;

	function constructur() {
		position = $("#Game-char").position().top;
		fallIterval = setInterval(fallLoop, 1000.0 / 60.0);
	}

	function flyAway() {
		velocity = -4.6;
	}

	function fallLoop() {
		var playerTop = parseInt($("#Game-char").css("top"));
		
		velocity += gravity;
		position += velocity;
		rotation = Math.min((velocity / 10) * 90, 90);
		
		$("#Game-char").css({ rotate: rotation, top: position });
	}

	function endGame() {
		clearInterval(fallIterval);

		//Reset Variables
		velocity = 0;
		position = 280;
		rotation = 0;
	}

	return {
		init: constructur,
		move: flyAway,
		end: endGame
	};
}();

$(document).ready(function() {
    $("#mainS").get(0).play();

    $("#Game-mute").click(function() {
		Game.sound();
	});
});

$(window).on("click keydown", function(e) {
	if(e.keyCode == 32 || e.type == "click") {
		Player.move();
	}
});
