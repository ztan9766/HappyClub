export default function requireRole (role) {
  return function (req, res, next) {
    if (req.session.user && req.session.user.role === role) {
      next()
    } else {
      res.status(500).send('Permission denied.')
    }
  }
}
