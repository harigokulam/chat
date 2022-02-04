//const socket = io("http://localhost:3000");
let user = '';
const msgArea = document.getElementById('message-area');
msgArea.hidden = true;
const loginPrompt = document.getElementById('login');

const startBtn = document.getElementById("start");
startBtn.addEventListener('click', function (e) {
    const name = document.getElementById("name").value;

    if (name) {
        socket.emit('login-action', name);
        msgArea.hidden = false;
        loginPrompt.hidden = true;
        user = name;
    }
})
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat-message', input.value);
        input.value = '';
    }
});

socket.on('chat-message', function (msg) {
    var item = document.createElement('li');
    const own = (user === msg.name);
    const salute = (own)? 'You': msg.name;
    item.textContent = salute + ": " + msg.message;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});