<template>
    <div class="cbr-tree-view">
        <div class="ui raised very padded segment">
            <div class="ui two cards">
                <div class="ui raised link card">
                    <div class="content">
                        <div class="header left aligned">TreeView</div>
                        <div class="meta left aligned">by <a
                                href="https://github.com/ParadeTo/vue-tree-list" target="_blank">ParadeTo</a></div>
                        <div class="description">
                            <button class="ui compact labeled icon button" @click="addRootNode">
                                <i class="plus icon"></i>
                                Add tree node
                            </button>
                            <div class="ui yellow segment">
                                <vue-tree-list @click="onClick" @delete-node="onDeleteNode" @add-node="onAddChild" :model="data" default-tree-node-name="new child node"
                                               default-leaf-node-name="new child leaf"></vue-tree-list>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui raised link card">
                    <div class="content">
                        <div class="header left aligned">Node attribute</div>
                        <div class="meta left aligned">{{ selectedNode.name ? selectedNode.name : 'click on tree node' }}</div>
                        <div v-show="selectedNode.name" class="description">
                            <button class="ui compact labeled icon button" @click="addAttribute">
                                <i class="plus icon"></i>
                                Add node attribute
                            </button>
                            <table class="ui striped selectable fixed yellow table">
                                <thead>
                                    <tr>
                                        <th class="six wide">Key</th>
                                        <th class="seven wide">Value</th>
                                        <th class="three wide"></th>
                                    </tr>
                                </thead>
                                <tbody v-if="selectedNode.attributes && selectedNode.attributes.length > 0">
                                    <tr v-for="(attr, index) in selectedNode.attributes" :key="index">
                                        <td>
                                            <span v-if="!attr.editable" :title="attr.key">{{ attr.key }}</span>
                                            <div v-else>
                                                <input type="text" v-model="attr.key" style="width: inherit">
                                            </div>
                                        </td>
                                        <td>
                                            <span v-if="!attr.editable" :title="attr.value">{{ attr.value }}</span>
                                            <div v-else>
                                                <input type="text" v-model="attr.value">
                                            </div>
                                        </td>
                                        <td>
                                            <i class="icon" title="toggle edit mode" v-bind:class="{'sticky note outline': attr.editable, 'edit outline': !attr.editable}" @click="editAttribute(index)"></i>
                                            <i class="trash icon" title="delete" @click="deleteAttribute(index)"></i>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="2" class="center aligned">empty</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui left aligned segment">
            <button class="ui compact labeled icon button" @click="getNewTree">
                <i class="sign out alternate icon"></i>
                Show tree JSON
            </button>
            <pre>{{newTree}}</pre>
        </div>
    </div>
</template>

<script>
import VueTreeList from 'vue-tree-list'

const DEFAULT_ATTRIBUTE_KEY = 'new attr key'
const DEFAULT_ATTRIBUTE_VALUE = 'new attr value'

const TreeNodeAttribute = function (data) {
  const { id, attr } = data
  this.id = (typeof id === 'undefined') ? new Date().valueOf() : id
  this.editable = false
  this.key = (typeof attr !== 'undefined' && attr.key) ? attr.key : DEFAULT_ATTRIBUTE_KEY
  this.value = (typeof attr !== 'undefined' && attr.value) ? attr.value : DEFAULT_ATTRIBUTE_VALUE
}

export default {
  name: 'cbr-tree-view',
  components: {
    'VueTreeList': VueTreeList.VueTreeList
  },
  props: {
    defaultAttributeKey: {
      type: String,
      default: DEFAULT_ATTRIBUTE_KEY
    },
    defaultAttributeValue: {
      type: String,
      default: DEFAULT_ATTRIBUTE_VALUE
    }
  },
  data () {
    return {
      record: null,
      newTree: {},
      selectedNode: {},
      data: new VueTreeList.Tree([
        {
          name: 'Node 1',
          id: 1,
          pid: 0,
          dragDisabled: true,
          children: [
            {
              name: 'Leaf 1-1',
              id: 2,
              isLeaf: true,
              pid: 1,
              attributes: [{id: 1, editable: false, key: 'title', value: 'test title'}, {id: 2, editable: false, key: 'title2', value: 'test title2'}, {id: 5, editable: false, key: 'title6', value: 'test title6'}]
            }
          ],
          attributes: [{id: 1, editable: false, key: 'Node 1 title', value: 'test Node 1 title'}]
        },
        {
          name: 'Node 2',
          id: 3,
          pid: 0,
          disabled: true,
          attributes: []
        },
        {
          name: 'Node 3',
          id: 4,
          pid: 0,
          attributes: []
        },
        {
          name: 'Node 4',
          id: 5,
          pid: 0,
          attributes: []
        },
        {
          name: 'Node 5',
          id: 6,
          pid: 0,
          attributes: []
        }
      ])
    }
  },
  methods: {
    onDeleteNode: function (node) {
      node.remove()
    },
    onClick: function (node) {
      this.selectedNode = node
    },
    getTreeChange: function () {
      this.record = Object.assign({}, VueTreeList.Record)
    },
    addRootNode: function () {
      let node = new VueTreeList.TreeNode({name: 'new Node', isLeaf: false, attributes: []})
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
      this.selectedNode = node
    },
    onAddChild (node) {
      this.selectedNode = node
    },
    getNewTree: function () {
      function _dfs (oldNode) {
        let newNode = {}

        for (let k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (let i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }

      this.newTree = _dfs(this.data)
    },
    addAttribute: function () {
      if (!this.selectedNode.attributes) {
        // this.selectedNode = Object.assign({}, this.selectedNode, {attributes: []})
        this.$set(this.selectedNode, 'attributes', [])
      }
      // вычисляем id
      let id = this.selectedNode.attributes.map(function (item) {
        return item.id
      }).sort().pop()
      id = isNaN(id) ? 0 : id + 1

      this.selectedNode.attributes.push(new TreeNodeAttribute({id}))
    },
    deleteAttribute: function (index) {
      this.selectedNode.attributes.splice(index, 1)
    },
    editAttribute: function (index) {
      let attr = this.selectedNode.attributes[index]
      attr.editable = !attr.editable
      this.$set(this.selectedNode.attributes, index, attr)
    }
  }
}
</script>

<style>
    .cbr-tree-view {
        width: 100%;
    }

    .ui.labeled.icon.button {
        display: block;
        margin-bottom: 1em;
    }

    .ui.table td:not(.trash-icon) {
        cursor: pointer;
    }

    .ui.table td,
    .ui.table thead th {
        padding: 5px 11px;
    }

    .ui.link.card:hover {
        cursor: default;
    }

    input {
        min-width: 100%;
        max-width: 100%;
    }

    .trash.icon {
        color: lightcoral;
    }

    .trash.icon:hover {
        cursor: pointer;
    }

    .vtl .vtl-drag-disabled, .vtl .vtl-drag-disabled:hover {
        background-color: whitesmoke;
        position: relative;
    }

    .vtl .vtl-drag-disabled::after, .vtl .vtl-disabled::after {
        content: 'drag disabled';
        position: absolute;
        right: 10px;
        font-size: 12px;
        font-style: italic;
    }

    .vtl .vtl-disabled, .vtl .vtl-disabled:hover {
        background-color: lightcoral;
        position: relative;
    }

    .vtl .vtl-disabled::after {
        content: 'disabled';
    }

    .vtl-tree-node:hover {
        cursor: pointer;
    }
</style>
