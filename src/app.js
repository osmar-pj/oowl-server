import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import unifi from 'node-unifi'

import { createServer } from 'http'

// importamos las rutas
// import wapRoutes from "./routes/waps.routes";


import { createRoles, createAdmin } from "./libs/initialSetup"

// importamos los modelos
// import Tracking from './models/Tracking'


const app = express();

// config sockets
const server = createServer(app)
const io = require('socket.io')(server)

createRoles();
//createAdmin(); // para mejorar el codigo del weon de fazt

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000"
};
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Welcome Routes

// Routes
// app.use("/api/waps", wapRoutes)


// Sockets
let USERS = {}

io.on("connection", (socket) => {
  console.log(`${socket.id} was connected`)
  USERS[socket.id] = socket

  socket.on('disconnect', () => {
    console.log(`${socket.id} was disconnected`)
  })
})

setInterval(async () => {
  // FINISH
  

  for (let i in USERS) {
    USERS[i].emit('data', tracking)
    USERS[i].emit('winex', winex)
  }
}, 5000)

server.listen(4000, () => {
  console.log('server is ok')
})

export default app