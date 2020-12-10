<template>
  <q-page padding>
    <q-form class="row q-gutter-lg">
      <q-input filled v-model="params.BeginDate" label="开始日期">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="params.BeginDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input filled v-model="params.EndDate" label="结束日期">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="params.EndDate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat/>
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-space/>
      <div class="row items-center">
        <q-btn label="获取统计" type="submit" color="primary" @click="getStatistics"/>
      </div>
    </q-form>
    <q-table
      title="统计总量"
      :data="statistics?[statistics]:[]"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="导出 csv"
          no-caps
          @click="exportTable(`总量-${params.BeginDate}-${params.EndDate}`, statistics?[statistics]:[], columns)"
        />
      </template>
    </q-table>
    <template v-if="statistics && statistics.app_user_statistics">
      <template v-for="(app, idx) in statistics.app_user_statistics">
        <q-table
          :key="idx"
          :title="app.nickname"
          :data="app.statistics&&app.statistics.cumulates?app.statistics.cumulates:[]"
          :columns="dateColumns"
          row-key="ref_date"
        >
<!--          <template v-slot:top-left>-->
<!--            <span v-if="app.err">{{ app.err }}</span>-->
<!--          </template>-->
          <template v-slot:top-right>
            <span v-if="app.err" class="text-grey text-subtitle1 q-mr-lg">
          {{ app.err }}
        </span>
            <q-btn
              v-if="app.statistics && app.statistics.cumulates"
              color="primary"
              icon-right="archive"
              label="导出 csv"
              no-caps
              @click="exportTable(`${app.Nickname}-${params.BeginDate}-${params.EndDate}`, app.statistics.cumulates, dateColumns)"
            />
          </template>
        </q-table>
      </template>
    </template>
  </q-page>
</template>

<script>
import { date, exportFile } from 'quasar'

const timeStamp = Date.now()
const oneDate = 1000 * 60 * 60 * 24
const nowDate = date.formatDate(timeStamp - oneDate, 'YYYY/MM/DD')
const prevDate = date.formatDate(timeStamp - (2 * oneDate), 'YYYY/MM/DD')

function wrapCsvValue (val, formatFn) {
  // eslint-disable-next-line no-void
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  // eslint-disable-next-line no-void
  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export default {
  data () {
    return {
      params: {
        Limit: 500,
        Offset: 0,
        BeginDate: prevDate,
        EndDate: nowDate
      },
      pagination: {
        page: 0,
        maxPage: 0
      },
      loading: false,
      columns: [
        {
          name: 'count',
          align: 'right',
          label: '公众号数量',
          field: 'count'
        },
        {
          name: 'cumulate_user',
          align: 'right',
          label: '用户总计',
          field: 'cumulate_user'
        },
        {
          name: 'new_user',
          align: 'right',
          label: '新增用户',
          field: 'new_user'
        },
        {
          name: 'cancel_user',
          align: 'right',
          label: '取关用户',
          field: 'cancel_user'
        },
        {
          name: 'positive_user',
          align: 'right',
          label: '净增用户',
          field: row => row.new_user - row.cancel_user
        }
      ],
      dateColumns: [
        {
          name: 'ref_date',
          align: 'right',
          label: '日期',
          field: 'ref_date'
        },
        {
          name: 'cumulate_user',
          align: 'right',
          label: '用户总计',
          field: 'cumulate_user'
        },
        {
          name: 'new_user',
          align: 'right',
          label: '新增用户',
          field: 'new_user'
        },
        {
          name: 'cancel_user',
          align: 'right',
          label: '取关用户',
          field: 'cancel_user'
        },
        {
          name: 'positive_user',
          align: 'right',
          label: '净增用户',
          field: row => row.new_user - row.cancel_user
        }
      ],
      statistics: {
        count: 0,
        cumulate_user: 0,
        new_user: 0,
        cancel_user: 0,
        app_user_statistics: [
          {
            appid: '',
            nickname: '',
            err: '',
            statistics: {
              cumulate_user: 0,
              new_user: 0,
              cancel_user: 0,
              cumulates: [
                {
                  ref_date: '',
                  cumulate_user: 0,
                  new_user: 0,
                  cancel_user: 0,
                  summaries: [
                    {
                      ref_date: '',
                      user_source: 0,
                      new_user: 0,
                      cancel_user: 0
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    }
  },
  methods: {
    // countApps () {
    //   this.$axios.get('/count-apps').then(data => {
    //     data = data.data
    //     if (data && data.Data) {
    //       this.pagination.maxPage = Math.ceil(data.Data / this.params.Limit)
    //     }
    //   })
    // }
    getStatistics () {
      this.loading = true
      this.$axios.get('/user-statistics', { params: this.params }).then(data => {
        data = data.data
        if (data && data.Data) {
          this.statistics = data.Data
          this.loading = false
        }
      })
    },
    exportTable (filename, data, columns) {
      // naive encoding to csv format
      const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        data.map(row => columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            // eslint-disable-next-line no-void
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        `${filename}.csv`,
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: '浏览器阻止下载文件...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
