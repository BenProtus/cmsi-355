const nameHide = document.querySelector('#nameSection');
const nameArea = document.querySelector('#name');
const submitName = document.querySelector('#submitname');

const messageHide = document.querySelector('#messageSection');
const messageArea = document.querySelector('#message');
const submitMessage = document.querySelector('#submitmessage');

const responses = document.querySelector('#responses');

let socket = null;
let host = `ws://${location.hostname}:53210`;

addEventListener('load', () => {

  socket = new WebSocket(host);
  let name = false;

  socket.addEventListener('message', (event) => {
    if (event.data.substring(0,12) === 'NAMEACCEPTED') {
      name = event.data.substring(13);
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
    console.log(name, 'sending...', messageArea.value);
    socket.send('MESSAGE ' + name + ": "+ messageArea.value);
    messageArea.value = '';
  });

});