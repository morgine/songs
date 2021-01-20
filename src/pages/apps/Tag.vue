<template>
  <q-page padding>
    <q-form class="row q-gutter-lg items-center">
      <q-input filled v-model="tag.Name" label="标签名"/>
      <q-btn label="保存" color="primary" @click="saveTag"/>
      <q-select :options="apps" v-model="selectApp" option-value="Appid" option-label="NickName" label="选择公众号"
                style="min-width: 120px"/>
      <q-btn label="应用到所有用户" :loading="loading" color="primary" :disable="!selectApp" @click="setAppTag"/>
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
      },
      apps: [],
      selectApp: null,
      loading: false
    }
  },
  created () {
    this.getTag()
    const params = {
      Limit: 2000,
      Offset: 0,
      Column: 'id',
      Desc: true,
      Selects: ['appid', 'nick_name']
    }
    this.$axios.get('/apps', { params: params }).then(data => {
      data = data.data
      if (data && data.Data) {
        this.apps = data.Data
      }
    })
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
    },
    setAppTag () {
      this.loading = true
      this.$axios.post('/set-app-user-tag', { Appid: this.selectApp.Appid }).then(data => {
        data = data.data
        if (data.Message) {
          this.$q.notify(data.Message)
          this.selectApp = null
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
