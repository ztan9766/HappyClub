import request from '../../../utils/request'

const login = data => {
  return request({
    url: 'auth',
    method: 'post',
    data,
  })
}

export default { login }