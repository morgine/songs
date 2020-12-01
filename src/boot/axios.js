import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'

const $axios = axios.create({
  baseURL: process.env.API,
  paramsSerializer (params) {
    return Qs.stringify(params, { indices: false })
  }
})

const token = localStorage.getItem('Authorization')
if (token) {
  $axios.defaults.headers.common.Authorization = token
}

Vue.prototype.$axios = $axios
