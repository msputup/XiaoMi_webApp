<template>
  <div class ='component-list-main'>
    <div v-for='(list,index) in sections' :key='index'>
      <gallery v-if="list.view_type === 'gallery'" :body="list.body"></gallery>
      <cellsAutoFill v-else-if="list.view_type === 'cells_auto_fill'" :body="list.body"></cellsAutoFill>
      <dividerLine v-else-if="list.view_type === 'divider_line'" :body="list.body"></dividerLine>
      <!-- <listTwoType v-else-if="list.view_type === 'list_two_type1'" :body="list.body"></listTwoType> -->
      <listMerga v-else-if="list.view_type === 'list_two_type1'" :listBody="list"></listMerga>
      <listMerga v-else-if="list.view_type === 'list_one_type2'" :listBody="list"></listMerga>
      <listMerga v-else-if="list.view_type === 'list_one_type3'" :listBody="list"></listMerga>
      <listActionTitle v-else-if="list.view_type === 'list_action_title'" :body="list.body"></listActionTitle>
    </div>
  </div>
</template>

<script>
import gallery from './gallery'
import cellsAutoFill from './cellsAutoFill'
import dividerLine from './dividerLine'
// import listTwoType from './listTwoType'
import listActionTitle from './listActionTitle'
// import listOneType2 from './listOneType2'
// import listOneType3 from './listOneType3'
import listMerga from './listMerga'
export default {
  props: ['sections'],
  data () {
    return {

    }
  },
  components: {
    // gallery, cellsAutoFill, dividerLine, listTwoType, listActionTitle, listOneType2, listOneType3
    gallery, cellsAutoFill, dividerLine, listActionTitle, listMerga
  }
}
</script>

<style scoped>

</style>
