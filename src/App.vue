<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    this.$axios.defaults.baseURL = 'http://localhost:9879'
    const token = localStorage.getItem('Authorization')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = token
    }
  }
}
</script>
