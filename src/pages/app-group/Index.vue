<template>
  <div>
    <app-groups v-model="appids"></app-groups>
    selected appids: {{appids}}
  </div>
</template>

<script>
import AppGroups from 'components/AppGroups'
export default {
  name: 'Index',
  components: {
    AppGroups
  },
  data () {
    return {
      appids: []
    }
  }
}
</script>

<style scoped>

</style>
