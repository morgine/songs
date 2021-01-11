<template>
  <q-splitter
    v-model="splitterModel"
    style="height: 600px"
  >
    <template v-slot:before>
      <div class="q-pa-md">
        <q-btn v-if="!editingGroups" flat label="编辑分组" color="primary" @click="editingGroups=true"/>
        <template v-else>
          <q-btn flat label="退出编辑" color="primary" @click="editingGroups=false"/>
        </template>
        <q-tree
          :nodes="treeNodes"
          node-key="ID"
          label-key="Name"
          selected-color="primary"
          :selected.sync="selected"
          default-expand-all
        >
          <template v-if="editingGroups" v-slot:default-body="prop">
            <div class="row q-gutter-lg items-center">
              <div v-if="prop.node.ID > 0">
                <q-popup-edit v-model="prop.node.Name" title="编辑分组名称" buttons
                              @save="saveGroupName($event, prop.node.ID)">
                  <q-input v-model="prop.node.Name" dense autofocus/>
                </q-popup-edit>
                <q-btn dense flat icon="edit" size="sm"></q-btn>
              </div>
              <div>
                <q-popup-edit v-model="prop.node.Name" title="添加子分组" buttons label-set="添加"
                              @save="createGroup($event, prop.node.ID)">
                  <q-input v-model="prop.node.Name" dense autofocus/>
                </q-popup-edit>
                <q-btn dense flat icon="add" size="sm"></q-btn>
              </div>
              <div>
                <q-btn dense flat icon="remove" @click="deleteGroup(prop.node.ID)"  size="sm"></q-btn>
              </div>
            </div>
          </template>
        </q-tree>
      </div>
    </template>

    <template v-slot:after>
      <q-tab-panels
        v-model="selected"
        animated
        transition-prev="jump-up"
        transition-next="jump-up"
      >
        <q-tab-panel :name="1">
          <div class="text-h4 q-mb-md">Welcome</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
        </q-tab-panel>

        <q-tab-panel :name="2">
          <div class="text-h4 q-mb-md">Food</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
        </q-tab-panel>

        <q-tab-panel :name="3">
          <div class="text-h4 q-mb-md">Room service</div>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem,
            quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In,
            libero.</p>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </q-splitter>
</template>

<script>
export default {
  name: 'AppGroups',
  props: {
    value: Array
  },
  data () {
    return {
      splitterModel: 40,
      editingGroups: false,
      apps: [
        {
          NickName: '小小情歌',
          Appid: 'xxqg'
        },
        {
          NickName: '滴滴情歌',
          Appid: 'ddqg'
        }
      ],
      selected: 0,
      simple: [
        {
          label: 'Relax Hotel',
          children: [
            {
              label: 'Food',
              icon: 'restaurant_menu'
            },
            {
              label: 'Room service',
              icon: 'room_service'
            },
            {
              label: 'Room view',
              icon: 'photo'
            }
          ]
        }
      ],
      groups: [
        {
          ID: 1,
          ParentID: 0,
          Name: '主分组1',
          Color: '',
          children: []
        },
        {
          ID: 2,
          ParentID: 0,
          Name: '主分组2',
          Color: '',
          children: []
        },
        {
          ID: 3,
          ParentID: 2,
          Name: '子分组2-1',
          Color: '',
          children: []
        }
      ],
      group: {
        ID: 0,
        ParentID: 0,
        Name: '',
        Color: '',
        children: []
      }
    }
  },
  computed: {
    selectedAppids: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    treeNodes: {
      get () {
        const root = {
          ID: 0,
          Name: '公众号分组列表',
          children: []
        }
        const nodeMaps = {}
        for (const group of this.groups) {
          nodeMaps[group.ID] = group
        }
        const ids = Object.keys(nodeMaps)
        for (const id of ids) {
          const node = nodeMaps[id]
          if (node.ParentID === 0) {
            root.children.push(node)
          } else {
            nodeMaps[node.ParentID].children.push(node)
          }
        }
        return [root]
      }
    }
  },
  methods: {
    saveGroupName (name, groupID) {
      console.log(name, groupID)
    }
  }
}
</script>

<style scoped>

</style>
