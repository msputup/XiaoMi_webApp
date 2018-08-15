<template>
  <div class="container app-view app-view-with-header app-view-with-footer">
    <div class="page-wrap">
      <div class="nologin">
        <a class="box-flex align-center justify-space-between">
          <span class="flex">登录后享受更多优惠</span>
          <em class="flex">去登录</em>
        </a>
      </div>
      <div class="noitems">
        <a href="">
          <span>购物车还是空的</span>
          <em>去逛逛</em>
        </a>
      </div>
      <MiRecommend :api="recommendApi" />
    </div>
  </div>
</template>

<script>
import MiRecommend from '../components/product/MiRecommend'
export default {
  data () {
    return {
      recommendApi: 'recommend'
    }
  },
  components: {
    MiRecommend
  }
}
</script>

<style scoped>
.app-view {
  position: absolute;
  z-index: 998;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  transition: transform .4s cubic-bezier(.55,0,.1,1);
  will-change: transform;
  background: #fff;
  color: #3c3c3c;
}

.container {
  margin-right: auto;
  margin-left: auto;
  flex-basis: 100%;
}

.container.fluid {
  max-width: 100%;
  width: 100%;
}

.page-wrap {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.nologin>a {
  height: 104px;
  padding: 0 56px 0 32px;
  position: relative;
  color: rgba(0,0,0,.54);
}

.nologin>a:after {
content: "";
  position: absolute;
  right: 32px;
  top: 50%;
  width: 18px;
  height: 18px;
  border-left: 1px solid currentColor;
  border-top: 1px solid currentColor;
  transform: translate3d(0,-50%,0) rotate(135deg);
  -webkit-transform: translate3d(0,-50%,0) rotate(135deg);
}

.nologin>a span {
  font-size: 32px;
  color: rgba(0,0,0,.87);
  display: block;
}

.nologin>a em {
  font-style: normal;
  font-size: 24px;
  text-align: right;
}

.noitems {
    background: #ebebeb;
    padding: 20px;
    text-align: center;
}
.noitems>a {
  height: 144px;
  font-size: 24px;
  text-decoration: none;
  text-align: center;
}

.noitems>a span {
  display:inline-block;
  line-height: 80px;
  background:url(../assets/images/no_shop.png) no-repeat 0;
  background-size: auto 100%;
  padding: 0 16px 0 96px;
  color: rgba(0,0,0,.27)
}

.noitems>a em {
    display: inline-block;
    border: 1px solid rgba(0,0,0,.15);
    box-sizing: border-box;
    height: 50px;
    line-height: 50px;
    padding: 0 24px;
    color: rgba(0,0,0,.87);
    font-style: normal;
}
</style>
