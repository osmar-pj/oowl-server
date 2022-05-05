import mqttClient from '../mqttClient'

export const getDeviceControl = async (req, res) => {
    try {
      mqttClient.sendMessage('gunjop/home/doorCtrl', 'ON')
      const last_update = new Date()
      res.status(200).json({
        message: last_update
      })
    }
    catch (error) {
      console.error(error)
      res.status(404).json({
          message: 'Error al obtener los datos'
      })
    }
}