<template>
  <div class="app-shell">
    <div class="app-view-wrapper">
      <preloading :isShow="showLoading"></preloading>
      <div class="app-view">
        <header class="header">
          <div class="app-header-wrapper">
            <div class="app-header-left">
              <div class="app-header-item logo">
                <img src="../assets/images/homelogo.png" alt="">
              </div>
            </div>
            <div class="app-header-middle">
              <div class="app-header-title">
                <i class="iconfont icon-sousuo image-icons"></i>
                搜索商品名称
              </div>
            </div>
            <div class="app-header-right">
              <div class="app-header-item">
                <i class="iconfont icon-flightpeople3 image-icons"></i>
              </div>
            </div>
          </div>
          <div class="nav swiper-container">
            <div class="swiper-wrapper" ref="swipperWrapper">
              <div class="nav-item swiper-slide"
                :class="{'nav_active':curIndex == index}"
                v-for="(nav,index) in navList"
                :key="index"
                @click="changeIndex(index)">
                <span>{{nav.name}}</span>
              </div>
            </div>
          </div>
        </header>
        <div class="page-wrap" ref="page">
          <div class="bodys" v-for="(nav,index) in navList" :key="index" v-show="index == curIndex">
              <component-list-main :sections="pageContent[index]"></component-list-main>
          </div>
        </div>
        <div class="fixed-br" v-show="toTop">
          <a href="javascript:;" id='top' @click="gotoTop">
            <img src="../assets/images/top.png">
          </a>
        </div>
      </div>
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
      showLoading: false
    }
  },

  components: {
    componentListMain, preloading
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
      // bugs : 刷新会闪空白，需要加个loading
      this.$fetch('homeNav').then(res => {
        this.navList = res.data.data.tabs
        this.getHomePage(this.curIndex)
        // 不在mounted中是因为，数据没有加载完成，swiper就初始化完成了， 会导致左右滑动失效
        this.$nextTick(() => {
          this.navSwiper = new Swiper('.swiper-container', {
            slidesPerView: this.slidesPerView,
            freeMode: true
          })
        })
        // 要在navList加载完成后才能继续，如果在mounted中获取，会出现navlist为空的情况
      })
    },
    changeIndex (index) {
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
    }
  }
}
</script>

<style scoped>
@import url("../assets/fonts/iconfont.css");

.app-shell {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.app-view-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 750px;
  margin: 0 auto;
}

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
  padding-bottom: 104px;
}

.no-scroll::-webkit-scrollbar {
  width:0;
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

.app-header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  background: #f2f2f2;
  color: #666;
  padding: 0;
}

.app-header-item {
  display: block;
  width: 64px;
  margin: 0 20px;
}

.app-header-item img {
  width: 80%;
}

.app-header-middle {
  flex: 1;
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
  width:62px;
  height:62px;
  text-align: center;
  line-height: 62px;
  font-size:40px;
}

.nav {
  /* overflow-x: auto; */
  background: #f2f2f2;
  font-size:27px;
  white-space: nowrap;
  z-index: 2;
}

.nav .nav-item {
  display: inline-block;
  padding: 0 26px;
  width: auto!important;
}

.nav .nav-item span{
  display: inline-block;
  line-height:64px;
  border-bottom: 4px solid rgba(237,91,0,0);
  color: rgb(116,116,116);
  border-color: rgb(242,242,242);
}

.nav .nav-item.nav_active span {
  color: rgb(237,91,0);
  border-color: rgb(237,91,0);
}

.page-wrap {
  position: relative;
  height: 100%;
  overflow-x:hidden;
  overflow-y:auto;
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
  bottom:114px;
  right:26px;
}

.fixed-br a {
  display: block;
  width: 70px;
  height: 70px;
  overflow: hidden;
  margin-top:10px;
}

.fixed-br img {
  width: 100%;
}

</style>
