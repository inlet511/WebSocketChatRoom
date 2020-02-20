var socket = io.connect("http://localhost:3000");

$('#send').click(function () {
	socket.emit('chat', {
		message: $('#message').val(),
		handle:$('#handle').val()
	});
});

$('#message').keypress(function () {
	socket.emit('typing', {
		handle: $('#handle').val()
	});
});

socket.on('chat', function (data) {
	$('#typinghint').text('');
	$('#output').append('<span class="badge badge-primary">' + data.handle + '</span><div class="alert alert-primary" role="alert">' + data.message+'</div>') ;
});

socket.on('typing', function (data) {
	$('#typinghint').text(data + ' is typing');
});