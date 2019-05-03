import axios from 'axios'

export const getGoodsList = (params) => {
  return axios.request({url: "/goods", method: 'get', params: params})
}

export const addCart = (post) => {
  return axios.request({url: '/goods/addCart', method: 'post', data: post})
}
