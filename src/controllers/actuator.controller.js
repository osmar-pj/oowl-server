import Actuator from '../models/Actuator'
import mqtt from 'mqtt'

export const ledControl = async (req, res) => {
    try {
        let control = 'LO'
        if (req.body.led) {
            control = 'LU'
        } else {
            control = 'LO'
        }
        // create a function to convert string to number
        const options = {
            clientId: 'ledControlServer',
            username: 'ledControlServer',
            password: ''
          }
          
        const connectUrl = 'ws://143.198.128.180:8083/mqtt'
        const client = mqtt.connect(connectUrl, options)
        client.on('connect', () => {
            console.log('Client connected by SERVER:')
            // Subscribe
            client.subscribe('gunjop/deb/#')
        })
        client.publish('gunjop/deb/control', control)

        client.on('message', async (topic, message) => {
            const data = JSON.parse(message.toString())
            // console.log(data)
            if (data) {
                const new_data = new Actuator(data)
                new_data.save()
            }
        })
        res.status(200).json({
            change: true
        })
    } catch (error) {
        console.error(error)
    }
}