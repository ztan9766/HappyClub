import express from 'express'
import moment from 'moment'
import User from '../model/user'
import Event from '../model/event'
import Accident from '../model/accident'
import jwtCheck from '../middleware/jwtCheck'

const rankRouter = express.Router()

function getAllUsers () {
  return new Promise((resolve, reject) => {
    User.find({}, (err, users) => {
      if (err) reject(err)
      if (users) {
        resolve(users)
      } else {
        reject(new Error('no user found'))
      }
    })
  })
}

function getAccidents (userId) {
  return new Promise((resolve, reject) => {
    Accident.find({ user: userId }, (err, accidents) => {
      if (err) reject(err)
      if (accidents) {
        resolve(accidents)
      }
      resolve([])
    })
  })
}

function getEvents (start, end, eventIds) {
  return new Promise((resolve, reject) => {
    Event.find({ _id: { $in: eventIds }, date: { $gte: start, $lte: end } }).exec((err, events) => {
      if (err) reject(err)
      if (events) {
        resolve(events)
      }
      resolve([])
    })
  })
}

async function getRankLists () {
  const list = {
    all: [],
    mon: []
  }

  const start = moment().month(moment().month()).startOf('month').unix()
  const end = moment().month(moment().month()).endOf('month').unix()

  const users = await getAllUsers()
  for (const user of users) {
    let accidents = await getAccidents(user.id)
    list.all.push({
      id: user.id,
      name: user.name,
      times: accidents.length
    })
    let events = []
    for (const accident of accidents) {
      events.push(accident.event)
    }
    let _events = await getEvents(start, end, events)
    list.mon.push({
      id: user.id,
      name: user.name,
      times: _events.length
    })
  }
  return list
}

rankRouter.use(jwtCheck)

rankRouter.route('/').get((req, res) => {
  try {
    getRankLists().then(rankLists => {
      res.status(200).send({ success: true, data: { rankLists: rankLists } })
    }).catch(e => {
      res.status(500).send(e)
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

export default rankRouter
