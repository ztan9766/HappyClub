import request from '../../../utils/request'

const getAll = () => {
  return request({
    url: 'event/all',
    method: 'get'
  })
}

const getOne = eventId => {
  return request({
    url: 'event/' + eventId,
    method: 'get'
  })
}

const update = (eventId, data) => {
  return request({
    url: 'event/update/' + eventId,
    method: 'post',
    data
  })
}

export default { getAll, getOne, update }