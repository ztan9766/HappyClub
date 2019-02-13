import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'
import config from './config'
import userController from './controller/user'
import eventController from './controller/event'
import accidentController from './controller/accident'

const db = mongoose.connect(
  'mongodb://127.0.0.1:27017/hc',
  { useNewUrlParser: true },
  function (err) {
    if (err) {
      console.log('DB Connection Error:' + err)
    } else {
      console.log('DB Connection success!')
    }
  }
)
mongoose.set('useCreateIndex', true)

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).send('This is an API server.')
})
app.use('/api/user', userController)
app.use('/api/event', eventController)
app.use('/api/accident', accidentController)

const port = config.port || 5656

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
