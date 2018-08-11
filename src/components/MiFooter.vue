<template>
  <footer class="app-shell-footer">
    <div class="box-flex fill-height">
      <router-link
        class="flex"
        v-for="(nav,index) in navi"
        :key="index"
        :class="nav.name==$route.name?'on':''"
        :to="{name: nav.name}"
      >
      <i class="iconfont" :class="nav.icon"></i>
      <span>{{nav.name|chinese}}</span>
      </router-link>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      navi: [
        {
          name: 'home',
          icon: 'icon-home'
        },
        {
          name: 'category',
          icon: 'icon-categoryselected'
        },
        {
          name: 'cart',
          icon: 'icon-cart'
        },
        {
          name: 'user',
          icon: 'icon-flightpeople3'
        }
      ]
    }
  },
  filters: {
    chinese: (value) => {
      switch (value) {
        case 'home':
          return '首页'
        case 'category':
          return '分类'
        case 'cart':
          return '购物车'
        default:
          return '我的'
      }
    }
  }
}
</script>

<style scoped>
@import url("../assets/fonts/iconfont.css");
.app-shell-footer {
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  right: 0;
  height: 104px;
  background: #fff;
  box-shadow: 0 3px 14px 2px rgba(0,0,0,0.12);
}
.fill-height {
  height:100%;
  align-items:center;
}
.flex {
  display: block;
  color: #999;
  position: relative;
  text-align: center;
}

.flex span {
  font-size: 24px;
}
.iconfont {
  display: block;
  font-size: 48px;
}

.on {
  color:#ff6700;
}
</style>
