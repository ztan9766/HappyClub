import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../model/user'
import config from '../config'

const authRouter = express.Router()

authRouter.post('/auth', function (req, res) {
  User.findOne(
    {
      name: req.body.username
    },
    function (err, user) {
      if (err) throw err
      if (!user) {
        res.json({ success: false, message: 'No user found' })
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Wrong password' })
        } else {
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 * 60 * 24 * 30
          })
          res.json({
            success: true,
            message: 'Token generated.',
            data: {
              token: token,
              name: user.name,
              id: user.id
            }
          })
        }
      }
    }
  )
})

authRouter.route('/verifyToken').post((req, res) => {
  jwt.verify(req.body.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, message: 'Invalid token' })
    } else {
      res.json({ success: true, message: 'Valid token' })
    }
  })
})

export default authRouter
