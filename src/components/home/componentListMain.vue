<template>
  <div class ='component-list-main'>
    <div v-for='(list,index) in sections' :key='index'>
      <gallery v-if="list.view_type === 'gallery'" :body="list.body"></gallery>
      <cellsAutoFill v-else-if="list.view_type === 'cells_auto_fill'" :body="list.body"></cellsAutoFill>
      <dividerLine v-else-if="list.view_type === 'divider_line'" :body="list.body"></dividerLine>
    </div>
  </div>
</template>

<script>
import gallery from './gallery'
import cellsAutoFill from './cellsAutoFill'
import dividerLine from './dividerLine'
export default {
  props: ['sections'],
  data () {
    return {

    }
  },
  components: {
    gallery, cellsAutoFill, dividerLine
  }
}
</script>

<style scoped>

</style>
