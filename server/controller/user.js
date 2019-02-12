import express from 'express'
import User from '../model/user'

const userController = express.Router()

userController
  .route('/')
  .get((req, res) => {
    User.find({}, (err, _users) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.json(_users)
      }
    })
  })
userController
  .route('/create')
  .post((req, res) => {
    let _user = new User(req.body)
    _user.save()
    res.status(201).send(`User ${_user.name} created.`)
  })
userController
  .route('/:userId')
  .get((req, res) => {
    User.findById(req.params.userId, (err, _user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.json(_user)
      }
    })
  })
  .put((req, res) => {
    User.findById(req.params.userId, (err, _user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        _user.name = req.body.name
        _user.password = req.body.password
        _user.save()
        res.json(_user)
      }
    })
  })
  .delete((req, res) => {
    User.findById(req.params.bookId, (err, _user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        _user.remove(err => {
          if (err) {
            res.status(500).send(err)
          } else {
            res.status(204).send('removed')
          }
        })
      }
    })
  })

export default userController
