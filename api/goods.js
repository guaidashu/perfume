import axios from 'axios'
//请求接口
export const getGoodsList = (params) => {
    return axios.request({url: "/goods/list", method: 'get', params: params})
}

export const addCart = (post12121) => {
    return axios.request({url: '/goods/addCart', method: 'post', data: post12121})
}

export const getTypeData = () => {
    return axios.request({url: '/goods/getTypeAllData', method: 'post'})
}

export const getGoodsInfo = (post) => {
    return axios.request({url: '/goods/getGoodsInfo', method: 'post', data: post})
}

export const getOrderInfo = (post) => {
    return axios.request({url: '/goods/getOrderInfo', method: 'post', data: post})
}