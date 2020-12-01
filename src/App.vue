<template>
  <div id="q-app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
    const token = localStorage.getItem('Authorization')
    if (token) {
      this.$axios.defaults.headers.common.Authorization = token
    }
  }
}
</script>
