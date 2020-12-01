<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
import Qs from 'qs'
export default {
  name: 'App',
  created () {
    this.$axios({
      baseURL: process.env.API,
      paramsSerializer (params) {
        return Qs.stringify(params, { indices: false })
      }
    })
    const token = localStorage.getItem('Authorization')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = token
    }
  }
}
</script>
