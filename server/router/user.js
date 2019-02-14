import express from 'express'
import User from '../model/user'
import jwtCheck from '../middleware/jwtCheck'

const userRouter = express.Router()

userRouter.use(jwtCheck)

userRouter
  .route('/')
  .get((req, res) => {
    User.find({}, (err, _users) => {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(req.decoded)
        res.json(_users)
      }
    })
  })
userRouter
  .route('/create')
  .post((req, res) => {
    let _user = new User(req.body)
    _user.save()
    res.status(201).send(`User ${_user.name} created.`)
  })
userRouter
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

export default userRouter
