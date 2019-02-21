import express from 'express'
import User from '../model/user'
import jwtCheck from '../middleware/jwtCheck'

const userRouter = express.Router()

userRouter.use(jwtCheck)

userRouter.route('/all')
  .get((req, res) => {
    User.find({}, (err, _users) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not find users.' })
      } else {
        res.status(200).send({ success: true, data: { users: _users } })
      }
    })
  })

userRouter.route('/create').post((req, res) => {
  if (req.decoded && req.decoded.admin) {
    User.create({ name: req.body.name, password: req.body.password }, function (
      err,
      _user
    ) {
      if (err) {
        res.status(500).send({ success: false, message: 'User creation failed.' })
      } else {
        res.status(200).send({ success: true, message: `User ${_user.name} created.` })
      }
    })
  } else {
    res.status(500).send({ success: false, message: 'Permission denied.' })
  }
})

userRouter.route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, _user) => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not get user info.' })
      } else {
        res.json({ success: true, message: `${_user.name} info`, data: { name: _user.name, id: _user._id } })
      }
    })
  })

userRouter.route('/delete/:userId')
  .delete((req, res) => {
    User.deleteOne({ _id: req.params.userId }, err => {
      if (err) {
        res.status(500).send({ success: false, message: 'Can not delete user.' })
      } else {
        res.status(200).send({ success: true, message: `User ${req.params.userId} removed.` })
      }
    })
  })

userRouter.route('/changePwd')
  .post((req, res) => {
    User.findOneAndUpdate({ _id: req.decoded._id }, { password: req.body.password }, (err, _user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).send({ success: true, message: 'Password updated.' })
      }
    })
  })

userRouter.route('/changePwd/:userId')
  .post((req, res) => {
    if (req.decoded && req.decoded.admin) {
      User.findOneAndUpdate({ _id: req.params.userId }, { password: req.body.password }, (err, _user) => {
        if (err) {
          res.status(500).send({ success: false, message: 'Can not find user.' })
        } else {
          if (_user) {
            res.status(200).send({ success: true, message: `User ${_user.name} password updated.` })
          } else {
            res.status(200).send({ success: false, message: `No user found.` })
          }
        }
      })
    } else {
      res.status(500).send({ success: false, message: 'Permission denied.' })
    }
  })

export default userRouter
