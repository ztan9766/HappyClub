import express from 'express'
import Event from '../model/event'
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
  Event.create(req.body, function (err, _event) {
    if (err) {
      res.status(500).send({ success: false, message: 'Event creation failed.' })
    } else {
      res.status(200).send({ success: true, message: `Event ${_event.name} created.` })
    }
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

eventRouter
  .route('/update/:eventId')
  .post((req, res) => {
    let updateData = {}
    if (req.body.name) updateData.name = req.body.name
    if (req.body.date) updateData.date = req.body.date
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

export default eventRouter
