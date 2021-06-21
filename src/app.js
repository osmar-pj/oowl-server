import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import mqtt from 'mqtt'

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

const options = {
  clientId: 'SERVER-OWL',
  username: 'ServerNode',
  password: ''
}

const connectUrl = 'ws://143.198.128.180:8083/mqtt'
const client = mqtt.connect(connectUrl, options)
client.on('connect', () => {
  console.log('Client connected by SERVER:')
  // Subscribe
  client.subscribe('peru/arequipa/hunter/#', { qos: 0 })
})

let sensors = {}

client.on('message', async (topic, message) => {
  const data = JSON.parse(message.toString())
  console.log(data)
  if (data.alarm) {
    sensors = data.alarm
  }
})

setInterval(async () => {
  for (let i in USERS) {
    USERS[i].emit('sensors', sensors)
    // USERS[i].emit('winex', winex)
  }
}, 500)

server.listen(4000, () => {
  console.log('server is ok')
})

export default app