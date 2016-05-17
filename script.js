
////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById('clock');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

////////////////////////////////////////////////////////////////////////////

var bits = [];
var notified = false;
var deathnotif = false;

////////////////////////////////////////////////////////////////////////////

setInterval(web, 40);

generateBits();

////////////////////////////////////////////////////////////////////////////

function generateBits() {
	var ctr = 0;
	for (var i = 20; i < canvas.height; i+=40) {
		for (var j = 0; j < canvas.width; j+=10) {
			bits.push(new Bit(j,i,ctr%2));
		}
		ctr++;
	}
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
	context.arc(canvas.width/2, canvas.height/2, 200, 
		degToRad(270), degToRad((hours*15)-90));
	context.stroke();
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 170, 
		degToRad(270), degToRad((minutes*6)-90));
	context.stroke();
	context.beginPath();
	context.arc(canvas.width/2, canvas.height/2, 140, 
		degToRad(270), degToRad((newSeconds*6)-90));
	context.stroke();


	var today = now.toDateString();
	var time = now.toLocaleTimeString();

	context.font = "25px Arial";
	context.fillStyle = "#36CDFF";
	context.fillText(today, canvas.width / 2 - 100, canvas.height / 2);
	context.font = "15px Arial";
	context.fillStyle = "#36CDFF";
	context.fillText(time, canvas.width / 2 - 100, canvas.height / 2 + 30);

	if (seconds == 0 && notified == false) {
		notify("the current time is : " + time);
		notified = true;
	}
	if (seconds == 1 && notified == true) {
		notified = false;
	}

	// if (seconds == 30 && deathnotif == false) {
	// 	notify("Random Trivia : Did you know that somebody died at this exact moment!");
	// 	deathnotif = true;
	// }
	// if (seconds == 31 && deathnotif == true) {
	// 	deathnotif = false;
	// }
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

function notify(message) {
	var title = 'Good Day User!';
	var body = message;
	var icon = "images/icon.jpg";
	var notification = new Notification(title, {
		body: body,
		icon: icon
	});

	setTimeout(function() { notification.close() }, 5000);
}

function randomBetween(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function clearCanvas() {
	gradient = context.createRadialGradient(
		canvas.width/2,canvas.height/2,5,canvas.width/2,canvas.height/2,300);
	gradient.addColorStop(0,"#116");
	gradient.addColorStop(0.5,"#11a");
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
		if (this.x < 0)
			this.x = canvas.width + 10;
		if (this.x > canvas.width + 10)
			this.x = 0;
	}

	this.update = function() {
		this.control();

		if (randomBetween(0,10) == 0) {
			this.value = randomBetween(0,2);
		}

		if (randomBetween(0,100) == 0) {
			this.value = " ";
		}

		if (this.test == 0)
			this.x--;
		else if (this.test == 1)
			this.x++;

		return this;
	}

	this.draw = function() {
		context.shadowBlur = 0;
		context.font = "9px Arial";
		context.fillStyle = "#00f";
		context.fillText(this.value, this.x, this.y);
	}
}