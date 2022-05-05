import mqttHandler from './mqttHandler'

const mqttClient = new mqttHandler()

mqttClient.connect()

// module.exports = mqttClient
export default mqttClient