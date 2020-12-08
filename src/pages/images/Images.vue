<template>
  <q-page padding>
    <q-form @submit="uploadImage" class="row full-width">
      <q-file
        name="picture"
        v-model="files"
        filled
        multiple
        use-chips
        label="选择上传文件"
        accept=".jpg, .png, image/*"
        class="col-8"
      />
      <div class="col-3 row items-center q-ml-lg">
        <q-btn label="提交上传" type="submit" color="primary" :disable="!files"/>
      </div>
    </q-form>
    <q-table
      title="Treats"
      :data="data"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      :pagination.sync="pagination"
      :loading="loading"
      grid
      hide-header
    >
<!--      <template v-slot:top-left>-->
<!--        <q-checkbox :indeterminate-value="selected.length > 0 && selected.length < data.length" v-model="selectedAll"/>-->
<!--      </template>-->
      <template v-slot:top-right>
        <q-btn @click="delImages" :disable="!selected || selected.length === 0">删除</q-btn>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected">
                <q-img :src="props.row.Url"></q-img>
              </q-checkbox>
            </q-card-section>
            <q-separator/>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      selectedAll: false,
      selected: [],
      files: null,
      pagination: {
        sortBy: 'id',
        descending: true,
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 10
      },
      loading: false,
      columns: [
        {
          name: 'ID',
          align: 'center',
          label: 'ID',
          field: 'ID'
        },
        {
          name: 'File',
          label: 'File',
          field: 'File'
        },
        {
          name: 'Url',
          label: 'Url',
          field: 'Url'
        }
      ],
      data: []
    }
  },
  watch: {
    selectedAll (val) {
      if (val) {
        this.selected = this.data
      } else {
        this.selected = []
      }
    }
  },
  created () {
    this.count()
  },
  methods: {
    count () {
      this.loading = true
      this.$axios.get('/big-picture/count').then(data => {
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

      this.$axios.get('/big-pictures', { params: params }).then(data => {
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
    uploadImage (evt) {
      const formData = new FormData(evt.target)
      this.loading = true
      this.$axios.put('/big-pictures', formData).then(data => {
        data = data.data
        if (data && data.Data) {
          // for (const datum of data.Data) {
          //   this.data.push(datum)
          // }
          // this.loading = false
          this.count()
        }
      })
    },
    //   onSubmit (evt) {
    //     const formData = new FormData(evt.target)
    //     const submitResult = []
    //
    //     for (const [ name, value ] of formData.entries()) {
    //       if (value.name.length > 0) {
    //         submitResult.push({
    //           name,
    //           value: value.name
    //         })
    //       }
    //     }
    //
    //     this.submitResult = submitResult
    //     this.submitEmpty = submitResult.length === 0
    //   }
    // },
    delImages () {
      const params = []
      for (const img of this.selected) {
        params.push(img.ID)
      }
      this.loading = true
      this.$axios.delete('/big-pictures', { params: { IDs: params } }).then(data => {
        data = data.data
        if ((data && data.Data) || data.Data === 0) {
          this.pagination.rowsNumber = data.Data
        }
        for (const param of params) {
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].ID === param) {
              this.data.splice(i, 1)
            }
          }
        }
        this.selected = []
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
