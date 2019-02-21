import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import mongoose from 'mongoose'
import cors from 'cors'
import config from './config'
import authRouter from './router/auth'
import userRouter from './router/user'
import eventRouter from './router/event'
import accidentRouter from './router/accident'

mongoose.connect(
  config.db,
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
mongoose.set('useFindAndModify', false)

const app = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const whitelist = ['http://localhost', 'http://localhost:8080']
app.use(cors({
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))

app.get('/', (req, res) => {
  res.status(200).send('This is an API server.')
})
app.use('/api', authRouter)
app.use('/api/user', userRouter)
app.use('/api/event', eventRouter)
app.use('/api/accident', accidentRouter)

const port = config.port || 5656

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
