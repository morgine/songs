<template>
  <q-page padding>
    <div class="text-h4 q-mt-lg q-mb-lg">编辑&生成数据：</div>
    <div class="row items-center q-gutter-lg">
      <q-select v-model="selectedGroup" :options="groups" option-label="Name" option-value="ID" label="选择分组"
                style="min-width: 120px">
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-if="scope.opt.ID === 1">默认分组</q-item-label>
              <q-item-label v-else>{{ scope.opt.Name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-btn color="primary" label="添加分组" @click="appendGroup"/>
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
      <q-btn color="primary" label="生成数据"
             :loading="applying"
             :disable="(selectedGroup && selectedGroup.ID === 1) || (!selectedApps || selectedApps.length === 0)"
             @click="apply"/>
      <!--      <q-btn color="primary" label="移除关注回复" :disable="!(selectedApps && selectedApps.length > 0)" @click="reset"/>-->
    </div>
    <q-card v-if="selectedGroup" class="q-mt-lg">
      <q-card-section>
        <div  v-if="selectedGroup.ID === 1">
          <div class="text-h6">默认分组</div>
          <div class="text-caption">未生成数据的公众号将使用默认数据</div>
        </div>
        <div v-else class="row justify-between items-center">
          <div class="text-h6 cursor-pointer">
            {{ selectedGroup.Name }}
            <q-icon name="edit"/>
            <q-popup-edit v-model="selectedGroup.Name" title="编辑分组名称" buttons
                          @save="saveGroup({Name: $event, ID: selectedGroup.ID})">
              <q-input v-model="selectedGroup.Name" dense autofocus/>
            </q-popup-edit>
          </div>
          <div>
            <q-btn v-if="groups.length > 1" flat dense color="primary" label="删除分组"
                   @click="confirmDeleteGroup(selectedGroup.ID)"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-card flat>
          <q-card-section>
            <div class="text-h6">图文列表</div>
          </q-card-section>
          <q-card-section>
            <q-card flat v-for="(article, idx) in articles" :key="idx">
              <q-card-section>
                <a href="javascript: void(0)" @click="openDialog(`article-image-selector-${idx}`)">
                  <q-img
                    :src="`${$axios.defaults.baseURL}/picture/${article.PicFile}`"
                    :width="idx===0 && articles.length > 1?'300px':'120px'"
                    height="120px"
                    class="q-hoverable"
                  >
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center">
                        选择封面
                      </div>
                    </template>
                  </q-img>
                </a>
                <ImageSelector v-model="article.PicFile" :ref="`article-image-selector-${idx}`"></ImageSelector>
              </q-card-section>
              <q-card-section>
                <q-input label="标题" v-model="article.Title"/>
              </q-card-section>
              <q-card-section>
                <q-input label="描述" v-model="article.Description"/>
              </q-card-section>
              <q-card-section>
                <q-input label="地址" v-model="article.Url"/>
              </q-card-section>
              <q-card-actions align="around">
                <q-btn icon="remove" flat @click="delArticle(article.ID)"/>
                <q-btn icon="check" flat @click="saveArticle(article)"/>
              </q-card-actions>
            </q-card>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn v-if="articles.length < 8" icon="add" color="primary" flat
                   @click="createArticle({GroupID: selectedGroup.ID})"/>
          </q-card-actions>
        </q-card>
        <q-card flat>
          <q-card-section>
            <div class="text-h6">小程序卡片</div>
          </q-card-section>
          <q-card-section>
            <q-card flat v-for="(card, idx) in cards" :key="idx">
              <q-card-section>
                <a href="javascript: void(0)" @click="openDialog(`card-image-selector-${idx}`)">
                  <q-img
                    :src="`${$axios.defaults.baseURL}/picture/${card.ThumbMediaFilename}`"
                    width="100px"
                    height="120px"
                    class="q-hoverable"
                  >
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center">
                        选择封面
                      </div>
                    </template>
                  </q-img>
                </a>
                <ImageSelector v-model="card.ThumbMediaFilename" :ref="`card-image-selector-${idx}`"></ImageSelector>
              </q-card-section>
              <q-card-section>
                <q-input label="小程序标题" v-model="card.Title"/>
              </q-card-section>
              <q-card-section>
                <q-input label="小程序 appid" v-model="card.Appid" hint="小程序需要与公众号关联"/>
              </q-card-section>
              <q-card-section>
                <q-input label="小程序地址" v-model="card.PagePath"/>
              </q-card-section>
              <q-card-actions align="around">
                <q-btn icon="remove" flat @click="delCard(card.ID)"/>
                <q-btn icon="check" flat @click="saveCard(card)"/>
              </q-card-actions>
            </q-card>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn icon="add" v-if="cards.length < 8" flat color="primary"
                   @click="createCard({GroupID: selectedGroup.ID})"/>
          </q-card-actions>
        </q-card>
      </q-card-section>
    </q-card>
    <div class="text-h4 q-mt-xl q-mb-lg">已生成数据的公众号列表：</div>
    <q-card flat>
      <q-card-section>
        <q-select v-model="selectedAppliedApp" :options="appliedApps" option-value="Appid" label="已生成数据的公众号"
                  style="min-width: 120px">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section>
                <q-item-label>{{ getAppName(scope.opt.Appid) }} - {{ scope.opt.GroupName }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-section v-if="selectedAppliedApp">

        <div class="row justify-between items-center">
          <div class="text-h6">
            {{ getAppName(selectedAppliedApp.Appid) }} - {{ selectedAppliedApp.GroupName }}
          </div>
          <div>
            <q-btn flat dense color="primary" label="删除数据"
                   @click="cancel(selectedGroup.ID)"/>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import ImageSelector from 'components/ImageSelector'

export default {
  name: 'Index',
  components: {
    ImageSelector
  },
  data () {
    return {
      groups: [],
      selectedGroup: null,
      articles: [],
      cards: [],
      applying: false,
      apps: [
        {
          Appid: '',
          NickName: ''
        }
      ],
      appOptions: [],
      selectedApps: [],
      appliedApps: [],
      selectedAppliedApp: null
    }
  },
  watch: {
    selectedGroup () {
      this.getArticles()
      this.getCards()
    }
  },
  created () {
    this.$axios.get('/subscribe/msg/groups').then(data => {
      data = data.data
      if (data && data.Data) {
        data = data.Data
        if (data.length > 0) {
          this.groups = data
          // this.selectedGroup = data[0]
        }
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
    this.getAppliedApps()
  },
  methods: {
    getAppName (appid) {
      for (const app of this.apps) {
        if (app.Appid === appid) {
          return app.NickName
        }
      }
      return appid + ' 已删除的公众号？'
    },
    getAppliedApps () {
      this.$axios.get('/subscribe/msg/group/applied-apps').then(data => {
        data = data.data
        if (data && data.Data) {
          this.appliedApps = data.Data
        }
      })
    },
    openDialog (ref) {
      this.$refs[ref][0].openDialog()
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.appOptions = this.apps.filter(v => {
            for (const appliedApp of this.appliedApps) {
              if (appliedApp.Appid === v.Appid) {
                return false
              }
            }
            return true
          })

          // with Quasar v1.7.4+
          // here you have access to "ref" which
          // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        this.appOptions = this.apps.filter(v => {
          for (const appliedApp of this.appliedApps) {
            if (appliedApp.Appid === v.Appid) {
              return false
            }
          }
          return v.NickName.indexOf(val) > -1
        })
      })
    },
    appendGroup () {
      const group = {
        Name: '新建分组',
        IsDefault: '',
        ID: 0
      }
      this.$axios.put('/subscribe/msg/group', group).then(data => {
        data = data.data
        if (data && data.Data) {
          this.groups.push(data.Data)
          this.selectedGroup = data.Data
        }
      })
    },
    apply () {
      this.applying = true
      const params = {
        GroupID: this.selectedGroup.ID,
        Appids: []
      }
      for (const app of this.selectedApps) {
        params.Appids.push(app.Appid)
      }
      this.$axios.post('/subscribe/msg/group/apply', params).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
        this.applying = false
      }).catch(() => {
        this.applying = false
      })
    },
    cancel () {
      this.$axios.delete('/subscribe/msg/group/cancel', { params: { Appids: [this.selectedAppliedApp.Appid] } }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          for (let i = 0; i < this.appliedApps.length; i++) {
            if (this.appliedApps[i].Appid === this.selectedAppliedApp.Appid) {
              this.appliedApps.splice(i, 1)
              if (i > 1) {
                this.selectedAppliedApp = this.appliedApps[i - 1]
              }
            }
          }
        }
      })
    },
    saveGroup (group) {
      this.$axios.put('/subscribe/msg/group', group).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    confirmDeleteGroup (group) {
      this.$q.dialog({
        title: '确认删除？',
        message: `菜单组：${group.Name}`,
        cancel: true
      }).onOk(() => {
        this.deleteGroup(group)
      })
    },
    deleteGroup (group) {
      this.$axios.delete('/subscribe/msg/group', { params: { ID: group.ID } }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].ID === group.ID) {
              this.groups.splice(i, 1)
              break
            }
          }
        }
      })
    },
    getArticles () {
      if (this.selectedGroup && this.selectedGroup.ID > 0) {
        this.$axios.get('/subscribe/msg/group/articles', { params: { GroupID: this.selectedGroup.ID } }).then(data => {
          data = data.data
          if (data && data.Data) {
            this.articles = data.Data
          }
        })
      }
    },
    createArticle (article) {
      this.$axios.put('/subscribe/msg/group/article', article).then(data => {
        data = data.data
        if (data && data.Data) {
          this.articles.push(data.Data)
        }
      })
    },
    saveArticle (article) {
      this.$axios.put('/subscribe/msg/group/article', article).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    delArticle (id) {
      this.$axios.delete('/subscribe/msg/group/article', { params: { ID: id } }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          for (let i = 0; i < this.articles.length; i++) {
            if (this.articles[i].ID === id) {
              this.articles.splice(i, 1)
              break
            }
          }
        }
      })
    },

    getCards () {
      if (this.selectedGroup && this.selectedGroup.ID > 0) {
        this.$axios.get('/subscribe/msg/group/mini-program-cards', { params: { GroupID: this.selectedGroup.ID } }).then(data => {
          data = data.data
          if (data && data.Data) {
            this.cards = data.Data
          }
        })
      }
    },
    createCard (card) {
      this.$axios.put('/subscribe/msg/group/mini-program-card', card).then(data => {
        data = data.data
        if (data && data.Data) {
          this.cards.push(data.Data)
        }
      })
    },
    saveCard (card) {
      this.$axios.put('/subscribe/msg/group/mini-program-card', card).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    delCard (id) {
      this.$axios.delete('/subscribe/msg/group/mini-program-card', { params: { ID: id } }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].ID === id) {
              this.cards.splice(i, 1)
              break
            }
          }
        }
      })
    }
  }
}
</script>
