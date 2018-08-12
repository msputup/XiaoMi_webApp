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
                  <a>
                    <div class="img">
                      <img :src="item.img_url">
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
  components: {
    cellsAutoFill
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$fetch('category').then(res => {
        this.categoryList = res.data.data
        this.$nextTick(() => {
          this.categoryList.forEach((item, index) => {
            this.wrapOffsetTop.push(this.$refs['category_' + index][0].offsetTop)
            this.liOffsetTop.push(this.$refs['li_' + index][0].offsetTop)
          })
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
        console.log(index)
        console.log(navli.length)
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

</style>
