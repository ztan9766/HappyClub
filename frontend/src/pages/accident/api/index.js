import request from '../../../utils/request'

const getAll = () => {
  return request({
    url: 'accident/all',
    method: 'get'
  })
}

const getOne = accidentId => {
  return request({
    url: 'accident/' + accidentId,
    method: 'get'
  })
}

const update = (accidentId, data) => {
  return request({
    url: 'accident/update/' + accidentId,
    method: 'post',
    data
  })
}

const create = data => {
  return request({
    url: 'accident/create/',
    method: 'post',
    data
  })
}

export default { getAll, getOne, update, create }