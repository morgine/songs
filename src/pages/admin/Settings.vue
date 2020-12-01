<template>
  <q-page class="flex q-pa-lg">
    <q-card class="full-width" flat>
      <q-card-section>
        <div class="text-h6">修改密码</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="password.NewPassword" label="请输入新密码" type="password"/>
      </q-card-section>
      <q-card-section>
        <q-input v-model="password.ConfirmPassword" label="请再次输入新密码" type="password"/>
      </q-card-section>
      <q-separator/>

      <q-card-actions align="right">
        <q-btn flat @click="savePassword">保 存</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Settings',
  data () {
    return {
      password: {
        NewPassword: '',
        ConfirmPassword: ''
      }
    }
  },
  methods: {
    savePassword () {
      if (this.password.NewPassword !== this.password.ConfirmPassword) {
        this.$q.notify({
          position: 'top-right',
          message: '两次密码不一致！'
        })
      } else {
        this.$axios.put('/reset', this.password).then(data => {
          data = data.data
          if (data && data.Data) {
            const token = data.Data
            localStorage.setItem('Authorization', token)
            this.$axios.defaults.headers.common.Authorization = token
            // this.$router.replace('/')
            this.$q.notify({
              type: 'success',
              position: 'top-right',
              message: '密码已更新！'
            })
          } else {
            this.$q.notify({
              position: 'top-right',
              message: data.Message
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
