import mqtt from 'mqtt'

const socketIO = require('socket.io')

const socket = {}
let io

function connect(server) {
    io = socketIO(server)
    socket.io = io
    let USERS = {}
    io.on('connection', socket => {
        console.log(`${socket.id} se conecto`)
        USERS[socket.id] = socket
        socket.on('disconnect', () => {
            console.log(`${socket.id} se desconecto`)
        })
    })

    setInterval(() => {
        const data = 'hoalMundo'
        // for (let i in USERS) {
        //     USERS[i].emit('data', {
        //         totalData
        //     })
        // }
    }, 5000)
}

module.exports = {
    connect,
    socket
}

// PARA LLAMAR AL SOCKET DESDE DONDE SEA DEL BACKEND

/*
    const socket = require($route of socket.js$).socket
    const {socket} = require($route of socket.js$)
    socket.io.emit('data', data)
*/
