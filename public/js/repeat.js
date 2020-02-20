var socket = io.connect("http://localhost:3000");

$('#startreceive').click(function () { 
	socket.emit('starttransmittion');
});

$('#stopreceive').click(function () {
	socket.emit('stoptransmittion');
});

socket.on('getonedata', function (data) {
	$('#output').html('<p>'+data.time+'</p>');
});