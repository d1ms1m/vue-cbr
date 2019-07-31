/**
 * TreeNodeAttribute data struct
 * @param data: treenode's attribute params
 *   id: id
 *   editable: (boolean) attribute edit state
 *   key: attribute key
 *   value: attribute value
 */

const DEFAULT_ATTRIBUTE_KEY = 'new attr key'
const DEFAULT_ATTRIBUTE_VALUE = 'new attr value'

const TreeNodeAttribute = function (data) {
  this.id = data.id || new Date().valueOf()
  this.editable = data.editable || false
  this.key = data.key || DEFAULT_ATTRIBUTE_KEY
  this.value = data.value || DEFAULT_ATTRIBUTE_VALUE

  // other params
  for (var k in data) {
    if (k !== 'id' && k !== 'editable' && k !== 'key' && k !== 'value') {
      this[k] = data[k]
    }
  }
}

exports.TreeNodeAttribute = TreeNodeAttribute
