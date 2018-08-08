<template>
  <div class ='component-list-main'>
    <div v-for='(list,index) in sections' :key='index'>
      <gallery v-if="list.view_type === 'gallery'" :body="list.body"></gallery>
    </div>
  </div>
</template>

<script>
import gallery from './gallery'

export default {
  props: ['sections'],
  data () {
    return {

    }
  },
  components: {
    gallery
  }
}
</script>

<style scoped>

</style>
