<template>
  <q-page padding>
    <div class="row items-center q-pb-md">
      <div>选择时间：</div>
      <q-btn icon="event" :label="`${model.from} - ${model.to}`" outline>
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="model" range mask="YYYY-MM-DD" :options="optionsFn">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="取 消" flat v-close-popup/>
              <q-btn label="确 定" color="primary" flat @click="getSummary" v-close-popup/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </div>
    <q-table
      title="统计总量"
      :data="summaries.Total"
      :columns="totalColumns"
      row-key="RefDate"
      :loading="loading"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="导出 csv"
          no-caps
          @click="exportTable(`总量-${model.from}-${model.to}`, summaries.Total, totalColumns)"
        />
      </template>
    </q-table>
    <q-table
      v-for="app in summaries.AppSummaries"
      :key="app.Appid"
      :title="app.Nickname"
      :data="app.Summaries"
      :columns="totalColumns"
      row-key="RefDate"
    >
      <template v-slot:top-right>
        <span v-if="app.Err" class="text-red text-subtitle1">
          {{app.Err}}
        </span>
        <q-btn
          color="primary"
          icon-right="archive"
          label="导出 csv"
          no-caps
          @click="exportTable(`${app.Nickname}-${model.from}-${model.to}`, app.Summaries, totalColumns)"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { exportFile, date } from 'quasar'

const timeStamp = Date.now()
const nowDate = date.formatDate(timeStamp, 'YYYY-MM-DD')
const nowDateCompare = date.formatDate(timeStamp, 'YYYY/MM/DD')
const oneDate = 1000 * 60 * 60 * 24
const prevDate = date.formatDate(timeStamp - oneDate, 'YYYY-MM-DD')

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
  name: 'UserSummary',
  data () {
    return {
      model: {
        appids: [],
        from: prevDate,
        to: nowDate
      },
      loading: false,
      expanded: false,
      totalColumns: [
        {
          name: 'RefDate',
          align: 'right',
          label: '日期',
          field: 'RefDate'
        },
        {
          name: 'NewUser',
          align: 'right',
          label: '新增用户',
          field: 'NewUser'
        },
        {
          name: 'CancelUser',
          align: 'right',
          label: '取关用户',
          field: 'CancelUser'
        },
        {
          name: 'PositiveUser',
          align: 'right',
          label: '净增用户',
          field: row => row.NewUser - row.CancelUser,
          format: val => `${val}`
        },
        {
          name: 'CumulateUser',
          align: 'right',
          label: '用户总量',
          field: 'CumulateUser'
        }
      ],
      summaries: {
        Total: [/* Summary */],
        AppSummaries: [/* AppSummary */]
      },
      Summary: {
        RefDate: '', // 数据的日期
        // UserSource: 0, // 用户的渠道，数值代表的含义如下： 0代表其他合计 1代表公众号搜索 17代表名片分享 30代表扫描二维码 51代表支付后关注（在支付完成页） 57代表文章内账号名称 100微信广告 161他人转载 176 专辑页内账号名称
        NewUser: 0, // 新增的用户数量
        CancelUser: 0, // 取消关注的用户数量，new_user减去cancel_user即为净增用户数量
        CumulateUser: 0 // 总用户量
      },
      AppSummary: {
        Appid: '',
        Nickname: '',
        Err: '',
        Summaries: []
      }
    }
  },
  created () {

  },
  methods: {
    getSummary () {
      const params = {
        Appids: this.model.appids,
        BeginDate: this.model.from,
        EndDate: this.model.to
      }
      this.loading = true
      this.$axios.get('/user-summary', { params: params }).then(data => {
        data = data.data
        if (data && data.Data) {
          this.summaries = data.Data
        } else if (data.Message) {
          this.$q.notify(data.Message)
        }
        this.loading = false
      })
    },
    optionsFn (date) {
      return date <= nowDateCompare
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
