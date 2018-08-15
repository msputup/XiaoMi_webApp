<template>
  <div class="content app-view app-view-with-footer">
    <header class="hd">
      <div class="user ui-flex align-center">
        <div class="img"><img src="../assets/images/avatar.png"></div>
        <div class="name">登录/注册</div>
      </div>
    </header>
    <div class="b1 ui-flex align-center justify-space-between">
      <div class="cite">我的订单</div>
      <div class="span ui-flex align-center"><a href="/order/list" class="">全部订单</a></div>
    </div>
    <ul class="b2 ui-flex align-center justify-space-between">
      <li class="dfk">
        <a>
          <div class="icon"></div><span>待付款</span>
        </a>
      </li>
      <li class="dah">
        <a>
          <div class="icon"></div><span>待收货</span>
        </a>
      </li>
      <li class="thx">
        <a>
          <div class="icon"></div><span>退换修</span></a>
      </li>
    </ul>
    <div class="ui-line"></div>
    <ul class="items">
      <li class="i-member"><a><cite data-v-172bb70c="">会员中心</cite></a></li>
      <li class="i-wallet"><a><cite data-v-172bb70c="">我的优惠</cite></a></li>
    </ul>
    <div class="ui-line"></div>
    <ul class="items">
      <li class="i-service"><a><cite data-v-172bb70c="">服务中心</cite></a></li>
      <li class="i-mihome"><a><cite data-v-172bb70c="">小米之家</cite></a></li>
    </ul>
    <div class="ui-line"></div>
    <ul class="items">
      <li class="i-fcode"><a><cite data-v-172bb70c="">F码通道</cite></a></li>
    </ul>
    <div class="ui-line"></div>
    <ul class="items">
      <li class="i-setting"><a><cite data-v-172bb70c="">设置</cite></a></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.app-view {
    position: absolute;
    z-index: 999;
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

.content {
    background: #f5f5f5!important;
}

.hd {
  background:url(../assets/images/bg.png) center 0 #f37d0f;
  background-size: auto 100%;
  padding: 32px 0;
}

.hd .img {
  margin: 0 16px 0 32px;
  width: 96px;
  height: 96px;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 100%;
  border: 3px solid hsla(0,0%,100%,.4);
  text-align: center;
}

.hd .img img{
  width: auto;
  height: 100%;
  margin: 0 auto;
}

.hd .name {
 color: #fff;
 font-size: 24px;
 text-align: left;
}

.b1 {
  background-color: #fff;
  height: 80px;
  border-bottom: 1px solid rgba(0,0,0,.15);
  color: rgba(0,0,0,.54);
  position: relative;
  padding-right: 56px;
}

.b1 .cite {
  font-size: 28px;
  padding: 0 0 0 32px;
  color: rgba(0,0,0,.87);
}

.b1 .span, .b1 a {
  font-size: 24px;
  color: rgba(0,0,0,.87);
}

.b2 {
  padding: 0 80px;
  background-color: #fff;
}

.b2 li{
  display: flex;
  align-content: space-between;
  position: relative;
  padding: 40px 0;
}

.b2 li .icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: url(../assets/images/waitpay.png) no-repeat center 0;
  background-size: 100% auto;
}

.b2 li span {
  font-size: 12px;
}
.b2 li.dah .icon{
  background: url(../assets/images/waitreceived.png) no-repeat center 0;
  background-size: 100% auto;
}

.b2 li.thx .icon{
  background: url(../assets/images/fix.png) no-repeat center 0;
  background-size: 100% auto;
}

.ui-line {
  height: 20px;
  background: #f5f5f5;
  overflow: hidden;
  clear: both;
}

.items{
  background: #fff;
}

.items li {
  position: relative;
  color: rgba(0,0,0,.54);
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAGXRFW…5j68ID9+a4K56r/NhJ4fK+9rVGSH8/KBUoFSgVKKT9K8AA9IsKmg8e+l8AAAAASUVORK5CYII=) no-repeat .32rem;
  background-size: 48px auto;
  border-bottom: 1px solid rgba(0,0,0,.15);
  line-height: 0;
}

.items li>a {
  display: block;
  padding-right: 56px;
  padding-left: 112px;
  height: 104px;
  display: box;
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  color: currentColor;
}

.items li>a cite {
  font-size: 28px;
  font-style: normal;
  color: rgba(0,0,0,.87);
}

.items li:last-child {
  border-bottom-color: #fff;
}

.items li:after {
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
</style>
