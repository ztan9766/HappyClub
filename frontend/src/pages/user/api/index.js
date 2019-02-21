import request from '../../../utils/request'

const getAll = () => {
  return request({
    url: 'user/all',
    method: 'get'
  })
}

const getOne = userId => {
  return request({
    url: 'user/' + userId,
    method: 'get'
  })
}

const changePwd = data => {
  return request({
    url: 'user/changePwd/' + data.id,
    method: 'post',
    data
  })
}

export default { getAll, getOne, changePwd }