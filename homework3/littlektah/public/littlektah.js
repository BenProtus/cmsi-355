const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//FIXME: can we make this new socket call on both of the client-side JS files??
const socket = new WebSocket(`ws://${location.hostname}:50001/game`);

//moves player by mouse movement and sends coordinates to the server
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  socket.send(`MOVE ${JSON.stringify([x, y])}`);
});

//accepts renderData, which is an array of objects [{location: l, color: c}, ...], and renders each player as a rectangle
socket.addEventListener('message', (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  JSON.parse(event.data).forEach(({ location, color }) => {
    ctx.fillStyle = color;
    ctx.fillRect(...location, 10, 10);
  });
});