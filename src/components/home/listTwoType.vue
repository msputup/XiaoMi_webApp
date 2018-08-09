<template>
  <div class="list_two_type1 box-flex">
    <a href="#" v-for="(item,index) in body.items" :key="index">
      <div class="img">
        <img :src="item.img_url" width="100%" height="100%">
        <div class="tag" v-if="item.product_tag"><img :src="item.product_tag" alt=""></div>
      </div>
      <div class="info">
        <div class="name">{{item.product_name}}</div>
        <div class="brief">{{item.product_brief}}</div>
        <div class="price">{{item.product_price}}<span v-if="item.show_price_qi">起</span>
        <span class="price old" v-if="item.product_price != item.product_org_price"><s>{{item.product_org_price}}</s></span>
        </div>
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
.list_two_type1 a{
  width:371px;
}
.list_two_type1 a:first-child {
  margin-right: 7px;
}

.list_two_type1 .img{
  width:371px;
  height:371px;
  position: relative;
  overflow: hidden;
  display: block;
}

.list_two_type1 .tag {
  position: absolute;
  top: 0;
  left: 0;
}

.list_two_type1 .tag img {
  width: 120px;
}
.list_two_type1 .info{
  padding:20px 27px;
  text-align: left;
}

.list_two_type1 .name, .list_two_type1 .brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list_two_type1 .name {
  font-size: 28px;
  color: rgba(0,0,0,.87);
}

.list_two_type1 .brief {
  margin-top:6px;
  font-size: 22px;
  line-height: 30px;
  color: rgba(0,0,0,.54)
}

.list_two_type1 .price {
  font-size: 28px;
  color: #ea625b;
  line-height: 42px;
  position: relative;
  display: inline-block;
  padding-left: 14px;
}

.list_two_type1 .price::before{
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 21px;
  text-decoration: none;
}

.list_two_type1 .price span {
  display: inline-block;
  font-size:20px;
  line-height: 42px;
}

.list_two_type1 .price .old {
  display: inline-block;
  margin: 0 10px;
  font-size: 22px;
  color: rgba(0,0,0,.54);
}
</style>
