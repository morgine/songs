<template>
  <q-dialog v-model="dialog" persistent transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section>
        <q-form @submit="uploadImage">
          <q-file
            name="picture"
            v-model="files"
            filled
            multiple
            use-chips
            label="选择上传文件"
            accept=".jpg, .png, image/*"
          />
          <div class="q-mt-lg">
            <q-btn label="提交上传" type="submit" color="primary" :disable="!files"/>
          </div>
        </q-form>
      </q-card-section>
      <q-card-section style="max-height: 60vh" class="scroll">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            v-for="(image, key) in images"
            :key="image.ID"
          >
            <q-img class="col" :src="`${$axios.defaults.baseURL}/picture/${image.File}`">
              <template v-slot:error>
                <div class="absolute-full flex flex-center">
                  error!
                </div>
              </template>
            </q-img>
            <q-card-actions align="around">
              <q-btn flat icon="delete" @click="delImage(image.ID, key)"></q-btn>
              <q-btn flat icon="check" @click="selected = image.File"></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-card-section>
      <q-card-section v-if="pagination.Total">
        <q-pagination
          v-model="current"
          :max="maxPage"
          :input="true"
        >
        </q-pagination>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="取消" v-close-popup color="primary"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      images: [],
      dialog: false,
      files: null,
      selected: null,
      image: {
        ID: 0,
        File: '',
        Url: ''
      },
      pagination: {
        Limit: 10,
        Offset: 0,
        Total: 0
      },
      current: 1
    }
  },
  computed: {
    maxPage () {
      return Math.ceil(this.pagination.Total / this.pagination.Limit)
    }
  },
  created () {
    console.log(this.$axios.defaults)
    this.count()
  },
  watch: {
    current (page) {
      this.pagination.Offset = this.Limit * page
      this.getImages()
    },
    selected (val) {
      this.$emit('input', val)
      this.dialog = false
    }
  },
  methods: {
    count () {
      this.$axios.get('/big-picture/count').then(data => {
        data = data.data
        if (data && data.Data) {
          this.pagination.Total = data.Data
          this.getImages()
        }
      })
    },
    uploadImage (evt) {
      const formData = new FormData(evt.target)
      this.loading = true
      this.$axios.put('/big-pictures', formData).then(data => {
        data = data.data
        if (data && data.Data) {
          for (const datum of data.Data) {
            this.images.splice(0, 0, datum)
          }
          this.pagination.Total += data.Data.length
        }
      })
    },
    delImage (id, key) {
      this.$axios.delete('/big-pictures', { params: { IDs: [id] } }).then(data => {
        data = data.data
        if ((data && data.Data) || data.Data === 0) {
          this.pagination.Total = data.Data
        }
        this.images.splice(key, 1)
      })
    },
    getImages () {
      this.$axios.get('/big-pictures', { params: this.pagination }).then(data => {
        data = data.data
        if (data && data.Data) {
          this.images.splice(0, this.images.length, ...data.Data)
        }
      })
    },
    openDialog () {
      this.dialog = true
    }
  }
}
</script>

<style scoped>

</style>
