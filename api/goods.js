import axios from 'axios'

export const getGoodsList = () => {
  return axios.request({url: "/goods", method: 'get'})
}
