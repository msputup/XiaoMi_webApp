<template>
  <div class="repeat" :class="[listBody.view_type, needFlex? 'box-flex' : '']">
    <a href="#" :class="[needFlex2? 'box-flex' : '']" v-for="(item,index) in listBody.body.items" :key="index">
      <template v-if="listBody.view_type != 'list_one_type3'">
        <div class="img">
          <img :src="item.img_url" :style=[istwotype]>
          <div class="tag" v-if="item.product_tag"><img :src="item.product_tag" alt=""></div>
        </div>
      </template>
      <div class="info">
        <div class="name">{{item.product_name}}</div>
        <div class="brief">{{item.product_brief}}</div>
        <div class="price">{{item.product_price}}<span v-if="item.show_price_qi">起</span>
        <span class="price old" v-if="item.product_price != item.product_org_price"><s>{{item.product_org_price}}</s></span>
        </div>
      </div>
      <template v-if="listBody.view_type == 'list_one_type3'">
        <div class="img">
          <img :src="item.img_url" width="100%" height="100%">
          <div class="tag" v-if="item.product_tag"><img :src="item.product_tag" alt=""></div>
        </div>
      </template>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    needFlex () {
      if (this.listBody.view_type === 'list_two_type1') {
        return true
      }
    },
    needFlex2 () {
      if (this.listBody.view_type === 'list_one_type2' || this.listBody.view_type === 'list_one_type3') {
        return true
      }
    },
    istwotype () {
      if (this.listBody.view_type === 'list_two_type1') {
        return {
          width: '100%',
          height: '100%'
        }
      }
    }
  },
  // 传过来的应该是sections[x],body的上级，要附带view_type。数据在listBody.body中
  props: ['listBody']
}
</script>

<style scoped>
/* 重写 */

.list_two_type1 a{
  width:371px;
}
.list_two_type1 a:first-child {
  margin-right: 7px;
}

.list_two_type1 .tag {
  position: absolute;
  top: 0;
  left: 0;
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
  display: inline-block;
  padding-left: 14px;
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

.list_one_type2 a,.list_one_type3 a{
  width: 100%;
}

.list_one_type2 img,.list_one_type3 img {
  width: 375px;
  height: 375px;
  display: block;
}

.list_one_type2 .info,.list_one_type3 .info {
  padding:64px 12px 0px 32px;
  width:375px;
  height:375px;
}

.list_one_type2 .name,.list_one_type3 .name{
  font-size:28px;
  color:rgba(0,0,0,.87)
}

.list_one_type2 .brief,.list_one_type3 .brief{
  margin-top:6px;
  font-size:22px;
  line-height:35px;
  color: rgba(0,0,0,.54);
  white-space:normal!important;
}

.list_one_type2 .price,.list_one_type3 .price {
  margin-top: 2px;
  padding-left:12px;
}

.list_one_type2 .price::before,.list_one_type3 .price::before {
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size:21px;
  text-decoration: none;
}

.repeat .img {
  width:375px;
  height:375px;
  position: relative;
  overflow: hidden;
  display: block;
}

.repeat .info {
  text-align: left;
}

.repeat .name,.repeat .brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repeat .price {
  font-size: 28px;
  color: #ea625b;
  height: 42px;
  line-height:42px;
  position: relative;
  display: inline-block;
}

.repeat .price::before{
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 21px;
  text-decoration: none;
}
</style>
