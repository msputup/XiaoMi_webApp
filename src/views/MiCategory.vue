<template>
  <div class="app-view app-view-with-header app-view-width-footer">
    <div class="list-nav">
      <ul>
        <li v-for="(li,index) in categoryList" :key="index" :class="index==curIndex?'active' : ''" @click="changeIndex(index)">
          <a>
            <span>{{li.category_name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="list-wrap" @scroll="listwrapScroll">
      <div class="list-item" v-for="(li,index) in categoryList" :key="index" :ref="`category_${index}`">
        <component-list-main :sections="li.category_list"></component-list-main>
      </div>
    </div>
  </div>
</template>

<script>
import componentListMain from '../components/home/componentListMain'
export default {
  data () {
    return {
      categoryList: null,
      curIndex: 0,
      offsetTop: [],
      scrollTimer: null
    }
  },
  components: {
    componentListMain
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
            this.offsetTop.push(this.$refs['category_' + index][0].offsetTop)
          })
        })
      })
    },
    changeIndex (index) {
      this.curIndex = index
      let top = this.offsetTop[index]
      let listWrap = document.querySelector('.list-wrap')
      listWrap.scrollTo(0, top)
      listWrap.removeEventListener('scroll', this.scrollHandler)
    },
    listwrapScroll () {
      document.querySelector('.list-wrap').addEventListener('scroll', this.scrollHandler)
    },
    scrollHandler () {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        let scrollTop = document.querySelector('.list-wrap').scrollTop
        let length = this.offsetTop.length
        for (let index = 0; index < length; index++) {
          if (scrollTop >= this.offsetTop[index] && scrollTop < this.offsetTop[index + 1]) {
            this.curIndex = index
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
