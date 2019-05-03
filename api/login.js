import axios from 'axios'

export const login = (post) => {
  return axios({url: '/users/login', method: 'post', data: post})
}
