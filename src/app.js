import express from "express";
import { petsRouter } from "./routes/pets.router.js";
import { usersRouter } from "./routes/users.router.js";
import { usersHtmlRouter } from "./routes/users.html.router.js";
import { testSocketRouter } from "./routes/test.socket.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import path from "path";
import { __dirname } from "./utils.js";
const app = express();
const port = 3000;

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("se abrio un canal de soket" + socket.id);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//Rutas: API REST CON JSON
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

//Rutas: HTML RENDER SERVER SIDE
app.use("/users", usersHtmlRouter);

//Rutas: SOCKETS
app.use("/test-socket", testSocketRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "no encontrado",
    data: {},
  });
});
