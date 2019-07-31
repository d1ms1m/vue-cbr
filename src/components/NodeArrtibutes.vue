<template>
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
</template>

<script>
import { TreeNodeAttribute } from '@/components/models/TreeNodeAttribute.js'

export default {
  name: 'NodeAttributes',
  props: {
    selectedNode: {
      type: Object
    }
  },
  methods: {
    addAttribute: function () {
      if (!this.selectedNode.attributes) {
        this.$set(this.selectedNode, 'attributes', [])
      }
      let id = this.selectedNode.attributes.map(item => item.id).reduce((acc, cur) => Math.max(acc, cur), Number.NEGATIVE_INFINITY)
      id = isNaN(id) ? 0 : id + 1

      this.selectedNode.attributes.push(new TreeNodeAttribute({id: id}))
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ui.table td:not(.trash-icon) {
        cursor: pointer;
    }

    .ui.table td,
    .ui.table thead th {
        padding: 5px 11px;
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
</style>
