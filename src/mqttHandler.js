import mqtt from 'mqtt'

class mqttHandler {
    constructor() {
      this.client = {}
      this.options = {
          clientId: process.env.MQTT_CLIENT_SRV,
          username: 'digitalOceanServer',
          password: ''
      }
    }

    connect() {
      this.client = mqtt.connect(process.env.URL_MQTT, this.options)
      this.client.on('connect', () => {
        // console.log('Client connected by SERVER:')
        // Subscribe
        this.client.subscribe(process.env.TOPIC_MQTT_SENSOR, { qos: 0 })
      })
    }

    sendMessage(topic, message) {
      this.client.publish(topic, message)
    }
}

module.exports = mqttHandler