var canvas = document.getElementById('clock');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var now = new Date();
var today = now.toDateString();
var time = now.toLocaleTimeString();
var hours = now.getHours();
var minutes = now.getMinutes();
var seconds = now.getSeconds();
var milliseconds = now.getMilliseconds();
var newSeconds = seconds + (milliseconds / 1000);

var bits = [];

generateBits();

function generateBits() {
	var bitCount = 100;
	for (var i = 0; i < bitCount; i++) {
		bits.push(new Bit());
	}
}

function degToRad(degree) {
	var factor = Math.PI / 180;
	return degree * factor;
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	gradient = context.createRadialGradient(canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,300);
	gradient.addColorStop(0,"#131");
	gradient.addColorStop(1,'#000');
	context.fillStyle = gradient;
	context.fillRect(0,0,canvas.width,canvas.height);
}

function renderTime() {

	now = new Date();
	today = now.toDateString();
	time = now.toLocaleTimeString();
	hours = now.getHours();
	minutes = now.getMinutes();
	seconds = now.getSeconds();
	milliseconds = now.getMilliseconds();
	newSeconds = seconds + (milliseconds / 1000);	

	context.strokeStyle = "#0f0";
	context.lineWidth = 17;
	// context.lineCap = "round";
	
	context.shadowBlur = 15;
	context.shadowColor = "#0f0";
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
	context.fillStyle = "#0f0";
	context.fillText(today, canvas.width / 2 - 100, canvas.height / 2);
	context.font = "15px Arial";
	context.fillStyle = "#0f0";
	context.fillText(time, canvas.width / 2 - 100, canvas.height / 2 + 30);

}

function renderBits() {
	for (var i = 0; i < bits.length; i++) {
		bits[i].update().draw();
	}
}

function web() {
	clearCanvas();
	renderBits();
	renderTime();
}

setInterval(web, 40);

function Bit() {
	this.value = randomBetween(0,2);
	this.speed = randomBetween(1,10);
	this.valueHeight = randomBetween(5,15);
	this.x = randomBetween(0, canvas.width/2);
	this.y = randomBetween(0, canvas.height/2);

	this.control = function() {
		if (this.y < 0) {
			this.y = canvas.height/2;
		}
		if (this.y > canvas.height/2 + this.valueHeight) {
			this.y = 0;
		}
		if (this.x < 0) {
			this.x = canvas.width/2;
		}
		if (this.x > canvas.width/2) {
			this.x = 0;
		}
	}

	this.update = function() {
		this.y -= this.speed;
		this.x -= this.speed;
		this.control();

		return this;
	}

	this.draw = function() {
		context.fillStyle = "#0f0";
		context.fillText(this.value, this.x, this.y);
		context.font = "" + this.valueHeight + "px Arial";

		context.fillStyle = "#0f0";
		context.fillText(this.value, canvas.width/2 + (canvas.width/2 - this.x), this.y);
		context.font = "" + this.valueHeight + "px Arial";

		context.fillStyle = "#0f0";
		context.fillText(this.value, this.x, canvas.height/2 + (canvas.height/2 - this.y));
		context.font = "" + this.valueHeight + "px Arial";

		context.fillStyle = "#0f0";
		context.fillText(this.value, canvas.width/2 + (canvas.width/2 - this.x),
		canvas.height/2 + (canvas.height/2 - this.y));
		context.font = "" + this.valueHeight + "px Arial";
	}
}