<template>
  <q-page padding>
    <q-form class="column q-gutter-lg">
      <q-input label="小程序标题" v-model="card.Title"/>
      <q-input label="小程序地址" v-model="card.PagePath"/>
      <div>
        <a href="javascript: void(0)" @click="$refs['image-selector'].openDialog()">
          <q-img
            :src="card.ThumbMediaFilename?`/v1/picture/${card.ThumbMediaFilename}`:''"
            width="100px"
            height="120px"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center">
                选择封面
              </div>
            </template>
            <div class="absolute-full text-subtitle1 flex flex-center">
              选择封面
            </div>
          </q-img>
        </a>
      </div>
      <div class="row">
        <q-btn label="删除" @click="delCard"/>
        <q-btn label="保存" color="primary" class="q-ml-md" @click="saveCard"/>
      </div>
    </q-form>
    <ImageSelector v-model="card.ThumbMediaFilename" ref="image-selector"></ImageSelector>
  </q-page>
</template>

<script>
import ImageSelector from 'components/ImageSelector'

export default {
  name: 'Index',
  components: { ImageSelector },
  data () {
    return {
      card: {
        Title: '',
        PagePath: '',
        ThumbMediaFilename: ''
      },
      dialog: false
    }
  },
  created () {
    this.getCard()
  },
  methods: {
    getCard () {
      this.$axios.get('/mini-program-card').then(data => {
        data = data.data
        if (data && data.Data) {
          this.card = data.Data
        }
      })
    },
    saveCard () {
      this.$axios.put('/mini-program-card', this.card).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    delCard () {
      this.$axios.delete('/mini-program-card').then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
          this.card = {
            Title: '',
            PagePath: '',
            ThumbMediaFilename: ''
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
