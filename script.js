
////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('clock');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

////////////////////////////////////////////////////////////////////////////

var bits = [];

////////////////////////////////////////////////////////////////////////////

setInterval(web, 40);

generateBits();

////////////////////////////////////////////////////////////////////////////

function generateBits() {
	var ctr = 0;
	for (var i = 0; i < canvas.height + 20; i+=20) {
		for (var j = 0; j < canvas.width + 20; j+=20, ctr++) {
			bits.push(new Bit(j,i,ctr%2));
		}
	}
	ctr = 0;
}

////////////////////////////////////////////////////////////////////////////

function web() {
	clearCanvas();
	renderBits();
	renderTime();
}

////////////////////////////////////////////////////////////////////////////

function renderTime() {

	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var milliseconds = now.getMilliseconds();
	var newSeconds = seconds + (milliseconds / 1000);

	context.strokeStyle = "#36CDFF";
	context.lineWidth = 17;
	context.lineCap = "round";
	
	context.shadowBlur = 15;
	context.shadowColor = "#36CDFF";
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 200, degToRad(270), degToRad(hours*15)-90);
	context.stroke();
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 170, degToRad(270), degToRad(minutes*6)-90);
	context.stroke();
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 140, degToRad(270), degToRad(newSeconds*6)-90);
	context.stroke();

	var today = now.toDateString();
	var time = now.toLocaleTimeString();

	context.font = "25px Arial";
	context.fillStyle = "#36CDFF";
	context.fillText(today, canvas.width / 2 - 100, canvas.height / 2);
	context.font = "15px Arial";
	context.fillStyle = "#36CDFF";
	context.fillText(time, canvas.width / 2 - 100, canvas.height / 2 + 30);
}

function renderBits() {
	for (var i = 0; i < bits.length; i++) {
		bits[i].update().draw();
	}
}

////////////////////////////////////////////////////////////////////////////

function degToRad(degree) {
	var factor = Math.PI / 180;
	return degree * factor;
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,300);
	gradient.addColorStop(0,"#116");
	gradient.addColorStop(0.5,"#116");
	gradient.addColorStop(1,'#000');
	context.fillStyle = gradient;
	context.fillRect(0,0,canvas.width,canvas.height);
}

////////////////////////////////////////////////////////////////////////////

function Bit(x,y,test) {
	this.value = randomBetween(0,2);
	this.x = x;
	this.y = y;
	this.test = test;

	this.control = function() {
		if (this.y < 0)
			this.y = canvas.height + 10;
		if (this.y > canvas.height + 10)
			this.y = 0;
	}

	this.update = function() {
		this.control();

		if (randomBetween(0,10) == 0) {
			this.value = randomBetween(0,2);
		}

		if (this.test == 0)
			this.y--;
		else if (this.test == 1)
			this.y++;

		return this;
	}

	this.draw = function() {
		context.shadowBlur = 0;
		context.font = "10px Arial";
		context.fillStyle = "#00f";
		context.fillText(this.value, this.x, this.y);
	}
}