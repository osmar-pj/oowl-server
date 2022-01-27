import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import mqtt from 'mqtt'

import { createServer } from 'http'

// importamos las rutas
// import wapRoutes from "./routes/waps.routes";
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import deviceRoutes from './routes/device.routes'
import InstrumentRoutes from './routes/instrument.routes'
import actuatorRoutes from './routes/actuator.routes'


import { createRoles, createAdmin } from "./libs/initialSetup"

// importamos los modelos
// import Tracking from './models/Tracking'
import House from './models/House'
import Actuator from './models/Actuator'


const app = express();

// config sockets
const server = createServer(app)
const io = require('socket.io')(server)

createRoles();
//createAdmin(); // para mejorar el codigo del weon de fazt

// Settings
app.set("port", process.env.PORT || 3005);

// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000"
};
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Welcome Routes

// Routes
// app.use("/api/waps", wapRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/device', deviceRoutes)
app.use('/api/instrument', InstrumentRoutes)
app.use('/api/actuator', actuatorRoutes)


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

const connectUrl = process.env.URL_MQTT
console.log(connectUrl)
const client = mqtt.connect(connectUrl, options)
client.on('connect', () => {
  console.log('Client connected by SERVER:')
  // Subscribe
  // client.subscribe('alarma/sierna/#', { qos: 0 })
  client.subscribe('peru/#', { qos: 0 })
})

let sensors = {}

client.on('message', async (topic, message) => {
  const data = JSON.parse(message.toString())
  // if (data) {
  //   const new_device = new House(data)
  //   await new_device.save()
  // }
  if (data.detector_rasp) {
    sensors.ps = data.detector_rasp.values
  }
})

setInterval(async () => {
  // const houses = await House.find({}).sort({_id: -1}).limit(1)
  // const actuator = await Actuator.find({}).sort({_id: -1}).limit(1)
  // console.log(actuator[0].sw.s)
  // sensors = houses[0].values
  for (let i in USERS) {
    USERS[i].emit('sensors', sensors)
    // USERS[i].emit('actuator', actuator[0].sw.s.Stat_LedV)
  }
}, 2000)

server.listen(3005, () => {
  console.log(`server is ok in port ${app.get('port')}`)
})

export default app