<template>
  <q-page padding>
    <q-form class="row q-gutter-lg">
      <q-input filled v-model="tag.Name" label="标签名">
      </q-input>
      <q-space/>
      <div class="row items-center">
        <q-btn label="保存" type="submit" color="primary" @click="saveTag"/>
      </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      tag: {
        Name: ''
      }
    }
  },
  created () {
    this.getTag()
  },
  methods: {
    getTag () {
      this.$axios.get('/user-tag').then(data => {
        data = data.data
        if (data && data.Data) {
          this.tag = data.Data
        }
      })
    },
    saveTag () {
      this.$axios.put('/user-tag', this.tag).then(data => {
        data = data.data
        if (data.Message) {
          this.$q.notify(data.Message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
