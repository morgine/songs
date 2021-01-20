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
      <q-btn label="获取" @click="getEvents"></q-btn>
    </div>
    <q-table :data="evtApps"
             :columns="columns"
             row-key="Appid"
             class="q-mt-xl"/>
  </q-page>
</template>

<script>
import { date } from 'quasar'

const start = Date.now()
const oneDateTime = 1000 * 60 * 60 * 24
const end = start + oneDateTime

export default {
  name: 'Event',
  data () {
    return {
      events: [],
      start: start,
      end: end,
      apps: [],
      evtApps: [],
      columns: [
        {
          name: 'NickName',
          label: '公众号',
          field: 'NickName'
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
          label: '接收到消息的粉丝数',
          field: 'FilterCount',
          sortable: true
        },
        {
          name: 'SentCount',
          label: '总发送粉丝数',
          field: 'SentCount',
          sortable: true
        },
        {
          name: 'ErrorCount',
          label: '发送失败粉丝数',
          field: 'ErrorCount',
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
        this.end = this.start + oneDateTime
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
        this.apps = data.Data
      }
    })
  },
  methods: {
    getEvents () {
      this.loading = true
      this.evtApps = []
      this.$axios.get('/app-group-msg-result', {
        params: {
          Start: this.start / 1000,
          End: this.end / 1000
        }
      }).then(data => {
        data = data.data
        if (data && data.Data) {
          const evtApps = []
          for (const app of this.apps) {
            const appEvt = {
              Appid: app.Appid,
              NickName: app.NickName,
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
                appEvt.Status = evt.Status
                appEvt.TotalCount = evt.TotalCount
                appEvt.FilterCount = evt.FilterCount
                appEvt.SentCount = evt.SentCount
                appEvt.ErrorCount = evt.ErrorCount
                break
              }
            }
            evtApps.push(appEvt)
          }
          this.evtApps = evtApps
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
