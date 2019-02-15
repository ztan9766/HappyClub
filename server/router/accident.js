import express from 'express'
import Accident from '../model/accident'
import jwtCheck from '../middleware/jwtCheck'

const accidentRouter = express.Router()

accidentRouter.use(jwtCheck)

accidentRouter.route('/getAll').get((req, res) => {
  Accident.find({}, (err, _accidents) => {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: 'Can not find accidents.' })
    }
    res.status(200).send({ success: true, data: _accidents })
  })
})

accidentRouter.route('/create').post((req, res) => {
  Accident.create(req.body, function (err, _accident) {
    if (err) {
      res
        .status(500)
        .send({ success: false, message: 'Accident creation failed.' })
    }
    res
      .status(200)
      .send({ success: true, message: `Accident ${_accident.name} created.` })
  })
})

accidentRouter
  .route('/:accidentId')
  .get((req, res) => {
    Accident.findById(req.params.accidentId, (err, _accident) => {
      if (err) {
        res
          .status(500)
          .send({ success: false, message: 'Can not get accident.' })
      }
      res.json({
        success: true,
        message: `${_accident.name} detail`,
        data: _accident
      })
    })
  })

accidentRouter
  .route('/update/:accidentId')
  .put((req, res) => {
    let updateData = {}
    if (req.body.name) updateData.name = req.body.name
    if (req.body.user) updateData.user = req.body.user
    if (req.body.event) updateData.event = req.body.event
    if (req.body.description) updateData.description = req.body.description

    if (updateData !== {}) {
      Accident.findOneAndUpdate(
        { _id: req.decoded._id },
        updateData,
        (err, _accident) => {
          if (err) res.status(500).send(err)
          _accident.password = req.body.password
          _accident.save()
          res.status(200).send({ success: true, message: 'Accident updated.' })
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
      if (err) res.status(500).send({ success: false, message: 'Accident not found.' })
      res.status(200).send({ success: true, message: `User ${req.params.id} removed.` })
    })
  })

export default accidentRouter
