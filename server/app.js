import express from 'express'
import bodyParser from 'body-parser'
import config from './config'
import userController from './controller/user'
import eventController from './controller/event'
import accidentController from './controller/accident'

const app = express()
const port = config.port || 5656

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

app.use('/api/user', userController)
app.use('/api/event', eventController)
app.use('/api/accident', accidentController)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
