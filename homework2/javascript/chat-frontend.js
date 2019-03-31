const messageArea = document.querySelector('#message');
const nameArea = document.querySelector('#name');
const submitMessage = document.querySelector('#submitmessage');
const submitName = document.querySelector('#submitname');
const responses = document.querySelector('#responses');
const nameHide = document.querySelector('#nameSection');
const messageHide = document.querySelector('#messageSection');

let socket = null;
let host = 'localhost';

addEventListener('load', () => {
  socket = new WebSocket(`ws://${host}:53211`);

  socket.addEventListener('message', (event) => {
    if (event.data === 'NAMEACCEPTED') {
      nameHide.style.display = 'none';
      messageHide.style.display = 'block';
    } else {
      responses.innerHTML += `${event.data}<br>`;
    }
  });

  submitName.addEventListener('click', () => {
    console.log('NAME', nameArea.value);
    socket.send('NAME ' + nameArea.value);
  });

  submitMessage.addEventListener('click', () => {
    console.log('I am going to send', messageArea.value);
    socket.send('MESSAGE ' + messageArea.value);
    messageArea.value = '';
  });

});