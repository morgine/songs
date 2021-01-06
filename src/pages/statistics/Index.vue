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
        <q-btn label="获取统计" type="submit" color="primary" :loading="loading" @click="getStatistics"/>
      </div>
    </q-form>
    <template v-for="(date, didx) in dates">
      <q-table
        :key="`total-${didx}`"
        :title="`总量-${date.date}`"
        :data="[date.data]"
        :columns="columns"
        row-key="cumulate_user"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="导出 csv"
            no-caps
            @click="exportTable(`总量-${date.date}`, [date.data], columns)"
          />
        </template>
      </q-table>
      <q-table
        :key="`app-${didx}`"
        :title="`详细-${date.date}`"
        :data="date.apps"
        :columns="appColumns"
        :sort-method="sortColumns"
        row-key="appid"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="导出 csv"
            no-caps
            @click="exportTable(`详细-${date.date}`, date.apps, appColumns)"
          />
        </template>
      </q-table>
    </template>
  </q-page>
</template>

<script>
import { date, exportFile } from 'quasar'

const timeStamp = Date.now()
const oneDate = 1000 * 60 * 60 * 24
const nowDate = date.formatDate(timeStamp - oneDate, 'YYYY/MM/DD')
const prevDate = date.formatDate(timeStamp - (2 * oneDate), 'YYYY/MM/DD')

function wrapCsvValue (val, row, formatFn) {
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
  name: 'Index',
  data () {
    const columns = [
      {
        name: 'cumulate_user',
        label: '用户总量',
        field: 'cumulate_user',
        sortable: true
      },
      {
        name: 'new_user',
        label: '新增用户',
        field: 'new_user',
        sortable: true
      },
      {
        name: 'cancel_user',
        label: '取消用户',
        field: 'cancel_user',
        sortable: true
      },
      {
        name: 'positive_user',
        label: '净增用户',
        field: 'positive_user',
        sortable: true
      },
      {
        name: 'cancel_rate',
        label: '取关率',
        field: row => `${(100 * row.cancel_rate).toFixed(2)}%`,
        sortable: true
      },
      {
        name: 'req_succ_count',
        label: '拉取量',
        field: 'req_succ_count',
        sortable: true
      },
      {
        name: 'exposure_count',
        label: '曝光量',
        field: 'exposure_count',
        sortable: true
      },
      {
        name: 'exposure_rate',
        label: '曝光率',
        field: row => `${(100 * row.exposure_rate).toFixed(2)}%`,
        sortable: true
      },
      {
        name: 'click_count',
        label: '点击量',
        field: 'click_count',
        sortable: true
      },
      {
        name: 'click_rate',
        label: '点击率',
        field: row => `${(100 * row.click_rate).toFixed(2)}%`,
        sortable: true
      },
      {
        name: 'outcome(元)',
        label: '支出',
        field: row => `${(row.outcome / 100).toFixed(2)}`,
        sortable: true
      },
      {
        name: 'income(元)',
        label: '收入',
        field: row => `${(row.income / 100).toFixed(2)}`,
        sortable: true
      },
      {
        name: 'income_outcome_rate',
        label: '收入支出比率',
        field: row => row.outcome ? `${(row.income / row.outcome).toFixed(2)}%` : '0.00%',
        sortable: true
      },
      {
        name: 'ecpm',
        label: '千次曝光收益(元)',
        field: row => `${(row.ecpm / 100).toFixed(2)}`,
        sortable: true
      }
    ]
    return {
      params: {
        Limit: 500,
        Offset: 0,
        BeginDate: prevDate,
        EndDate: nowDate
      },
      loading: false,
      columns: columns,
      appColumns: [
        {
          name: 'appid',
          label: 'APPID',
          field: 'appid'
        },
        {
          name: 'nickname',
          label: '公众号名称',
          field: 'nickname'
        }
      ].concat(columns,
        {
          name: 'errs',
          label: '错误列表',
          field: row => row.errs ? `${row.errs.join('\n')}` : ''
        }
      ),
      dates: [
        // {
        //   date: '',
        //   data: {
        //     cumulate_user: 0,
        //     new_user: 0,
        //     cancel_user: 0,
        //     positive_user: 0,
        //     cancel_rate: 0,
        //     req_succ_count: 0,
        //     exposure_count: 0,
        //     exposure_rate: 0,
        //     click_count: 0,
        //     click_rate: 0,
        //     outcome: 0,
        //     income: 0,
        //     income_outcome_rate: 0,
        //     ecpm: 0
        //   },
        //   total_exposure_count: 0,
        //   total_click_count: 0,
        //   apps: [
        //     {
        //       appid: '',
        //       nickname: '',
        //       err: null,
        //       cumulate_user: 0,
        //       new_user: 0,
        //       cancel_user: 0,
        //       positive_user: 0,
        //       cancel_rate: 0,
        //       req_succ_count: 0,
        //       exposure_count: 0,
        //       exposure_rate: 0,
        //       click_count: 0,
        //       click_rate: 0,
        //       outcome: 0,
        //       income: 0,
        //       income_outcome_rate: 0,
        //       ecpm: 0
        //     }
        //   ]
        // }
      ]
    }
  },
  methods: {
    getStatistics () {
      this.loading = true
      this.$axios.get('/user-statistics', { params: this.params }).then(data => {
        data = data.data
        if (data && data.Data) {
          this.dates = data.Data
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
    },
    sortColumns (rows, sortBy, descending) {
      rows.sort((a, b) => {
        if (descending) {
          return a[sortBy] - b[sortBy]
        } else {
          return b[sortBy] - a[sortBy]
        }
      })
      return rows
    }
  }
}
</script>

<style scoped>

</style>
