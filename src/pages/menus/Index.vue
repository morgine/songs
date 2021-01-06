<template>
  <q-page padding>
    <div class="row items-center q-gutter-lg">
      <q-select v-model="activeMenu" :options="menus" option-label="name" option-value="index" label="选择菜单组"
                style="min-width: 120px"></q-select>
      <q-btn color="primary" label="添加菜单组" @click="appendMenu"/>
      <q-select
        v-model="selectedApps"
        :options="appOptions"
        option-label="NickName"
        option-value="Appid"
        label="选择公众号"
        style="min-width: 360px"
        clearable
        use-input
        input-debounce="0"
        @filter="filterFn"
        multiple
      ></q-select>
      <q-btn color="primary" label="生成公众号菜单"
             :disable="!(activeMenu && activeMenu.buttons.length > 0 && selectedApps && selectedApps.length > 0)" @click="genAppMenu"/>
      <q-btn color="primary" label="删除公众号菜单" :disable="!(selectedApps && selectedApps.length > 0)" @click="delAppMenu"/>
    </div>
    <q-card v-if="activeMenu" class="q-mt-lg">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6 cursor-pointer">
            {{ activeMenu.name }}
            <q-icon name="edit"/>
            <q-popup-edit v-model="activeMenu.name">
              <template v-slot="{ set, cancel }">
                <q-input v-model="activeMenu.name" autofocus dense>
                  <template v-slot:after>
                    <q-btn flat dense color="negative" icon="cancel" @click.stop="cancel"/>
                    <q-btn flat dense color="positive" icon="check_circle" @click.stop="set"/>
                  </template>
                </q-input>
              </template>
            </q-popup-edit>
          </div>
          <q-btn v-if="menus.length > 1" flat dense color="primary" label="删除菜单组"
                 @click="confirmDeleteMenu(activeMenu)"/>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <div class="col-4">
            <div class="mobile_menu_preview">
              <div class="menu-btn-group">
                <q-btn-group outline spread>
                  <!--                         :color="activeMainBtnIndex === idx?'teal':''"-->
                  <q-btn v-for="(btn, idx) in activeMenu.buttons"
                         :key="idx"
                         outline
                         :label="btn.name"
                         :color="activeMainBtnIndex === idx && activeSubBtnIndex === ''?'teal':''"
                         @click="clickMainBtn(btn, idx)"
                  >
                    <q-menu
                      persistent
                      :value="activeMainBtnIndex === idx"
                      no-parent-event
                      ref="menus"
                      fit
                      anchor="top left"
                      self="bottom left"
                    >
                      <q-item
                        v-for="(subBtn, subIdx) in btn.sub_button"
                        :key="`${idx}-${subIdx}`"
                        clickable
                        @click="clickSubBtn(subBtn, subIdx)"
                      >
                        <q-item-section>
                          <q-item-label :class="activeSubBtnIndex === subIdx?'text-teal':''">
                            {{ subBtn.name }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item v-if="!btn.sub_button || btn.sub_button.length<5" clickable
                              @click.stop="appendSubButton(btn)">
                        <q-item-section class="text-center">
                          <q-icon class="full-width" name="add"/>
                        </q-item-section>
                      </q-item>
                    </q-menu>
                  </q-btn>
                  <q-btn v-show="activeMenu && activeMenu.buttons &&  activeMenu.buttons.length <3"
                         icon="add"
                         outline
                         @click.stop="appendMainButton()"
                  />
                </q-btn-group>
              </div>
            </div>
          </div>
          <div class="col-8">
            <q-card v-if="activeBtn">
              <q-card-section>
                <div class="row justify-between items-center">
                  <q-input :label="activeSubBtnIndex !== ''? '子菜单名称':'菜单名称'" v-model="activeBtn.name" dense/>
                  <q-btn flat dense color="primary" :label="activeSubBtnIndex !== ''? '删除子菜单':'删除菜单'"
                         @click="confirmDeleteBtn(activeMainBtnIndex, activeSubBtnIndex)"/>
                </div>
              </q-card-section>
              <q-separator spaced=""/>
              <q-card-section v-if="!activeBtn.sub_button || activeBtn.sub_button.length === 0">
                <q-option-group
                  v-model="activeBtn.type"
                  inline
                  :options="types"
                />
                <q-tab-panels v-model="activeBtn.type" animated class="rounded-borders">
                  <q-tab-panel name="view">
                    <q-input v-model="activeBtn.url" label="页面地址"/>
                  </q-tab-panel>
                  <q-tab-panel name="media_id">
                    <q-input v-model="activeBtn.media_id" label="媒体 ID"/>
                  </q-tab-panel>
                  <q-tab-panel name="click">
                    <q-input v-model="activeBtn.key" label="触发 key"/>
                  </q-tab-panel>

                  <q-tab-panel name="miniprogram">
                    <q-form>
                      <q-input label="小程序 APPID" v-model="activeBtn.appid"/>
                      <q-input label="小程序地址" v-model="activeBtn.pagepath"/>
                      <q-input label="备用网页" v-model="activeBtn.url" hint="旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页。"/>
                    </q-form>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card-section>
              <q-card-section v-else>
                <div class="text-subtitle2 text-grey-7">已添加子菜单，仅可设置菜单名称。</div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn color="primary" @click="save()">保 存</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      menus: [
        {
          name: '',
          index: 0,
          buttons: [
            {
              name: '',
              type: '',
              sub_button: [],
              url: '',
              key: '',
              appid: '',
              pagepath: '',
              media_id: ''
            }
          ]
        }
      ],
      activeMenu: null,
      activeBtnIndex: '',
      activeMainBtnIndex: '',
      activeSubBtnIndex: '',
      activeBtn: null,
      types: [
        {
          label: '网页类型',
          value: 'view'
        },
        {
          label: '媒体类型',
          value: 'media_id'
        },
        {
          label: '事件类型',
          value: 'click'
        },
        {
          label: '小程序类型',
          value: 'miniprogram'
        }
      ],
      apps: [
        {
          Appid: '',
          NickName: ''
        }
      ],
      appOptions: [],
      selectedApps: []
    }
  },
  watch: {
    activeMenu (ov, nv) {
      if (!ov || !nv || ov.index !== nv.index) {
        this.activeMainBtnIndex = ''
        this.activeSubBtnIndex = ''
        this.activeBtn = null
      }
    }
  },
  created () {
    this.$axios.get('/menus').then(data => {
      data = data.data
      if (data && data.Data) {
        const menus = data.Data
        for (let i = 0; i < menus.length; i++) {
          menus[i].index = i
          if (!menus[i].buttons) {
            menus[i].buttons = []
          }
          for (let j = 0; j < menus[i].buttons.length; j++) {
            if (!menus[i].buttons[j].sub_button) {
              menus[i].buttons[j].sub_button = []
            }
          }
        }
        this.menus = menus
      }
    })
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
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.appOptions = this.apps

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        this.appOptions = this.apps.filter(v => v.NickName.indexOf(val) > -1)
      })
    },
    appendMenu () {
      const menu = {
        name: '新建菜单组',
        index: this.menus.length,
        buttons: []
      }
      menu.name += menu.index
      this.menus.push(menu)
      this.activeMenu = menu
    },
    confirmDeleteMenu (menu) {
      this.$q.dialog({
        title: '确认删除？',
        message: `菜单组：${menu.name}`,
        cancel: true
      }).onOk(() => {
        this.deleteMenu(menu)
      })
    },
    deleteMenu (menu) {
      for (let idx = 0; idx < this.menus.length; idx++) {
        const opt = this.menus[idx]
        if (opt.index === menu.index) {
          this.menus.splice(idx, 1)
          const activeIdx = idx - 1 >= 1 ? idx - 1 : 0
          this.activeMenu = this.menus[activeIdx]
          return
        }
      }
    },
    appendMainButton () {
      const btn = {
        name: '菜单名称',
        sub_button: []
      }
      if (!this.activeMenu.buttons) {
        this.activeMenu.buttons = []
      }
      this.activeMenu.buttons.push(btn)
    },
    appendSubButton (btn) {
      const subBtn = {
        name: '菜单名称',
        type: 'view'
      }
      if (!btn.sub_button) {
        btn.sub_button = []
      }
      btn.sub_button.push(subBtn)
      this.$nextTick(() => {
        this.$refs.menus.forEach(menu => {
          menu.updatePosition()
        })
      })
    },
    confirmDeleteBtn () {
      this.$q.dialog({
        title: '确认删除？',
        message: `菜单：${this.activeBtn.name}`,
        cancel: true
      }).onOk(() => {
        this.deleteBtn()
      })
    },
    deleteBtn () {
      if (this.activeSubBtnIndex !== '' && this.activeSubBtnIndex >= 0 && this.activeMainBtnIndex >= 0) {
        const mainBtn = this.activeMenu.buttons[this.activeMainBtnIndex]
        mainBtn.sub_button.splice(this.activeSubBtnIndex, 1)
        if (mainBtn.sub_button.length > 1) {
          this.activeSubBtnIndex = mainBtn.sub_button.length - 1
          this.activeBtn = mainBtn.buttons[this.activeSubBtnIndex]
        } else {
          this.activeSubBtnIndex = ''
          this.activeBtn = null
        }
        this.$nextTick(() => {
          this.$refs.menus.forEach(menu => {
            menu.updatePosition()
          })
        })
      } else if (this.activeMainBtnIndex >= 0) {
        this.activeMenu.buttons.splice(this.activeMainBtnIndex, 1)
        if (this.activeMenu.buttons.length >= 1) {
          this.activeMainBtnIndex = this.activeMenu.buttons.length - 1
          this.activeBtn = this.activeMenu.buttons[this.activeMainBtnIndex]
        } else {
          this.activeMainBtnIndex = ''
          this.activeBtn = null
        }
      }
    },
    clickMainBtn (btn, idx) {
      this.activeMainBtnIndex = idx
      this.activeSubBtnIndex = ''
      this.activeBtn = btn
    },
    clickSubBtn (btn, idx) {
      this.activeSubBtnIndex = idx
      this.activeBtn = btn
    },
    save () {
      this.$axios.put('/menus', this.menus).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    genAppMenu () {
      this.$q.dialog({
        title: '确认生成菜单？',
        cancel: true
      }).onOk(() => {
        const data = {
          Appids: [],
          Buttons: []
        }
        for (const app of this.selectedApps) {
          data.Appids.push(app.Appid)
        }
        for (const btn of this.activeMenu.buttons) {
          data.Buttons.push(btn)
        }
        this.$axios.post('/app-menu', data).then(data => {
          data = data.data
          if (data && data.Message) {
            this.$q.notify(data.Message)
          }
        })
      })
    },
    delAppMenu () {
      this.$q.dialog({
        title: '确认删除菜单？',
        cancel: true
      }).onOk(() => {
        const data = {
          Appids: []
        }
        for (const app of this.selectedApps) {
          data.Appids.push(app.Appid)
        }
        this.$axios.delete('/app-menu', { params: data }).then(data => {
          data = data.data
          if (data && data.Message) {
            this.$q.notify(data.Message)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.mobile_menu_preview {
  position: relative;
  width: 317px;
  height: 580px;
  background: transparent url('../../assets/images/bg_mobile_head_default.png') no-repeat 0 0;
  border: 1px solid #e7e7eb;
}

.menu-btn-group {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
