<template>
<div class="app-view">
  <div class="container fluid">
    <header>
      <div class="fill-height layout align-center">
        <a class="header-btn">
          <i class="iconfont icon-back"></i>
        </a>
        <div class="placeholder"></div>
        <a class="header-btn share-btn">
          <i class="iconfont icon-share"></i>
        </a>
      </div>
    </header>
    <galleryView :gallery = "galleryView"></galleryView>
    <div class="overview">
      <div class="goods-name ui-flex align-center justify-start">{{titleView.name}}</div>
      <div class="goods-brief" v-html="titleView.product_desc"></div>
      <div class="goods-price layout align-end justify-start">
        <div class="price cur-price">{{titleView.price}}</div>
        <div class="price origin-price" v-if="titleView.market_price != titleView.price">{{titleView.market_price}}</div>
      </div>
    </div>
    <div class="product-section more" v-if="titleView.canJoinActs">
      <div class="border-top-1px ui-flex align-start justify-start">
        <div class="title">促销</div>
        <div class="flex pt1-2x">
          <div class="ui-flex align-center justify-start act-icon mb2x">
            <div class="icon-desc border-1px">{{titleView.canJoinActs[0].type_desc}}</div>
            <div class="icon-title">{{titleView.canJoinActs[0].title}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-section more mt2x padding-16-32">
      <div class="ui-flex align-start justify-start">
        <div class="title">已选</div>
        <div class="flex">
          <div class="info">{{goods_info[0].name}} x 1</div>
        </div>
      </div>
    </div>
    <div class="product-section more padding-16-32">
      <div class="border-top-1px ui-flex align-start justify-start">
        <div class="title">送至</div>
        <div class="flex">
          <div class="info">
            <span class="mr1x">北京市 东城区</span>
            <span class="on">{{goods_info[0].is_stock | isStock}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="product-section padding-16-32">
      <div class="border-top-1px ui-flex align-center justify-start service-policy-list">
        <div class="flex service-policy-item" v-for="(item,index) in goods_info[0].service_refound_policy_list.list" :key="index">
          <img v-lazy="item.img_url" class="mr1x img-icon">
          <span class="fsc1">{{item.item_name}}</span>
        </div>
      </div>
    </div>

    <commentView :comment="commentView"></commentView>
    <descTabsView :descTabs="descTabsViewData"></descTabsView>
    <MiRecommend :api="recommendApi" :query="recommendQuery" />
  </div>

  <footer>
    <div class="fill-height layout align-center">
      <router-link :to="{name:'home'}" class="footer-btn">
        <i class="iconfont icon-home"></i>
        <span>首页</span>
      </router-link>
      <router-link :to="{name:'cart'}" class="footer-btn">
        <i class="iconfont icon-cart"></i>
        <span>购物车</span>
        <em v-if="count" class="bubble">count</em>
      </router-link>
      <div class="action-box flex">
        <a class="btn buy-btn">加入购物车</a>
      </div>
    </div>
  </footer>
  <!-- <MiAddressAll v-model="showRegions" @region="changeRegion"/> -->
</div>
</template>

<script>
import fetch from '@/api/'
import purify from 'dompurify'

import galleryView from '@/components/product/galleryView'
import commentView from '@/components/product/commentView'
import descTabsView from '@/components/product/descTabsView'
import MiRecommend from '@/components/product/MiRecommend'
export default {
  data () {
    return {
      galleryView: null,
      titleView: null,
      goods_info: null,
      commentView: null,
      descTabsViewData: null,
      recommendApi: 'productRecommend',
      recommendQuery: {product_id: this.$route.params.id}
    }
  },
  beforeRouteEnter (to, from, next) {
    let query = {
      commodity_id: to.params.id
    }
    if (from.name) {
      fetch('productView', query).then(res => {
        next(vm => vm.setData(res))
      })
    } else {
      next(vm => vm.getData())
    }
  },
  methods: {
    getData () {
      let query = {
        commodity_id: this.$route.params.id
      }
      this.$fetch('productView', query).then(res => {
        this.setData(res)
      })
    },
    setData (res) {
      let data = res.data
      this.galleryView = data.data.view_content.galleryView
      let titleView = data.data.view_content.titleView.titleView
      titleView.product_desc = purify.sanitize(titleView.product_desc)
      this.titleView = titleView
      this.goods_info = data.data.goods_info
      this.commentView = data.data.view_content.commentView.commentView
      this.descTabsViewData = data.data.view_content.descTabsView.descTabsView
    }
  },
  components: {
    galleryView, commentView, descTabsView, MiRecommend
  },
  filters: {
    isStock: (judge) => {
      if (judge) {
        return '有现货'
      } else {
        return '暂时无货'
      }
    }
  }
}
</script>

<style>
.app-view {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
}
.container {
  position: relative;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background: #efefef;
  flex-basis: 100%;
  padding-bottom: 104px;
}
.container.fluid {
  max-width: 100%;
  width: 100%;
}
header {
  height: 50px;
  background: transparent;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  z-index: 10;
}

header .header-btn {
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 20px;
  color: #ddd;
  background: rgba(0,0,0,.6);
  border-radius: 50%;
}
header .iconfont {
  font-size: 36px;
  line-height: 60px;
  margin-left: 10px;
}
header .placeholder {
  flex: 1;
}

/* .container .gallery-view {
  background: #ccc;
  width: 100%;
  height: 792px;
}

.container .gallery-view img {
  display: block;
  width: auto;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  transform: translate(-50%,-50%);
  position: absolute;
  left: 50%;
  top: 50%;
} */

.container .overview {
  background: #fff;
  text-align: left;
  padding: 20px 32px 0;
}
.container .overview .goods-name {
  font-size: 34px;
  line-height: 56px;
}
.container .overview .goods-brief {
  font-size: 24px;
  line-height: 36px;
  color: rgba(0,0,0,.54);
}
.container .overview .goods-price {
  padding: 20px 0;
}
.container .overview .goods-price .cur-price {
  color: #ff6700;
  font-size: 48px;
  font-weight: 700;
}
.container .overview .goods-price .origin-price {
  margin-left: 8px;
  color: rgba(0,0,0,.54);
  font-size: 12px;
  text-decoration: line-through;
}

.container .product-section {
  position: relative;
  padding: 20px 32px 0;
  background: #fff;
  border-top: 1px;
  text-align: left;
}

.container .product-section .title {
  width: 82px;
  font-size: 24px;
  color: rgba(0,0,0,.54);
  line-height: 40px;
}

.container .product-section .act-icon {
  position: relative;
  padding-right: 10%;
  white-space: nowrap;
}

.container .product-section .act-icon .icon-desc {
  color: #f56600;
  border-radius: 1px;
  padding: 3px 5px 1px;
  margin: 0 0 1px;
  font-size: 16px;
}

.container .product-section .act-icon .icon-desc:before {
  border-color: #f56600;
}

.container .product-section .act-icon .icon-title {
  margin-left: 8px;
  font-size: 24px;
  color: rgba(0,0,0,.87);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.container .product-section.padding-16-32 {
  padding: 16px 32px;
}

.container .product-section .info {
  font-size: 24px;
  color: rgba(0,0,0,.87);
  line-height: 40px;
  padding-right: 20px;
}
.container .product-section .info .on {
  color: #f56600;
}
.container .product-section .service-policy-item {
  font-size: 24px;
  line-height: 40px;
  margin-right: 20px;
  flex: 0 1 auto;
}
.container .product-section .img-icon {
  height: 20px;
  width: auto;
}

.container .product-section .fsc1 {
  font-size: 20px;
  color: rgba(0,0,0,.54);
}

.container .product-section .service-policy-list {
  flex-wrap: wrap;
}
footer {
  height: 104px;
  background: #fff;
  box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
}
footer .footer-btn {
  display: block;
  text-decoration: none;
  width: 145px;
  color: rgba(0,0,0,.54);
  border-left: 1px solid #f4f4f4;
  display: flex;
  flex-direction: column;
  position: relative;
}
footer .footer-btn:first-child {
  border-left: none;
}

footer .iconfont {
  font-size: 40px;
}

footer .footer-btn span {
  font-size: 22px;
}
footer .action-box .buy-btn {
  height: 104px;
  line-height: 104px;
}

/* 地址pop */
.pop .h1 {
  color: rgba(0,0,0,.87);
  font-size: 16px;
  text-align: center;
  padding: 12px 0;
}
.max5 {
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.pop .address-item {
  text-align: left;
  padding: 8px 0;
}
.pop .address-item-line1 {
  font-size: 16px;
  color: rgba(0,0,0,.87);
  line-height: 20px;
}
.pop .address-item-line1 .address-item-name {
  margin-right: 5px;
}
.pop .address-item-line2 {
  font-size: 14px;
  color: rgba(0,0,0,.54);
  padding-left: 22px;
}
.pop .btn-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.icon-locationfill {
  font-size: 14px;
  margin-right: 8px;
}
.border-bottom-1px:before {
  transform:  scaleY(0.2);
}

.bubble {
  position: absolute;
  min-width: 14px;
  line-height: 14px;
  height: 14px;
  box-sizing: border-box;
  padding: 0 3px;
  font-size: 10px;
  overflow: hidden;
  text-align: center;
  border-radius: 10px;
  background: #ed4d41;
  color: #fff;
  top: 0;
  /* left: 50%; */
  transform: translate3d(40px,2px,0);
  font-style: normal;
}

.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-pagination-bullet-active {
  background: #fff;
}

/* common.css : more => ignore */
.more:after {
  content: "";
  position: absolute;
  right: 32px;
  top: 50%;
  width: 20px;
  height: 20px;
  border-left: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: translate3d(0,-50%,0) rotate(135deg);
}
.price {
    position: relative;
    padding-left: 26px;
    line-height: 40px;
}
.price:before {
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 36px;
  text-decoration: none;
}

</style>
