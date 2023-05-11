//FRONT
const socket = io();

socket.on("msg_back_to_front", (data) => {
  console.log(JSON.stringify(data));
  socket.emit("msg_front_to_back", {
    msg: Date.now() + " hola desde el front al socket",
  });
});
