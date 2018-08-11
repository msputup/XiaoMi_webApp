<template>
  <div class="app-view app-view-with-footer">
    <preloading :isShow="showLoading"></preloading>
    <header class="header">
      <div class="app-header-wrapper">
        <div class="app-header-left">
          <div class="app-header-item logo">
            <img src="../assets/images/homelogo.png" alt="">
          </div>
        </div>
        <div class="app-header-middle">
          <div class="app-header-title">
            <i class="iconfont icon-sousuo image-icons"></i> 搜索商品名称
          </div>
        </div>
        <div class="app-header-right">
          <div class="app-header-item">
            <i class="iconfont icon-flightpeople3 image-icons" @click="toUser"></i>
          </div>
        </div>
      </div>
      <div class="nav swiper-container">
        <div class="swiper-wrapper" ref="swipperWrapper">
          <div class="nav-item swiper-slide" :class="{'nav_active':curIndex == index}" v-for="(nav,index) in navList" :key="index" @click="changeIndex(index)">
            <span>{{nav.name}}</span>
          </div>
        </div>
      </div>
    </header>
    <!-- transition-group 加class会渲染成普通的div，如果不加则不渲染，类似于template，但是ref会失效。 -->
    <div class="page-wrap" ref="page">
      <transition-group tag="div" :name="moveAnim">
        <div class="bodys" v-for="(nav,index) in navList" :key="index" v-show="index == curIndex">
          <component-list-main :sections="pageContent[index]"></component-list-main>
        </div>
      </transition-group>
    </div>
    <div class="fixed-br" v-show="toTop">
      <a href="javascript:;" id='top' @click="gotoTop">
        <img src="../assets/images/top.png">
      </a>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import preloading from '../components/other/preloading'
import componentListMain from '../components/home/componentListMain'

export default {
  data () {
    return {
      navList: [],
      curIndex: 0,
      navSwiper: null,
      slidesPerView: 6,
      pageContent: {},
      toTop: false,
      showLoading: false,
      moveAnim: ''
    }
  },

  components: {
    componentListMain,
    preloading
  },
  // vue生命周期
  created () {
    this.getNavList()
  },
  mounted () {
    window.addEventListener('scroll', this.needToTop, true)
  },
  methods: {
    getNavList () {
      this.$fetch('homeNav').then(res => {
        this.navList = res.data.data.tabs
        this.getHomePage(this.curIndex)
        this.$nextTick(() => {
          this.navSwiper = new Swiper('.swiper-container', {
            slidesPerView: this.slidesPerView,
            freeMode: true
          })
        })
      })
    },
    changeIndex (index) {
      this.moveAnim = index > this.curIndex ? 'bodys-left' : 'bodys-right'
      this.curIndex = index
      let toIndex = 0
      if (index > this.slidesPerView / 2) {
        toIndex = index - this.slidesPerView / 2
      }
      this.navSwiper.slideTo(toIndex, 1000, false)

      // 如果pageContent存在index，说明已经请求过，不在加载
      if (!this.pageContent[index]) {
        this.getHomePage(index)
      }
      this.gotoTop()
    },
    getHomePage (curIndex) {
      // PageData page_id,page_type
      let data = {
        page_id: this.navList[curIndex].page_id,
        page_type: this.navList[curIndex].page_type
      }
      this.showLoading = true
      this.$fetch('PageData', data).then(res => {
        // this.pageContent[curIndex] = res.data.data.data.sections
        // https://cn.vuejs.org/v2/guide/reactivity.html 需要改用Vue.set
        this.$set(this.pageContent, curIndex, res.data.data.data.sections)
        this.showLoading = false
      })
    },
    gotoTop () {
      let page = this.$refs.page
      page.scrollTop = 0
    },
    needToTop () {
      // 获取屏幕高度
      let clientHeight = document.documentElement.clientHeight
      let page = this.$refs.page
      let scTop = page.scrollTop
      if (scTop >= clientHeight) {
        this.toTop = true
      } else {
        this.toTop = false
      }
    },
    toUser () {
      this.$router.push('user')
    }
  }
}
</script>

<style scoped>
  .app-view {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #fff;
    color: #3c3c3c;
  }

  .no-scroll::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .header {
    position: fixed;
    top: -1px;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0 4px 8px -1px rgba(0, 0, 0, 0.2);
    background: #f2f2f2;
  }

  .app-header-item img {
    width: 80%;
  }

  .app-header-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #e5e5e5;
    text-align: left;
    width: 100%;
    color: rgba(0, 0, 0, 0.3);
    background-color: #fff;
    border-radius: 4px;
  }

  .image-icons {
    display: inline-block;
    width: 62px;
    height: 62px;
    text-align: center;
    line-height: 62px;
    font-size: 40px;
  }

  .nav {
    /* overflow-x: auto; */
    background: #f2f2f2;
    font-size: 27px;
    white-space: nowrap;
    z-index: 2;
  }

  .nav .nav-item {
    display: inline-block;
    padding: 0 26px;
    width: auto!important;
  }

  .nav .nav-item span {
    display: inline-block;
    line-height: 64px;
    border-bottom: 4px solid rgba(237, 91, 0, 0);
    color: rgb(116, 116, 116);
    border-color: rgb(242, 242, 242);
  }

  .nav .nav-item.nav_active span {
    color: rgb(237, 91, 0);
    border-color: rgb(237, 91, 0);
  }

  .page-wrap {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .bodys {
    position: absolute;
    top: 164px;
    left: 0;
    right: 0;
    background: #fff;
  }

  .fixed-br {
    position: fixed;
    z-index: 999;
    bottom: 114px;
    right: 26px;
  }

  .fixed-br a {
    display: block;
    width: 70px;
    height: 70px;
    overflow: hidden;
    margin-top: 10px;
  }

  .fixed-br img {
    width: 100%;
  }

  .bodys-left-enter,
  .bodys-right-leave-to {
    transform: translateX(100%);
  }

  .bodys-left-enter-active,
  .bodys-left-leave-active,
  .bodys-right-enter-active,
  .bodys-right-leave-active {
    transition: all .4s ease-out .2s;
  }

  .bodys-left-enter-to,
  .bodys-left-leave,
  .bodys-right-enter-to,
  .bodys-right-leave {
    transform: translateX(0);
  }

  .bodys-left-leave-to,
  .bodys-right-enter {
    transform: translateX(-100%);
  }
</style>
