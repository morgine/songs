<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          ADMIN CONSOLE
        </q-toolbar-title>

        <q-space/>
        <q-space/>

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <!--          <q-btn v-if="$q.screen.gt.xs" dense flat round size="sm" icon="notifications"/>-->
          <!--          <q-btn v-if="$q.screen.gt.xs" dense flat>-->
          <!--            <div class="row items-center no-wrap">-->
          <!--              <q-icon name="add" size="20px"/>-->
          <!--              <q-icon name="arrow_drop_down" size="16px" style="margin-left: -2px"/>-->
          <!--            </div>-->
          <!--            <q-menu auto-close>-->
          <!--              <q-list dense style="min-width: 100px">-->
          <!--                <q-item clickable class="GL__menu-link">-->
          <!--                  <q-item-section>New repository</q-item-section>-->
          <!--                </q-item>-->
          <!--                <q-item clickable class="GL__menu-link">-->
          <!--                  <q-item-section>Import repository</q-item-section>-->
          <!--                </q-item>-->
          <!--                <q-item clickable class="GL__menu-link">-->
          <!--                  <q-item-section>New gist</q-item-section>-->
          <!--                </q-item>-->
          <!--                <q-item clickable class="GL__menu-link">-->
          <!--                  <q-item-section>New organization</q-item-section>-->
          <!--                </q-item>-->
          <!--                <q-separator/>-->
          <!--                <q-item-label header>This repository</q-item-label>-->
          <!--                <q-item clickable class="GL__menu-link">-->
          <!--                  <q-item-section>New issue</q-item-section>-->
          <!--                </q-item>-->
          <!--              </q-list>-->
          <!--            </q-menu>-->
          <!--          </q-btn>-->

          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg">
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px"/>

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>已登陆 <strong>{{ admin.Username }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator/>
                <!--                <q-item clickable class="GL__menu-link-status">-->
                <!--                  <q-item-section>-->
                <!--                    <div>-->
                <!--                      <q-icon name="tag_faces" color="blue-9" size="18px"/>-->
                <!--                      Set your status-->
                <!--                    </div>-->
                <!--                  </q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-separator/>-->
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Your profile</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Your repositories</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Your projects</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Your stars</q-item-section>-->
                <!--                </q-item>-->
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Your gists</q-item-section>-->
                <!--                </q-item>-->
                <q-separator/>
                <!--                <q-item clickable class="GL__menu-link">-->
                <!--                  <q-item-section>Help</q-item-section>-->
                <!--                </q-item>-->
                <q-item clickable class="GL__menu-link">
                  <q-item-section @click="$router.push('/settings')">设 置</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link">
                  <q-item-section @click="logout">退 出</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list bordered padding class="rounded-borders text-primary">
        <q-item
          clickable
          v-ripple
          :active="link === 'dashboard'"
          @click="link = 'dashboard'"
          active-class="my-menu-link"
          to="/dashboard"
        >
          <q-item-section avatar>
            <q-icon name="inbox"/>
          </q-item-section>

          <q-item-section>仪表板</q-item-section>
        </q-item>

        <q-item
          clickable
          v-ripple
          :active="link === 'apps'"
          @click="link = 'apps'"
          active-class="my-menu-link"
          to="/apps"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>

          <q-item-section>公众号列表</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'user-tag'"
          @click="link = 'user-tag'"
          active-class="my-menu-link"
          to="/user-tag"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>

          <q-item-section>关注标签</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'statistics'"
          @click="link = 'statistics'"
          active-class="my-menu-link"
          to="/statistics"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>

          <q-item-section>数据统计</q-item-section>
        </q-item>
<!--        <q-item-->
<!--          clickable-->
<!--          v-ripple-->
<!--          :active="link === 'advert'"-->
<!--          @click="link = 'advert'"-->
<!--          active-class="my-menu-link"-->
<!--          to="/advert"-->
<!--        >-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="send"/>-->
<!--          </q-item-section>-->

<!--          <q-item-section>广告统计</q-item-section>-->
<!--        </q-item>-->
<!--        <q-item-->
<!--          clickable-->
<!--          v-ripple-->
<!--          :active="link === 'pictures'"-->
<!--          @click="link = 'pictures'"-->
<!--          active-class="my-menu-link"-->
<!--          to="/pictures"-->
<!--        >-->
<!--          <q-item-section avatar>-->
<!--            <q-icon name="send"/>-->
<!--          </q-item-section>-->
<!--          <q-item-section>图片管理</q-item-section>-->
<!--        </q-item>-->
        <q-item
          clickable
          v-ripple
          :active="link === 'subscribes'"
          @click="link = 'subscribes'"
          active-class="my-menu-link"
          to="/subscribes"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>
          <q-item-section>关注回复</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'menus'"
          @click="link = 'menus'"
          active-class="my-menu-link"
          to="/menus"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>
          <q-item-section>公众号菜单</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'app-groups'"
          @click="link = 'app-groups'"
          active-class="my-menu-link"
          to="/app-groups"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>
          <q-item-section>公众号分组</q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          :active="link === 'subscribe-msgs'"
          @click="link = 'subscribe-msgs'"
          active-class="my-menu-link"
          to="/subscribe-msgs"
        >
          <q-item-section avatar>
            <q-icon name="send"/>
          </q-item-section>
          <q-item-section>关注回复模板</q-item-section>
        </q-item>
        <!--        <q-item-->
        <!--          clickable-->
        <!--          v-ripple-->
        <!--          :active="link === 'trash'"-->
        <!--          @click="link = 'trash'"-->
        <!--          active-class="my-menu-link"-->
        <!--        >-->
        <!--          <q-item-section avatar>-->
        <!--            <q-icon name="delete"/>-->
        <!--          </q-item-section>-->

        <!--          <q-item-section>Trash</q-item-section>-->
        <!--        </q-item>-->

        <!--        <q-separator spaced/>-->

        <!--        <q-item-->
        <!--          clickable-->
        <!--          v-ripple-->
        <!--          :active="link === 'settings'"-->
        <!--          @click="link = 'settings'"-->
        <!--          active-class="my-menu-link"-->
        <!--        >-->
        <!--          <q-item-section avatar>-->
        <!--            <q-icon name="settings"/>-->
        <!--          </q-item-section>-->

        <!--          <q-item-section>Settings</q-item-section>-->
        <!--        </q-item>-->

        <!--        <q-item-->
        <!--          clickable-->
        <!--          v-ripple-->
        <!--          :active="link === 'help'"-->
        <!--          @click="link = 'help'"-->
        <!--          active-class="my-menu-link"-->
        <!--        >-->
        <!--          <q-item-section avatar>-->
        <!--            <q-icon name="help"/>-->
        <!--          </q-item-section>-->

        <!--          <q-item-section>Help</q-item-section>-->
        <!--        </q-item>-->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      link: 'dashboard',
      admin: {
        Username: ''
      }
    }
  },
  created () {
    this.$axios.get('/info').then(data => {
      data = data.data
      if (data && data.Data) {
        this.admin = data.Data
      } else {
        this.$router.push('/login')
      }
    }).catch(() => {
      this.$router.push('/login')
    })
  },
  methods: {
    logout () {
      this.$axios.get('/logout').then(_ => {
        localStorage.removeItem('Authorization')
        this.$router.push('/login')
      }).catch(() => {
        localStorage.removeItem('Authorization')
        this.$router.push('/login')
      })
    }
  }
}
</script>
<style lang="sass">
.my-menu-link
  color: white
  background: #0073ff
</style>
