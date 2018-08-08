<template>
  <div class="app-shell">
    <div class="app-view-wrapper">
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
          <!-- 原生写法，绑定点击事件，并根据id切换对应bodys -->
          <!-- <div class="nav no-scroll">
            <div class="nav-item" v-for="nav in navList" :key="nav.page_id">
              <span style="color: rgb(116, 116, 116); border-color: rgb(242, 242, 242);">{{nav.name}}</span>
            </div>
          </div> -->
          <!-- 改用swiper插件 -->
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
        <div class="page-wrap">
          <div class="bodys" v-for="(nav,index) in navList" :key="index">
            <!-- <div v-for = '(content, Index) in navList' v-show = 'contentIndex === homeMenuFlag'>
              <ContentList :content-list = 'homeDataArray[contentIndex]'></ContentList>
            </div> -->
            <!-- v-bind:key需要放在真正的html元素上 -->
            <!-- <template v-for="(nav,index) in navList">
                <Content :content-list="pageContent[index]"></Content>
            </template> -->
              <component-list-main :sections="pageContent[index]"></component-list-main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import componentListMain from '../components/home/componentListMain'
export default {
  data () {
    return {
      navList: [],
      curIndex: 0,
      navSwiper: null,
      slidesPerView: 6,
      pageContent: {}
    }
  },

  components: {
    componentListMain
  },
  // vue生命周期
  created () {
    this.getNavList()
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
    },
    getHomePage (curIndex) {
      // PageData page_id,page_type
      let data = {
        page_id: this.navList[curIndex].page_id,
        page_type: this.navList[curIndex].page_type
      }
      this.$fetch('PageData', data).then(res => {
        // this.pageContent[curIndex] = res.data.data.data.sections
        this.$set(this.pageContent, curIndex, res.data.data.data.sections)
      })
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
  max-width: 375px;
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
  padding-bottom: 52px;
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
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  background: #f2f2f2;
}

.app-header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #f2f2f2;
  color: #666;
  padding: 0;
}

.app-header-item {
  display: block;
  width: 32px;
  margin: 0 10px;
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
  border-radius: 2px;
}

.image-icons {
  display: inline-block;
  width:31px;
  height:31px;
  text-align: center;
  line-height: 31px;
  font-size:20px;
}

.nav {
  /* overflow-x: auto; */
  background: #f2f2f2;
  font-size:13px;
  white-space: nowrap;
  z-index: 2;
}

.nav .nav-item {
  display: inline-block;
  padding: 0 13px;
  width: auto!important;
}

.nav .nav-item span{
  display: inline-block;
  line-height:32px;
  border-bottom: 2px solid rgba(237,91,0,0);
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
  top: 82px;
  left: 0;
  right: 0;
  background: rgba(237, 91, 0, 0.1);
  height: 800px;
  line-height: 800px;
  font-size:72px;
}
</style>
