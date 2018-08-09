<template>
  <div class="list_action_title box-flex">
    <a href="#" v-for="(item,index) in body.items" :key="index">
      <div class="ti">{{item.action_title}} ></div>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: ['body']
}
</script>

<style scoped>
.list_action_title a {
  background: #fff;
  height: 100px;
  line-height: 100px;
  text-align:center;
  font-size: 28px;
}

.list_action_title .ti {
  color: rgba(0,0,0,.6)
}
</style>
