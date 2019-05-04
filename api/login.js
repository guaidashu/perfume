import axios from 'axios'

export const login = (post) => {
    return axios({url: '/users/login', method: 'post', data: post})
}

export const logout = () => {
    return axios({url: '/users/logout', method: 'post'})
}

export const checkLogin = () => {
    return axios({url: '/users/checkLogin', method: 'post'})
}
