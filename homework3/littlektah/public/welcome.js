const button = document.querySelector('button');
const input = document.querySelector('input');
let name = null;

//const socket = new WebSocket(`ws://${location.hostname}:50001`);

button.addEventListener('click', () => {
    name = input.value;
    socket.send(`NAME ${name}`);
})

socket.addEventListener('message', (event) => {
    if (event.data === 'NAMEACCEPTED') {
        socket.send('READY');
    }
  });