<template>
  <div class="app-view app-view-with-header app-view-width-footer">
    <div class="list-nav">
      <ul>
        <li v-for="(li,index) in categoryList" :key="index" :class="index==curIndex?'active' : ''" @click="changeIndex(index)" :ref="`li_${index}`">
          <a>
            <span>{{li.category_name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="list-wrap" @scroll="listwrapScroll">
      <div class="list-item" v-for="(li,index) in categoryList" :key="index" :ref="`category_${index}`">
        <!-- <component-list-main :sections="li.category_list"></component-list-main> -->
        <div class ='component-list-main'>
          <div v-for="(list,index) in li.category_list" :key="index">
            <cellsAutoFill v-if="list.view_type === 'cells_auto_fill'" :body="list.body"></cellsAutoFill>
            <div v-else-if="list.view_type === 'category_title'" :class="list.view_type" class="ignore">
              <span>{{list.body.category_name}}</span>
            </div>
            <div v-else-if="list.view_type === 'category_group'" :class="list.view_type" class="box-flex">
              <div class="box">
                <div class="product" v-for="(item,index) in list.body.items" :key="index">
                  <a @click="getRoute(item.action.type, item.action.path)">
                    <div class="img">
                      <img v-lazy="item.img_url">
                    </div>
                    <div class="name">{{item.product_name}}</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cellsAutoFill from '../components/home/cellsAutoFill'
import fetch from '@/api/'
import routerParse from '@/router/routerParse'
export default {
  data () {
    return {
      categoryList: null,
      curIndex: 0,
      wrapOffsetTop: [],
      liOffsetTop: [],
      scrollTimer: null
    }
  },
  beforeRouteEnter (to, from, next) {
    if (from.name) {
      fetch('category').then(res => {
        next(vm => vm.setList(res))
      })
    } else {
      next(vm => vm.getList())
    }
  },
  components: {
    cellsAutoFill
  },
  // created () {
  //   this.getList()
  // },
  methods: {
    getList () {
      this.$fetch('category').then(res => {
        this.setList(res)
      })
    },
    setList (res) {
      this.categoryList = res.data.data
      this.$nextTick(() => {
        this.categoryList.forEach((item, index) => {
          this.wrapOffsetTop.push(this.$refs['category_' + index][0].offsetTop)
          this.liOffsetTop.push(this.$refs['li_' + index][0].offsetTop)
        })
      })
    },
    changeIndex (index) {
      this.curIndex = index
      this.navliScrollTop(index)
      let top = this.wrapOffsetTop[index]
      let listWrap = document.querySelector('.list-wrap')
      listWrap.scrollTo(0, top)
      listWrap.removeEventListener('scroll', this.scrollHandler)
    },
    navliScrollTop (index) {
      let navul = document.querySelector('.list-nav ul')
      let navli = navul.querySelectorAll('li')
      if (navul.scrollHeight > navul.clientHeight) {
        navul.scrollTop = navul.scrollHeight - navul.clientHeight - navli[index].clientHeight * (navli.length - 1 - index)
      }
    },
    listwrapScroll () {
      document.querySelector('.list-wrap').addEventListener('scroll', this.scrollHandler)
    },
    scrollHandler () {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        let wrapScrollTop = document.querySelector('.list-wrap').scrollTop
        let listItem = document.querySelectorAll('.list-wrap .list-item')
        let length = this.wrapOffsetTop.length
        for (let index = 0; index < length; index++) {
          if (wrapScrollTop >= (listItem[index].offsetTop + listItem[index].clientHeight) && wrapScrollTop < (listItem[index + 1].offsetTop + listItem[index + 1].clientHeight)) {
            this.curIndex = index + 1
            this.navliScrollTop(this.curIndex)
            break
          }
        }
      }, 100)
    },
    getRoute (type, path) {
      routerParse.call(this, type, path)
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
    /* will-change: transform;
    transition: transform .4s cubic-bezier(.55,0,.1,1); */
  }
  .list-nav {
    position: fixed;
    top: 98px;
    bottom: 104px;
    left: 0;
    width: 152px;
    border:1px solid #efefef;
    overflow: hidden;
  }
  .list-nav ul {
    z-index: 90;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: -12px;
    padding: 16px 12px 16px 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .list-nav ul li {
    font-size: 34px;
    height: 90px;
    line-height: 90px;
    overflow: hidden;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    transition: transform 0.1s linear;
    transform-origin: center center;
    transform: scale(0.76);
  }

  .list-nav li span {
    display: inline-block;
  }

  .list-nav li.active {
  color: #fb7d34;
  transform: scale(1);
  }

  .list-wrap {
    position: absolute;
    left: 152px;
    right: 0;
    top: 98px;
    bottom: 104px;
    padding: 16px 32px;
    overflow: auto;
  }

  .category_title {
    background: #fff;
    font-size: 28px;
    text-align: center;
    font-weight: 400;
    margin-top: 20px;
    height: 128px;
    line-height: 128px;
    overflow: hidden;
  }

  .category_title span {
    position: relative;
  }

  /* bug 不用ignore的话会有warning，提示postcss插件会覆盖content */
  .ignore span:after, .ignore span:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 30px;
    border-top: 1px solid #e0e0e0;
    transform: translate3d(-150%,-50%,0);
  }

  .ignore span:after {
    left: auto;
    right: 0;
    transform: translate3d(150%,-50%,0);
  }

  .category_group {
    background: #fff;
    margin: -6px 0 0;
  }

  .category_group .box {
    width: 100%;
    overflow: hidden;
  }

  .category_group .product {
    float: left;
    width: 33.3%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 30px;
    overflow: hidden;
  }

  .category_group .img {
    width:100px;
    height: 100px;
    margin: 0 auto;
    background: #fff;
    overflow: hidden;
  }

  .category_group img {
    width: auto;
    height: 100%;
  }

  .category_group .name {
    margin-top: 28px;
    white-space: nowrap;
    font-size: 23px;
    color: rgba(0,0,0,.54);
  }

  .app-view .list-wrap>div:last-child {
    min-height: calc(100vh - 200px);
  }

</style>
