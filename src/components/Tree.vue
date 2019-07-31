<template>
    <vue-tree-list @click="onClick" @delete-node="onDeleteNode" @add-node="onAddChild" :model="data" default-tree-node-name="new child node"
                   default-leaf-node-name="new child leaf">
    </vue-tree-list>
</template>
<script>
/* global $ */
import VueTreeList from 'vue-tree-list'

export default {
  components: {
    'VueTreeList': VueTreeList.VueTreeList
  },
  name: 'Tree',
  data () {
    return {
      treeJSON: {},
      selectedNode: {},
      breadcrumbPath: [],
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
      this.changeSelectedNode(node)
    },
    addNode: function () {
      console.log('tree.addNode')
      let node = new VueTreeList.TreeNode({name: 'new Node', isLeaf: false, attributes: []})
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
      this.changeSelectedNode(node)
      this.$emit('node-added', node)
    },
    onAddChild (node) {
      this.changeSelectedNode(node)
    },
    getTreeJSON: function () {
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

      this.treeJSON = _dfs(this.data)
      this.$emit('got-tree-json', this.treeJSON)
    },
    changeSelectedNode: function (node) {
      this.selectedNode = node
      this.getBreadcrumbPath(node)
      // подсветка выбранного node
      $('.vtl-tree-node.selected').toggleClass('selected') // убрать
      $('#' + node.id).toggleClass('selected') // // подсветить

      this.$emit('selected-node-changed')
    },
    getBreadcrumbPath: function (selectedNode) {
      let node = this.findNodeById(this.data.children, selectedNode.id)
      let result = []
      result.unshift(node.name)
      while (node.pid !== 0) {
        node = this.findNodeById(this.data.children, node.pid)
        result.unshift(node.name)
      }
      this.breadcrumbPath = result
    },
    findNodeById: function (data, id) {
      var ret = -1
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          return data[i]
        } else if (data[i].children && data[i].children.length && typeof data[i].children === 'object') {
          ret = this.findNodeById(data[i].children, id)
          if (ret.id === id) {
            return ret
          }
        }
      }
      return ret
    }
  }
}
</script>

<style>
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
        color: lightgray;
        position: relative;
    }

    .vtl .vtl-disabled::after {
        content: 'disabled';
    }

    .vtl-tree-node:hover {
        cursor: pointer;
    }

    .vtl-tree-node.selected:hover {
        background-color: #FBBD08;
    }
    .vtl-tree-node.selected {
        color: black;
        background-color: #FBBD08;
    }
    .vtl-tree-node.selected.vtl-disabled {
        color: grey;
        background-color: #FBBD08;
    }
</style>
