var canvas = document.getElementById('clock');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function degToRad(degree) {
	var factor = Math.PI / 180;
	return degree * factor;
}
function renderTime() {

	var now = new Date();
	var today = now.toDateString();
	var time = now.toLocaleTimeString();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds / 1000);


	gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,300);
	gradient.addColorStop(0,"#09303a");
	gradient.addColorStop(1,'black');
	context.fillStyle = gradient;
	context.fillRect(0,0,canvas.width,canvas.height);

	context.strokeStyle = "#28d1f3";
	context.lineWidth = 17;
	context.lineCap = "round";
	context.shadowBlur = 15;
	context.shadowColor = "#28d1f3";

	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 200, degToRad(270), degToRad(hours*15)-90);
	context.stroke();

	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 170, degToRad(270), degToRad(minutes*6)-90);
	context.stroke();

	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 140, degToRad(270), degToRad(newSeconds*6)-90);
	context.stroke();

	context.font = "25px Arial";
	context.fillStyle = "#28d1f3";
	context.fillText(today, canvas.width / 2 - 100, canvas.height / 2);

	context.font = "15px Arial";
	context.fillStyle = "#28d1f3";
	context.fillText(time, canvas.width / 2 - 100, canvas.height / 2 + 30);

}

setInterval(renderTime, 40);