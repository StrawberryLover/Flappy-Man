var Player = function() {
	var velocity = 0, position = 0, rotation = 0, 
		gravity = 0.25, fallIterval;

	function constructur() {
		position = ($(window).height() / 100 ) * 35;
		fallIterval = setInterval(fallLoop, 1000.0 / 60.0);
	}

	function flyAway() {
		velocity = -5;
	}

	function fallLoop() {		
		velocity += gravity;
		position += velocity;
		rotation = Math.min((velocity / 10) * 90, 90);
		
		$("#Game-char").css({ rotate: rotation, top: position });
	}

	function endGame() {
		clearInterval(fallIterval);

		if(!Game.isMuted()){
			$("#hitS").get(0).load();
			$("#hitS").get(0).play();
			$("#mainS").get(0).muted = true;
			setTimeout(function(){
				$("#deathS").get(0).load();
				$("#deathS").get(0).play();
			}, 400);
		}

		//Reset Variables
		velocity = 0;
		position = 280;
		rotation = 0;

		$(".overlay").addClass("load");
		$(".dasModel").addClass("load");
	}

	return {
		init: constructur,
		move: flyAway,
		end: endGame
	};
}();

$(document).ready(function() {
	$("#mainS").get(0).muted = false;
    $("#mainS").get(0).play();

    $("#Game-mute").click(function() {
		Game.sound();
	});

	$("#reset").on("click", function(e) {
		Game.resetGame();
	});
});
