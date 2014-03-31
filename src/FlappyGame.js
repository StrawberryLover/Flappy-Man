var Game = function() {
	var pipes = {list: [], count: 0};
	var score = 0;

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

	function incrementScore(){
		score++;
		$("#Game-score").innerHTML = score;
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
