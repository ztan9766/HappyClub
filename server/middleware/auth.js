export default function authChecker (req, res, next) {
  if (req.session.auth || req.path === '/login') {
    next()
  } else {
    res.status(500).send('Authorization failed.')
  }
}
