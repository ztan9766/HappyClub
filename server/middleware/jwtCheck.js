import jwt from 'jsonwebtoken'
import config from '../config'

export default function jwtCheck (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(403).send({ success: false, message: '请重新登陆.', cleanStorage: true })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    // 没有拿到token 返回错误
    return res.status(401).send({
      success: false,
      message: '没有找到token.'
    })
  }
}
