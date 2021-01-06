<template>
  <q-page padding>
    <template v-if="unauthorized">
      <div>当前未授权
        <q-btn label="去授权" @click="goAuth" size="sm"/>
      </div>
      <div v-if="refresh">如果已授权成功则
        <q-btn label="刷新" icon="refresh" @click="checkAuth" size="sm"/>
      </div>
    </template>
    <template v-else>
      <q-form
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="dailyReportsParams.account_id"
          label="广告主帐号 id"
        />

        <q-select
          filled
          v-model="dailyReportsParams.level"
          :options="levels"
          emit-value
          map-options
          label="报表级别"
        />
        <q-input filled v-model="dailyReportsParams.date_range.start_date" label="开始日期">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="dailyReportsParams.date_range.start_date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input filled v-model="dailyReportsParams.date_range.end_date" label="结束日期">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="dailyReportsParams.date_range.end_date" mask="YYYY-MM-DD">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          filled
          v-model="dailyReportsParams.time_line"
          :options="timeLines"
          emit-value
          map-options
          label="时间口径"
        />
        <!--      <q-input filled type="textarea" label="获取字段" v-model="fields" hint="https://developers.e.qq.com/docs/api/insights/ad_insights/daily_reports_get?version=1.3&_preview=1#zyaa5"/>-->

        <q-table
          title="可选字段"
          :data="fields"
          :columns="columns"
          row-key="name"
          selection="multiple"
          :selected.sync="selectedFields"
        />
        <div>
          <q-btn label="获取统计" color="primary" @click="getDailyReports"/>
        </div>
      </q-form>
      <q-table
        v-if="dailyReports.list.length"
        title="广告统计"
        :data="dailyReports.list"
        :columns="selectedColumns"
        :pagination.sync="dailyReportsPagination"
        @request="getDailyReports"
        :row-key="selectedColumns[0]?selectedColumns[0].name:'name'"
        class="q-mt-lg"
      >
        <template v-slot:top-right>
          <q-btn
            color="primary"
            icon-right="archive"
            label="导出 csv"
            no-caps
            @click="exportTable(`广告统计-${dailyReportsParams.date_range.start_date}-${dailyReportsParams.date_range.end_date}`, dailyReports.list, selectedColumns)"
          />
        </template>
      </q-table>
    </template>
  </q-page>
</template>

<script>
import { exportFile } from 'quasar'

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
  name: 'Index',
  data () {
    return {
      unauthorized: true,
      refresh: false,
      dailyReportsParams: {
        account_id: '',
        level: '',
        date_range: {
          start_date: '',
          end_date: ''
        },
        filtering: [
          {
            field: '',
            operator: '',
            values: [
              ''
            ]
          }
        ],
        group_by: [
          ''
        ],
        order_by: [
          {
            sort_field: '',
            sort_type: ''
          }
        ],
        // page: '1',
        // page_size: '20',
        time_line: 'REPORTING_TIME',
        fields: []
      },
      dailyReports: {
        list: [
          {
            date: '2017-05-01',
            campaign_id: '<CAMPAIGN_ID>',
            adgroup_id: '<ADGROUP_ID>',
            ad_id: '<AD_ID>',
            cost: 1200,
            image_click: 0,
            like_or_comment: 0,
            app_payment_count: 0,
            app_payment_amount: 0,
            app_installation: 0,
            activation: 0,
            click: 1200,
            conversion: 0,
            download: 0,
            follow: 0,
            impression: 12000,
            order_placement: 0,
            register: 0,
            reservation: 0,
            share: 0
          }
        ],
        page_info: {
          page: 1,
          page_size: 10,
          total_number: 1,
          total_page: 1
        }
      },
      levels: [
        // {
        //   value: 'REPORT_LEVEL_ADVERTISER',
        //   label: '广告主级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_CAMPAIGN',
        //   label: '推广计划级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_ADGROUP',
        //   label: '广告组级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_AD',
        //   label: '广告级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_PROMOTED_OBJECT',
        //   label: '推广目标级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_UNION_POSITION',
        //   label: '优量汇广告位级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_CREATIVE_TEMPLATE',
        //   label: '创意形式级别报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_EXPAND_TARGETING_ADGROUP',
        //   label: '扩量广告报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_MATERIAL_VIDEO',
        //   label: '视频素材报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_MATERIAL_IMAGE',
        //   label: '图片素材报表'
        // },
        // {
        //   value: 'REPORT_LEVEL_PRODUCT_CATELOG',
        //   label: '商品库报表'
        // },
        {
          value: 'REPORT_LEVEL_ADVERTISER_WECHAT',
          label: '微信广告主级别报表'
        },
        {
          value: 'REPORT_LEVEL_CAMPAIGN_WECHAT',
          label: '微信推广计划级别报表'
        },
        {
          value: 'REPORT_LEVEL_ADGROUP_WECHAT',
          label: '微信广告组级别报表'
        },
        {
          value: 'REPORT_LEVEL_AD_WECHAT',
          label: '微信广告级别报表'
        }
      ],
      timeLines: [
        // {
        //   value: 'REQUEST_TIME',
        //   label: '请求时间口径'
        // },
        // {
        //   value: 'ACTIVE_TIME',
        //   label: '激活时间口径'
        // },
        {
          value: 'REPORTING_TIME',
          label: '上报时间口径'
        }
      ],
      columns: [
        {
          name: 'displayName',
          align: 'left',
          label: '名称',
          field: 'displayName'
        },
        {
          name: 'tip',
          align: 'left',
          label: '说明',
          field: 'tip'
        }
      ],
      fields: [],
      selectedFields: [],
      selectedColumns: [],
      dailyReportsPagination: {
        page: 0,
        rowsPerPage: 0,
        rowsNumber: 0
      }
    }
  },
  computed: {
    selectedLevel () {
      return this.dailyReportsParams.level
    }
  },
  created () {
    this.checkAuth()
  },
  watch: {
    selectedLevel () {
      this.getDailyReportsLevelFields()
    },
    selectedFields (val) {
      const fields = []
      const columns = []
      for (const selectedField of val) {
        fields.push(selectedField.name)
        columns.push({
          name: selectedField.name,
          label: selectedField.displayName,
          align: 'left',
          field: selectedField.name
        })
      }
      this.dailyReportsParams.fields = fields
      this.selectedColumns = columns
    },
    dailyReportsPagination (val) {
      // this.dailyReportsParams.page = val.page
      // this.dailyReportsParams.page_size = val.rowsPerPage
    }
  },
  methods: {
    goAuth () {
      this.$axios.get('/advert-authorizer-url').then(data => {
        data = data.data
        if (data && data.Data) {
          this.refresh = true
          window.open(data.Data, '_blank')
        }
      })
    },
    checkAuth () {
      this.$axios.get('/check-advert-authorized').then(data => {
        data = data.data
        if (data && data.Data) {
          this.unauthorized = false
          this.refresh = false
        }
      })
    },
    getDailyReportsLevelFields () {
      this.$axios.get('/daily-reports-level-fields', { params: { Level: this.dailyReportsParams.level } }).then(data => {
        data = data.data
        if (data.Data) {
          this.fields = data.Data
        }
      })
    },
    getDailyReports () {
      this.$axios.post('/daily-reports', this.dailyReportsParams).then(data => {
        data = data.data
        if (data && data.Data) {
          this.dailyReports = data.Data
          this.dailyReportsPagination.rowsNumber = this.dailyReports.page_info.total_number
          // this.dailyReportsPagination.page = this.dailyReports.page_info.page
          // this.dailyReportsPagination.rowsPerPage = this.dailyReports.page_info.page_size
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
