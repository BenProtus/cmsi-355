const messageArea = document.querySelector('#message');
const nameArea = document.querySelector('#name');
const submitMessage = document.querySelector('#submitmessage');
const submitName = document.querySelector('#submitname');
const responses = document.querySelector('#responses');

let socket = null;
let host = 'localhost';

addEventListener('load', () => {
  socket = new WebSocket(`ws://${host}:53211`);
  socket.addEventListener('message', (event) => {
    responses.innerHTML += `${event.data}<br>`;
  });
});

submitName.addEventListener('click', () => {
    socket.send('NAME', nameArea.value);
})

submitMessage.addEventListener('click', () => {
  console.log('I am going to send', messageArea.value)
  socket.send(messageArea.value);
})



