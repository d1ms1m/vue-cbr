<template>
    <div class="ui breadcrumb">
        <div v-for="(item, index) in path" :key="index" class="section" :class="{ active: isActive(index) }">
            {{item}}
            <i v-if="index !== path.length - 1 " class="right chevron icon divider"></i>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    path: Array,
    default: []
  },
  methods: {
    isActive: function (i) {
      return i === this.path.length - 1
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .active {
        color: #1e70bf;
    }
</style>
