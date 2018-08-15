<template>
  <div class="repeat" :class="[listBody.view_type, needFlex? 'box-flex' : '']" :style=[bg_color]>
    <a href="#" :class="[needFlex2? 'box-flex' : '']" v-for="(item,index) in listBody.body.items" :key="index">
      <template v-if="listBody.view_type != 'list_one_type3'">
        <div class="img">
          <img v-lazy="item.img_url" :style=[imgStyle]>
          <div class="tag" v-if="item.product_tag">
            <img v-lazy="item.product_tag" alt="">
          </div>
          <div class="tag2" v-if="item.product_tag_array">
            <img v-lazy="item.product_tag_array[0]" alt="">
          </div>
        </div>
      </template>
      <div class="info" :class="[bgw ? 'bgw':'',list_type_13 ? 'align-center':'']">
        <template v-if="listBody.view_type == 'list_one_type12' || listBody.view_type == 'list_one_type14'">
          <div class="l l1">
            <div class="name fz-m">{{item.product_name}}</div>
            <div class="price">
              {{item.product_price}}
              <span v-if="item.show_price_qi">起</span>
              <div class="price old" v-if="item.product_price != item.product_org_price && listBody.view_type == 'list_one_type14'"><s>{{item.product_org_price}}</s></div>
            </div>
          </div>
          <div class="l l2">
            <div class="brief">{{item.product_brief}}</div>
            <div class="price old" v-if="item.product_price != item.product_org_price && listBody.view_type != 'list_one_type14'"><s>{{item.product_org_price}}</s></div>
            <div class="buybtn" v-if="item.btn_txt">{{item.btn_txt}}</div>
          </div>
        </template>
        <template v-else>
          <div class="name">{{item.product_name}}</div>
          <div class="brief">{{item.product_brief}}</div>
          <div class="price">{{item.product_price}}<span v-if="item.show_price_qi">起</span>
          <span class="price old" v-if="item.product_price != item.product_org_price"><s>{{item.product_org_price}}</s></span>
          </div>
          <div class="buybtn" :class="[list_type_13?'mauto':'']" v-if="item.btn_txt">{{item.btn_txt}}</div>
        </template>
      </div>
      <template v-if="listBody.view_type == 'list_one_type3'">
        <div class="img">
          <img v-lazy="item.img_url" width="100%" height="100%">
          <div class="tag" v-if="item.product_tag"><img v-lazy="item.product_tag" alt=""></div>
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
      if (this.listBody.view_type === 'list_two_type1' || this.listBody.view_type === 'list_two_type13') {
        return true
      }
    },
    needFlex2 () {
      if (this.listBody.view_type === 'list_one_type2' || this.listBody.view_type === 'list_one_type3') {
        return true
      }
    },
    imgStyle () {
      if (this.listBody.view_type === 'list_two_type1' || this.listBody.view_type === 'list_one_type12' || this.listBody.view_type === 'list_one_type14') {
        return {
          width: '100%',
          height: '100%'
        }
      } else if (this.listBody.view_type === 'list_two_type13') {
        return {
          width: `${344 / 7.2}vw`,
          height: `${288 / 7.2}vw`
        }
      }
    },
    bg_color () {
      if (this.listBody.body.bg_color) {
        return {
          backgroundColor: this.listBody.body.bg_color
        }
      }
    },
    bgw () {
      if (this.listBody.view_type === 'list_one_type14' || this.listBody.view_type === 'list_two_type13') {
        return true
      }
    },
    list_type_13 () {
      if (this.listBody.view_type === 'list_two_type13') {
        return true
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

/* .list_two_type1 .tag {
  position: absolute;
  top: 0;
  left: 0;
}

.list_two_type1 .tag img {
  width: 120px;
} */
/* .list_two_type1 .info{
  padding:20px 27px;
} */

.list_two_type1 .name {
  font-size: 28px;
}

.list_two_type1 .brief {
  line-height: 30px;
}

/* .list_two_type1 .price {
  display: inline-block;
  padding-left: 14px;
} */

.list_two_type1 .price span {
  display: inline-block;
  font-size:20px;
  line-height: 42px;
}

.list_two_type1 .price .old {
  display: inline-block;
  margin: 0 10px;
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
}

.list_one_type2 .brief,.list_one_type3 .brief{
  line-height:35px;
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

.list_one_type2 .img,.list_one_type3 .img,.list_two_type1 .img {
  width:375px;
  height:375px;
  display: block;
}

.list_one_type12 a,.list_one_type14 a {
  position: relative;
  width: 100%;
  display: block;
}

/* .list_one_type12 .info {
  padding: 20px 27px;
} */

.list_two_type13 {
  padding: 0 12px;
  width: 100%;
  overflow: hidden;
  text-align: center;
}

.list_two_type13 a {
  width:340px;
}

.list_two_type13 a:first-child {
  margin-right: 12px;
}

.repeat .l {
  display:flex;
  overflow:hidden;
  -webkit-box-align: justify;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
}

.list_one_type14 a {
  padding: 0 12px;
}

.fz-m {
  font-size: 32px!important;
}

.repeat .bgw {
  background-color: #fff;
  margin-top: -10px;
}
.repeat .img {
  position: relative;
  overflow: hidden;
}

.repeat .info {
  text-align: left;
  padding: 20px 27px;
}

.repeat .info .old {
  font-size: 22px;
  color: rgba(0,0,0,.54);
}

.repeat .name {
  font-size: 28px;
  color:rgba(0,0,0,.87)
}
.repeat .brief {
  margin-top:6px;
  font-size: 22px;
  color: rgba(0,0,0,.54);
}
.repeat .name,.repeat .brief {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repeat .tag {
  position: absolute;
  top: 0;
  left: 0;
}

.repeat .tag img {
  width: 120px;
}

.repeat .tag2 {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.repeat .tag2 img {
  display:inline-block;
  width:100px;
  height:auto;
}
.repeat .price {
  font-size: 28px;
  color: #ea625b;
  height: 42px;
  line-height:42px;
  position: relative;
  display: inline-block;
  padding-left: 14px;
}

.repeat .price::before{
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 21px;
  text-decoration: none;
}

.repeat .buybtn {
    width: 200px;
    background: #ea625b;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    padding: 16px 0;
    font-weight: 700;
}

.repeat .align-center {
  text-align: center!important;
}
.repeat .mauto {
  margin:0 auto;
}
</style>
