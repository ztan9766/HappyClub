import express from 'express'
import moment from 'moment'
import Event from '../model/event'
import Accident from '../model/accident'
import jwtCheck from '../middleware/jwtCheck'

const eventRouter = express.Router()

eventRouter.use(jwtCheck)

eventRouter.route('/active').get((req, res) => {
  Event.find({ status: 'active' }, (err, _events) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Can not find active events.' })
    } else {
      res.status(200).send({ success: true, data: { events: _events } })
    }
  })
})

eventRouter.route('/all').get((req, res) => {
  Event.find({}, (err, _events) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Can not find any events.' })
    } else {
      res.status(200).send({ success: true, data: { events: _events } })
    }
  })
})

eventRouter.route('/create').post((req, res) => {
  let createData = {
    created_by: req.decoded._id
  }
  if (req.body.name) createData.name = req.body.name
  if (req.body.date) createData.date = moment(req.body.date).unix()
  if (req.body.description) createData.description = req.body.description

  Event.create(createData, function (err, _event) {
    if (err) {
      res.status(500).send({ success: false, message: 'Event creation failed.' })
    } else {
      res.status(200).send({ success: true, message: `Event ${_event.name} created.` })
    }
  })
})

eventRouter
  .route('/update/:eventId')
  .post((req, res) => {
    let updateData = {}
    if (req.body.name) updateData.name = req.body.name
    if (req.body.date) updateData.date = moment(req.body.date).unix()
    if (req.body.description) updateData.description = req.body.description
    if (req.body.status) updateData.status = req.body.status

    if (updateData !== {}) {
      Event.findOneAndUpdate(
        { _id: req.params.eventId },
        updateData,
        (err, _event) => {
          if (err) {
            res.status(500).send(err) 
          } else {
            res.status(200).send({ success: true, message: `Event ${_event.name} updated.` })
          }
        }
      )
    } else {
      res.status(200).send({ success: false, message: 'No update.' })
    }
  })

eventRouter
  .route('/delete/:eventId')
  .delete((req, res) => {
    Event.deleteOne({ _id: req.params.eventId }, err => {
      if (err) {
        res.status(500).send({ success: false, message: 'Event not found.' })
      } else {
        res.status(200).send({ success: true, message: `User ${req.params.eventId} removed.` })
      }
    })
  })

eventRouter.route('/houses').post((req, res) => {
  const page = req.body.page || 1
  const limit = req.body.limit || 5
  Event.countDocuments({}).exec((err, count) => {
    Event.find({}).skip((page - 1) * limit).limit(limit).sort({ date: -1 }).exec((err, _events) => {
      if (err) {
        res.status(500).send({ success: false, message: 'error when finding events.' })
      } else {
        let events = JSON.parse(JSON.stringify(_events))
        Accident.find({}).exec((err, _accidents) => {
          if (err) {
            res.status(500).send({ success: false, message: 'error when finding accidents' })
          } else {
            for (let i = 0; i < events.length; i++) {
              events[i].accidents = []
              for (const _accident of _accidents) {
                if (_accident.event.toString() === events[i]._id) {
                  events[i].accidents.push(_accident)
                }
              }
            }
            res.status(200).send({ success: true, data: { events: events, count: count } })
          }
        })
      }
    })
  })
})

eventRouter
  .route('/:eventId')
  .get((req, res) => {
    Event.findById(req.params.eventId, (err, _event) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not get event.' })
      } else {
        res.json({
          success: true,
          message: `${_event.name} detail`,
          data: { event: _event }
        })
      }
    })
  })

export default eventRouter
