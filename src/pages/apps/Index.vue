<template>
  <q-page padding>
    <q-table
      title="公众号列表"
      :data="data"
      :columns="columns"
      row-key="Appid"
      :pagination.sync="pagination"
      :loading="loading"
      @request="onRequest"
      selection="multiple"
      :selected.sync="selected"
      binary-state-sort
    >
      <template v-slot:top-right>
        <q-btn flat @click="delApps" :disable="selected.length === 0">删除公众号</q-btn>
        <q-btn flat @click="resetApp">拉取公众号</q-btn>
        <q-btn flat @click="addApp">添加公众号</q-btn>
      </template>
      <template v-slot:body-cell-HeadImg="props">
        <q-td :props="props">
          <q-img :src="props.value" height="40px" width="40px"/>
        </q-td>
      </template>
      <template v-slot:body-cell-QrcodeUrl="props">
        <q-td :props="props">
          <a :href="`${$axios.defaults.baseURL}/proxy?img=${props.value}`" target="_blank">二维码</a>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      pagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'ID',
          align: 'right',
          label: 'ID',
          field: 'ID',
          sortable: true
        },
        {
          name: 'Appid',
          align: 'right',
          label: 'Appid',
          field: 'Appid'
        },
        {
          name: 'NickName',
          align: 'right',
          label: 'NickName',
          field: 'NickName'
        },
        {
          name: 'HeadImg',
          align: 'right',
          label: 'HeadImg',
          field: 'HeadImg'
        },
        {
          name: 'UserName',
          align: 'right',
          label: 'UserName',
          field: 'UserName'
        },
        {
          name: 'PrincipalName',
          align: 'right',
          label: 'PrincipalName',
          field: 'PrincipalName'
        },
        {
          name: 'Alias',
          align: 'right',
          label: 'Alias',
          field: 'Alias'
        },
        {
          name: 'QrcodeUrl',
          align: 'right',
          label: 'QrcodeUrl',
          field: 'QrcodeUrl'
        },
        {
          name: 'Signature',
          align: 'right',
          label: 'Signature',
          field: 'Signature'
        }
      ],
      data: [],
      original: [],
      selected: []
    }
  },
  mounted () {
    this.count()
  },
  methods: {
    count () {
      this.loading = true
      this.$axios.get('/count-apps').then(data => {
        data = data.data
        if (data && data.Data) {
          this.pagination.rowsNumber = data.Data
          this.onRequest({ pagination: this.pagination })
        }
        this.loading = false
      })
    },
    onRequest (props) {
      const {
        page,
        rowsPerPage,
        sortBy,
        descending
      } = props.pagination

      this.loading = true
      const startRow = (page - 1) * rowsPerPage

      const params = {
        Limit: rowsPerPage,
        Offset: startRow
      }

      if (sortBy) {
        params.Column = sortBy
        params.Desc = descending
      }

      this.$axios.get('/apps', { params: params }).then(data => {
        data = data.data
        if (data && data.Data) {
          // clear out existing data and add new
          this.data.splice(0, this.data.length, ...data.Data)

          // don't forget to update local pagination object
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.sortBy = sortBy
          this.pagination.descending = descending

          // ...and turn of loading indicator
          this.loading = false
        }
      })
    },
    addApp () {
      this.$axios.get('/app-authorizer-url').then(data => {
        data = data.data
        if (data && data.Data) {
          window.open(data.Data, '_blank')
        }
      })
    },
    delApps () {
      const params = []
      for (const app of this.selected) {
        params.push(app.ID)
      }
      this.loading = true
      this.$axios.delete('/apps', { params: { IDs: params } }).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          this.loading = false
          this.count()
        }
      })
    },
    resetApp () {
      this.$q.dialog({
        title: '⚠️ 警告',
        message: '拉取当前开放平台下的所有授权公众号?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.loading = true
        this.$axios.get('/reset-apps').then(data => {
          data = data.data
          if (data.Message) {
            this.$q.notify(data.Message)
          }
          this.loading = false
          this.count()
        })
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }
  }
}
</script>

<style scoped>

</style>
