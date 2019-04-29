const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const button = document.querySelector('button');
const input = document.querySelector('input');
const login = document.getElementById('login');
const game = document.getElementById('game');
let name = null;

const socket = new WebSocket(`ws://${location.hostname}:50001/game`);

button.addEventListener('click', () => {
  name = input.value;
  socket.send(`NAME ${name}`);
})

//moves player by mouse movement and sends coordinates to the server
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  socket.send(`MOVE ${JSON.stringify([x, y])}`);
});

//accepts renderData, which is an array of objects [{location: l, color: c}, ...], and renders each player as a rectangle
socket.addEventListener('message', (event) => {
  if (event.data === 'NAMEACCEPTED') {
    login.style.display = 'none';
    game.style.display = 'block';
    socket.send('READY');
  } else if (event.data.substring(0,4) ==='MOVE') {
    data = event.data.substring(5);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    JSON.parse(data).forEach(({ location, color }) => {
      ctx.fillStyle = color;
      ctx.fillRect(...location, 10, 10);
    });
  }
});