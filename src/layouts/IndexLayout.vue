<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-btn round flat to="/">
            <q-avatar>
              <img
                alt="小樱桃"
                src="~assets/logo.png"
              >
            </q-avatar>
          </q-btn>
          <q-btn flat to="/">
            小樱桃PASS平台
          </q-btn>
        </q-toolbar-title>
        <q-space/>
        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn flat label="登陆平台" to="/login"></q-btn>
          <q-btn label="去注册" rounded to="/register"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <q-footer style="background-color: #454545; color: #c3c3c3; padding: 50px">
      <div class="row q-gutter-lg">
        <div class="col-4">
          <div class="text-h6">联系我们</div>
          <div class="text-subtitle2">联系人：文先生</div>
          <div class="text-subtitle2">电话：18883333258</div>
        </div>
        <div class="col-6">
          <div class="text-h6">重庆沃江科技有限公司</div>
          <div class="text-subtitle2">© {{ host }}</div>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      host: window.location.host
    }
  }
}
</script>
