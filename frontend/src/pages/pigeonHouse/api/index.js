import request from '../../../utils/request'

const getRankData = () => {
  return request({
    url: 'rank',
    method: 'get'
  })
}

const getHouses = () => {
  return request({
    url: 'event/houses',
    method: 'get'
  })
}

export default { getRankData, getHouses }