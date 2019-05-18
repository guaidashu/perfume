import axios from 'axios'

export const getGoodsList = (params) => {
    return axios.request({url: "/goods/list", method: 'get', params: params})
}

export const addCart = (post) => {
    return axios.request({url: '/goods/addCart', method: 'post', data: post})
}

export const getTypeData = () => {
    return axios.request({url: '/goods/getTypeAllData', method: 'post'})
}
