const socket = io("http://localhost:3000");
let currentUser = '';

$(() =>{
    console.log('init');
    $('#init-area').show();
    $('#chat-area').hide();
})

$('#btn-join').click((e) => {
    e.preventDefault();

    const name = $('#user').val();
    if (name) {
        $('#init-area').hide();
        socket.emit('login-action', name);
        currentUser = name;
        $('#chat-area').show();
    }
});

$('#btn-send').click((e) => {
    e.preventDefault();
    const msg = $('#message').val();
    socket.emit('chat-message', msg);
    $('#message').val('');
});

socket.on('chat-message', function (msg) {
    console.log(msg.message)
    const own = (currentUser === msg.name);

    const cls = (own)? "class='self'" : "class='others'";
    $('#messages').append( "<div "+ cls+ "><p>" + msg.name +': </p>' + msg.message + "</div>");
   
    window.scrollTo(0, document.body.scrollHeight);
});
