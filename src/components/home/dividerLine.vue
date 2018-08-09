<template>
    <div class="divlider_line"
      :style = "{height:`${body.line_height/72}vw`,borderBottom:`${body.line_height/7.2}vw solid ${body.line_color}`,backgroundColor: body.line_color}"
    >
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

</style>
