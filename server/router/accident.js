import express from 'express'
import moment from 'moment'
import Accident from '../model/accident'
import jwtCheck from '../middleware/jwtCheck'

const accidentRouter = express.Router()

accidentRouter.use(jwtCheck)

accidentRouter.route('/all').get((req, res) => {
  Accident.find({}, (err, _accidents) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Can not find accidents.' })
    } else {
      res.status(200).send({ success: true, data: { accidents: _accidents } })
    }
  })
})

accidentRouter.route('/create').post((req, res) => {
  Accident.findOne({ event: req.body.event, user: req.body.user }, (err, _accident) => {
    if (err) {
      res.status(500).send({ success: false, message: 'Accident creation failed.' })
    } else {
      if (_accident) {
        res.status(200).send({ success: false, message: `user already had accident in this event.` })
      } else {
        let createData = {
          created_by: req.decoded._id
        }
        if (req.body.name) createData.name = req.body.name
        if (req.body.user) createData.user = req.body.user
        if (req.body.event) createData.event = req.body.event
        if (req.body.credit) createData.credit = req.body.credit
        if (req.body.description) createData.description = req.body.description

        Accident.create(createData, function (err, __accident) {
          if (err) {
            res.status(500).send({ success: false, message: 'Accident creation failed.' })
          } else {
            res.status(200).send({ success: true, message: `Accident ${__accident.name} created.` })
          }
        })
      }
    }
  })
  
})

accidentRouter
  .route('/:accidentId')
  .get((req, res) => {
    Accident.findById(req.params.accidentId, (err, _accident) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not get accident.' })
      } else {
        res.json({
          success: true,
          message: `${_accident.name} detail`,
          data: { accident: _accident }
        })
      }
    })
  })

accidentRouter
  .route('/findByEvent/:eventId')
  .get((req, res) => {
    Accident.find({ event: req.params.eventId }, (err, _accidents) => {
      if (err) {
        res.status(500).send({ success: false, message: 'error when finding accidents' })
      } else {
        res.json({
          success: true,
          data: { accidents: _accidents }
        })
      }
    })
  })

accidentRouter
  .route('/update/:accidentId')
  .post((req, res) => {
    let updateData = {}
    if (req.body.name) updateData.name = req.body.name
    if (req.body.user) updateData.user = moment(req.body.user).unix()
    if (req.body.event) updateData.event = req.body.event
    if (req.body.description) updateData.description = req.body.description

    if (updateData !== {}) {
      Accident.findOneAndUpdate(
        { _id: req.decoded._id },
        updateData,
        (err, _accident) => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(200).send({ success: true, message: 'Accident updated.' })
          }
        }
      )
    } else {
      res.status(200).send({ success: false, message: 'No update.' })
    }
  })

accidentRouter
  .route('/delete/:accidentId')
  .delete((req, res) => {
    Accident.deleteOne({ _id: req.params.userId }, err => {
      if (err) {
        res.status(500).send({ success: false, message: 'Accident not found.' })
      } else {
        res.status(200).send({ success: true, message: `User ${req.params.id} removed.` })
      }
    })
  })

export default accidentRouter
