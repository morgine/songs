<template>
  <q-page padding>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">图文列表</div>
      </q-card-section>
      <q-card-section>
        <q-card flat v-for="(article, idx) in articles" :key="idx">
          <q-card-section>
            <a href="javascript: void(0)" @click="openDialog(`article-image-selector-${idx}`)">
              <q-img
                :src="`${$axios.defaults.baseURL}/picture/${article.PicFile}`"
                :width="idx===0 && articles.length > 1?'300px':'120px'"
                height="120px"
                class="q-hoverable"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center">
                    选择封面
                  </div>
                </template>
                <!--                <div class="absolute-full text-subtitle1 flex flex-center">-->
                <!--                  选择封面-->
                <!--                </div>-->
              </q-img>
            </a>
            <ImageSelector v-model="article.PicFile" :ref="`article-image-selector-${idx}`"></ImageSelector>
          </q-card-section>
          <q-card-section>
            <q-input label="标题" v-model="article.Title"/>
          </q-card-section>
          <q-card-section>
            <q-input label="描述" v-model="article.Description"/>
          </q-card-section>
          <q-card-section>
            <q-input label="地址" v-model="article.Url"/>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn icon="remove" flat @click="articles.splice(idx, 1)"/>
          </q-card-actions>
        </q-card>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn v-if="articles.length < 8" icon="add" color="primary" flat @click="articles.push(initArticle())"/>
        <q-btn icon="delete" flat @click="delArticles" color="warning"/>
        <q-btn icon="check" flat @click="saveArticles" color="primary"/>
      </q-card-actions>
    </q-card>
    <q-card flat>
      <q-card-section>
        <div class="text-h6">小程序卡片</div>
      </q-card-section>
      <q-card-section>
        <q-card flat v-for="(card, idx) in cards" :key="idx">
          <q-card-section>
            <a href="javascript: void(0)" @click="openDialog(`card-image-selector-${idx}`)">
              <q-img
                :src="`${$axios.defaults.baseURL}/picture/${card.ThumbMediaFilename}`"
                width="100px"
                height="120px"
                class="q-hoverable"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center">
                    选择封面
                  </div>
                </template>
                <!--                <div class="absolute-full text-subtitle1 flex flex-center">-->
                <!--                  选择封面-->
                <!--                </div>-->
              </q-img>
            </a>
            <ImageSelector v-model="card.ThumbMediaFilename" :ref="`card-image-selector-${idx}`"></ImageSelector>
          </q-card-section>
          <q-card-section>
            <q-input label="小程序标题" v-model="card.Title"/>
          </q-card-section>
          <q-card-section>
            <q-input label="小程序 appid" v-model="card.Appid">
              <template v-slot:hint>
                小程序需要与公众号关联
              </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-input label="小程序地址" v-model="card.PagePath"/>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn icon="remove" flat @click="cards.splice(idx, 1)"/>
          </q-card-actions>
        </q-card>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn icon="add" v-if="articles.length < 8" flat color="primary" @click="cards.push(initCard())"/>
        <q-btn icon="delete" flat @click="delCard" color="warning"/>
        <q-btn icon="check" flat @click="saveCard" color="primary"/>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import ImageSelector from 'components/ImageSelector'

export default {
  name: 'Index',
  components: { ImageSelector },
  data () {
    return {
      cards: [],
      initCard () {
        return {
          Title: '',
          Appid: '',
          PagePath: '',
          ThumbMediaFilename: ''
        }
      },
      articles: [],
      initArticle () {
        return {
          Title: '',
          Description: '',
          Url: '',
          PicFile: ''
        }
      }
    }
  },
  created () {
    this.getCard()
    this.getArticles()
  },
  methods: {
    openDialog (ref) {
      this.$refs[ref][0].openDialog()
    },
    getCard () {
      this.$axios.get('/mini-program-card').then(data => {
        data = data.data
        if (data && data.Data) {
          this.cards = data.Data
        }
      })
    },
    saveCard () {
      this.$axios.put('/mini-program-card', this.cards).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    delCard () {
      this.$q.dialog({
        title: '⚠️ 警告',
        message: '删除所有小程序卡片?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('/mini-program-card').then(data => {
          data = data.data
          if (data && data.Message) {
            this.$q.notify(data.Message)
            this.cards = []
          }
        })
      })
    },
    getArticles () {
      this.$axios.get('/articles').then(data => {
        data = data.data
        if (data && data.Data) {
          this.articles = data.Data
        }
      })
    },
    saveArticles () {
      this.$axios.put('/articles', this.articles).then(data => {
        data = data.data
        if (data && data.Message) {
          this.$q.notify(data.Message)
        }
      })
    },
    delArticles () {
      this.$q.dialog({
        title: '⚠️ 警告',
        message: '删除所有图文消息?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('/articles').then(data => {
          data = data.data
          if (data && data.Message) {
            this.$q.notify(data.Message)
            this.articles = []
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
