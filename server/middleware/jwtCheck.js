import jwt from 'jsonwebtoken'
import config from '../config'

export default function jwtCheck (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: '无效的token.', cleanStorage: true })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    // 没有拿到token 返回错误
    return res.status(403).send({
      success: false,
      message: '没有找到token.'
    })
  }
}
