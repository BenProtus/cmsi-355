const button = document.querySelector('button');
const input = document.querySelector('input');
let name = null;

//FIXME: can we make this new socket call on both of the client-side JS files??
const socket = new WebSocket(`ws://${location.hostname}:50001`);

button.addEventListener('click', () => {
    name = input.value;
    socket.send(`NAME ${name}`);
})