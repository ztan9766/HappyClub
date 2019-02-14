import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../model/user'
import config from '../config'

const authRouter = express.Router()

authRouter.post('/auth', function (req, res) {
  User.findOne(
    {
      name: req.body.name
    },
    function (err, user) {
      if (err) throw err
      if (!user) {
        res.json({ success: false, message: '未找到授权用户' })
      } else if (user) {
        if (user.password !== req.body.password) {
          res.json({ success: false, message: '用户密码错误' })
        } else {
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 60 * 60 * 24 * 30
          })
          res.json({
            success: true,
            message: '请使用您的授权码',
            token: token
          })
        }
      }
    }
  )
})

export default authRouter
