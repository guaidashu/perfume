import axios from 'axios'
//请求接口
export const cartList = () => {
    return axios.request({url: '/users/cartList', method: 'post'})
}

export const delCart = (post) => {
    return axios.request({url: '/users/cartDel', method: 'post', data: post})
}

export const cartEdit = (post) => {
    return axios.request({url: '/users/cartEdit', method: 'post', data: post})
}

export const editCheckAll = (post) => {
    return axios.request({url: '/users/editCheckAll', method: 'post', data: post})
}

export const getAddressList = () => {
    return axios.request({url: '/users/addressList', method: 'post'})
}

export const setDefaultAddress = (post) => {
    return axios.request({url: '/users/setDefaultAddress', method: 'post', data: post})
}

export const delAddress = (post) => {
    return axios.request({url: '/users/delAddress', method: 'post', data: post})
}

export const payMent = (post) => {
    return axios.request({url: '/users/payMent', method: 'post', data: post})
}

export const addNewAddress = (post) => {
    return axios.request({url: '/users/addNewAddress', method: 'post', data: post})
}

export const getUserInfo = () => {
    return axios.request({url: '/users/getUserInfo', method: 'post'})
}
