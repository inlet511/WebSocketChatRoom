var express = require('express');
var socket = require('socket.io');

var app = express();

app.use(express.static('public'));



var server = app.listen(3000, function () {
	console.log('Listening on prot 3000');
});



var io = socket(server);
var repeatid;

var dorepeat = function () {
	repeatid = setInterval(printTime, 10);
};

var stoprepeat = function () {
	clearInterval(repeatid);
}

var printTime = function () {
	let date_ob = new Date();
	io.sockets.emit('getonedata', {
		time: date_ob.getHours() + ':' + date_ob.getMinutes() + ':' + date_ob.getSeconds() + ':' + date_ob.getMilliseconds()
	});
};

io.on('connection', function (socket) {
	console.log('made socket connection', socket.id);
	
	socket.on('chat', function (data) {
		// io.sockets means all sockets
		io.sockets.emit('chat', data);		
	});

	// broadcasting - from one socket
	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data.handle);
	});

	socket.on('starttransmittion', dorepeat);

	socket.on('stoptransmittion', stoprepeat);
});