<template>
  <q-page padding>
    <div class="row q-gutter-lg items-center">
      <q-input filled v-model="date">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="date" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn label="获取" @click="getEvents" :loading="loading"></q-btn>
    </div>
    <q-table
      title="总和"
      :data="sums"
      :columns="sumsColumns"
      align="center"
      :loading="loading"
      class="q-mt-xl">
      <template v-slot:bottom></template>
    </q-table>
    <q-table
      title="详细数据"
      :data="evtApps"
      :columns="columns"
      :loading="loading"
      row-key="Appid"
      class="q-mt-xl">
      <template v-slot:body-cell-Manager="props">
        <q-td class="text-right">
          {{ props.row.Manager ? props.row.Manager : '点击设置' }}
          <q-popup-edit v-model="props.row.Manager" title="设置管理员" buttons
                        @save="saveAppManager($event, props.row.Appid)">
            <q-input v-model="props.row.Manager" dense autofocus/>
          </q-popup-edit>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { date } from 'quasar'

const start = Date.now() - (1000 * 60 * 60 * 24)
// const oneDateTime = 1000 * 60 * 60 * 24
// const end = start + oneDateTime

export default {
  name: 'Event',
  data () {
    return {
      events: [],
      start: start,
      // end: end,
      apps: [],
      sums: [],
      sumsColumns: [
        {
          name: 'AppNum',
          label: '已发送公众号数量',
          field: 'AppNum',
          align: 'center'
        },
        {
          name: 'TotalCount',
          label: '标签下的粉丝数',
          field: 'TotalCount',
          align: 'center'
        },
        {
          name: 'FilterCount',
          label: '发送消息的粉丝数',
          field: 'FilterCount',
          align: 'center'
        },
        {
          name: 'SentCount',
          label: '发送成功粉丝数',
          field: 'SentCount',
          align: 'center'
        }
      ],
      evtApps: [],
      columns: [
        {
          name: 'NickName',
          label: '公众号',
          field: 'NickName'
        },
        {
          name: 'Manager',
          label: '管理员',
          field: 'Manager'
        },
        {
          name: 'Status',
          label: '状态',
          field: 'Status'
        },
        {
          name: 'TotalCount',
          label: '标签下的粉丝数',
          field: 'TotalCount',
          sortable: true
        },
        {
          name: 'FilterCount',
          label: '发送消息的粉丝数',
          field: 'FilterCount',
          sortable: true
        },
        {
          name: 'SentCount',
          label: '发送成功粉丝数',
          field: 'SentCount',
          sortable: true
        }
      ],
      loading: false
    }
  },
  computed: {
    date: {
      get () {
        return date.formatDate(this.start, 'YYYY-MM-DD')
      },
      set (val) {
        this.start = date.extractDate(val, 'YYYY-MM-DD')
      }
    }
  },
  created () {
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
        const apps = data.Data
        this.$axios.get('/apps-manager').then(data => {
          data = data.data
          if (data && data.Data) {
            const managers = data.Data
            for (const manager of managers) {
              for (const app of apps) {
                if (manager.Appid === app.Appid) {
                  app.Manager = manager.Manager
                  break
                }
              }
            }
          }
          this.apps = apps
        })
      }
    })
  },
  methods: {
    getEvents () {
      this.loading = true
      this.evtApps = []
      this.sums = []
      const start = Math.ceil(date.startOfDate(this.start, 'day') / 1000)
      this.$axios.get('/app-group-msg-result', {
        params: {
          Start: start,
          End: start + 3600 * 24
        }
      }).then(data => {
        data = data.data
        if (data && data.Data) {
          const evtApps = []
          const sum = {
            AppNum: 0,
            TotalCount: 0,
            FilterCount: 0,
            SentCount: 0
          }
          for (const app of this.apps) {
            const appEvt = {
              Appid: app.Appid,
              NickName: app.NickName,
              Manager: app.Manager,
              Status: '',
              // tag_id下粉丝数；或者openid_list中的粉丝数
              TotalCount: 0,
              // 过滤（过滤是指特定地区、性别的过滤、用户设置拒收的过滤，用户接收已超4条的过滤）后，
              // 准备发送的粉丝数，原则上，FilterCount = SentCount + ErrorCount
              FilterCount: 0,
              // 发送成功的粉丝数
              SentCount: 0,
              // 发送失败的粉丝数
              ErrorCount: 0
            }
            for (const evt of data.Data) {
              if (evt.Appid === app.Appid) {
                appEvt.Status = evt.Status === 'send success' ? '成功' : evt.Status
                appEvt.TotalCount = evt.TotalCount
                appEvt.FilterCount = evt.FilterCount
                appEvt.SentCount = evt.SentCount
                appEvt.ErrorCount = evt.ErrorCount
                sum.AppNum++
                sum.TotalCount += evt.TotalCount
                sum.FilterCount += evt.FilterCount
                sum.SentCount += evt.SentCount
                break
              }
            }
            evtApps.push(appEvt)
          }
          this.evtApps = evtApps
          this.sums.push(sum)
        }
        this.loading = false
      })
    },
    saveAppManager (value, appid) {
      this.$axios.post('/app-manager', {
        Appid: appid,
        Manager: value
      }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
