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
		rotation = Math.min((velocity / 15) * 90, 90);
		document.getElementById('Game-char').style['-webkit-transform'] = "translate3d(0, 0, 0) rotate(" + rotation + "deg)";
		$("#Game-char").css({top: position});
	}

	function getRotation() {
		return rotation;
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
		position = ($(window).height() / 100 ) * 35;
		rotation = 0;

		//$("#Game-char").css({top: position});
		$(".overlay").addClass("loadOver");
		$(".dasModel").addClass("loadText");
	}

	return {
		init: constructur,
		move: flyAway,
		getRotation: getRotation,
		end: endGame
	};
}();

$(document).ready(function() {
	$("#mainS").get(0).muted = false;
    $("#mainS").get(0).play();

    $("#Mute").click(function() {
		Game.sound();
	});

	$("#reset").on("click", function(e) {
		Game.resetGame();
	});
});
