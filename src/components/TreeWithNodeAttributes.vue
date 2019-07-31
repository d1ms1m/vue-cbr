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
                            <button class="ui compact labeled icon button" @click="addNode">
                                <i class="plus icon"></i>
                                Add tree node
                            </button>
                            <div class="ui yellow segment">
                                <tree ref="tree" @got-tree-json="onGotTreeJSON" @selected-node-changed="onSelectedNodeChanged"></tree>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui raised link card">
                    <div class="content">
                        <div class="header left aligned">Node attributes</div>
                        <div class="meta left aligned">
                            <breadcrumb v-if="breadcrumbPath.length > 0" :path="breadcrumbPath"></breadcrumb>
                            <span v-else>click on tree node</span>
                        </div>
                        <div v-show="selectedNode.name" class="description">
                            <button class="ui compact labeled icon button" @click="addAttribute">
                                <i class="plus icon"></i>
                                Add node attribute
                            </button>
                            <node-attributes ref="nodeAttributes" :selectedNode="selectedNode"></node-attributes>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui left aligned segment">
            <button class="ui compact labeled icon button" @click="getTreeJSON">
                <i class="sign out alternate icon"></i>
                Show tree JSON
            </button>
            <pre>{{treeJSON}}</pre>
        </div>
    </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Tree from '@/components/Tree'
import NodeAttributes from '@/components/NodeArrtibutes'

export default {
  name: 'tree-with-node-attributes',
  components: {
    NodeAttributes,
    Tree,
    Breadcrumb
  },
  data () {
    return {
      treeJSON: {},
      selectedNode: {},
      breadcrumbPath: []
    }
  },
  methods: {
    addNode: function () {
      this.$refs.tree.addNode()
    },
    addAttribute: function () {
      this.$refs.nodeAttributes.addAttribute()
    },
    getTreeJSON: function () {
      this.$refs.tree.getTreeJSON()
    },
    onGotTreeJSON: function (json) {
      this.treeJSON = json
    },
    onSelectedNodeChanged: function () {
      this.breadcrumbPath = this.$refs.tree.breadcrumbPath
      this.selectedNode = this.$refs.tree.selectedNode
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
</style>
