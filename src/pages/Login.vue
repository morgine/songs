<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#9e92d7, #685c99);"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:400px;height:400px;">
          <q-card-section class="bg-deep-purple-7">
            <h4 class="text-h5 text-white q-my-md">登陆管理后台</h4>
            <div class="absolute-bottom-right q-pr-md" style="transform: translateY(50%);">
              <!--                  <q-btn fab icon="add" color="purple-4" />-->
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input square v-model="form.Username" type="email" label="用户名">
                <template v-slot:prepend>
                  <q-icon name="account_box"/>
                </template>
              </q-input>
              <q-input square v-model="form.Password" :type="isPwd ? 'password' : 'text'" label="密码">
                <template v-slot:prepend>
                  <q-icon name="lock"/>
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated size="lg" color="purple-4" class="full-width text-white" label="登陆" @click="login"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      form: {
        Username: '',
        Password: ''
      }
    }
  },
  methods: {
    login () {
      this.$axios.post('/login', this.form).then(data => {
        data = data.data
        if (data && data.Data) {
          const token = data.Data
          localStorage.setItem('Authorization', token)
          this.$axios.defaults.headers.common.Authorization = token
          this.$router.replace('/main')
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
</script>

<style>
</style>
