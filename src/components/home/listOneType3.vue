<template>
  <div class="list_one_type3">
    <a href="#" class="box-flex" v-for="(item,index) in body.items" :key="index">
      <div class="info">
        <div class="name">{{item.product_name}}</div>
        <div class="briefwrap">{{item.product_brief}}</div>
        <div class="price mt32">{{item.product_price}}</div>
      </div>
      <div class="img">
        <img :src="item.img_url">
      </div>
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
.list_one_type3 a {
  width: 100%;
}

.list_one_type3 .img {
  width:375px;
  height:375px;
  position: relative;
  overflow: hidden;
}
.list_one_type3 img {
  width: 375px;
  height: 375px;
  display: block;
}

.list_one_type3 .info {
  text-align:left;
  padding:64px 12px 0px 32px;
  width:375px;
  height:375px;
}

.list_one_type3 .name,{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size:28px;
  color:rgba(0,0,0,.87)
}

.list_one_type3 .briefwrap{
  margin-top:6px;
  font-size:22px;
  line-height:35px;
  color: rgba(0,0,0,.54);
  white-space:normal;
}

.list_one_type3 .price {
  margin-top: 2px;
  font-size: 28px;
  color: #ea625b;
  height: 42px;
  line-height:42px;
  position: relative;
  display: inline-block;
  padding-left:12px;
}

.list_one_type3 .price::before {
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size:21px;
  text-decoration: none;
}

</style>
