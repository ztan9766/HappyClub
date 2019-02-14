import express from 'express'
import User from '../model/user'
import jwtCheck from '../middleware/jwtCheck'

const userRouter = express.Router()

userRouter.use(jwtCheck)

userRouter.route('/')
  .get((req, res) => {
    User.find({}, (err, _users) => {
      if (err) res.status(500).send({ success: false, message: 'Can not find users.' })
      res.status(201).send({ success: true, data: _users })
    })
  })

userRouter.route('/create').post((req, res) => {
  if (req.decoded && req.decoded.admin) {
    User.create({ name: req.body.name, password: req.body.password }, function (
      err,
      _user
    ) {
      if (err) res.status(500).send({ success: false, message: 'User creation failed.' })
      res.status(201).send({ success: true, message: `User ${_user.name} created.` })
    })
  } else {
    res.status(500).send({ success: false, message: 'Permission denied.' })
  }
})

userRouter.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, _user) => {
      if (err) res.status(500).send({ success: false, message: 'Can not get user info.' })
      res.json({ success: true, message: `${_user.name} info`, data: { name: _user.name, id: _user._id } })
    })
  })
  .delete((req, res) => {
    User.findById(req.params.id, (err, _user) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not delete user.' })
      } else {
        _user.remove(err => {
          if (err) res.status(500).send({ success: false, message: 'Can\'t delete user.' })
          res.status(204).send({ success: true, message: `User ${_user.name} removed.` })
        })
      }
    })
  })

userRouter.route('/changePwd')
  .put((req, res) => {
    User.findById(req.decoded._id, (err, _user) => {
      if (err) res.status(500).send(err)
      _user.password = req.body.password
      _user.save()
      res.status(201).send({ success: true, message: 'Password updated.' })
    })
  })

userRouter.route('/changePwd/:userId')
  .put((req, res) => {
    if (req.decoded && req.decoded.admin) {
      User.findById(req.params.userId, (err, _user) => {
        if (err) res.status(500).send({ success: false, message: 'Can not find user.' })
        _user.password = req.body.password
        _user.save()
        res.status(201).send({ success: true, message: `User ${_user.name} password updated.` })
      })
    } else {
      res.status(500).send({ success: false, message: 'Permission denied.' })
    }
  })

export default userRouter
