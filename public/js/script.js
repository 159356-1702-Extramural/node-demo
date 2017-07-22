var $doc = $(document);
var socket = io();

var $messages_container = $('#messages');

console.log('$messages_container: ', $messages_container);

// Detect notification from socket
socket.on('notification', function(data) {
    notify('Socket received message: ' + data.message);
});

// Detect button click
$doc.on('click', '#the_button', function(e) {
    e.preventDefault();
    
    notify('You clicked the button...');
    
    socket.emit('update', { message: 'Someone clicked the button...'});

});

function notify(msg)
{

    console.log(msg);

    $messages_container.prepend(
        '<p>'+msg+'<p>'
    );
}