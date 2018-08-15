<template>
  <div class="app-product-list-page app-view app-view-with-header app-view-with-footer">
    <ol>
      <li class="item ul-flex align-center"
        v-for ="(list,index) in commondityList"
        :key="index">
        <a class="item-img">
          <img v-lazy="list.img_url">
          <span>
            <img v-lazy="list.icon_img">
          </span>
        </a>
        <div class="item-intro box-flex flex">
          <div class="item-name flex">
            <p>{{list.name}}</p>
          </div>
          <div class="item-brief flex">
            <p v-html="list.product_desc"></p>
          </div>
          <div class="item-intro-price flex">
            <span class="price">&nbsp;{{list.price}}</span>
          </div>
        </div>
      </li>
    </ol>
    <MiRecommend :api="recommendApi" />
  </div>
</template>

<script>
import fetch from '@/api/'
import purify from 'dompurify'
import MiRecommend from '../components/product/MiRecommend'
export default {
  data () {
    return {
      commondityList: null,
      recommendApi: 'recommend'
    }
  },
  components: {
    MiRecommend
  },
  beforeRouteEnter (to, from, next) {
    let query = {
      category_id: to.params.id
    }
    if (from.name) {
      fetch('productList', query).then(res => {
        next(vm => vm.setList(res))
      })
    } else {
      next(vm => vm.getList())
    }
  },
  methods: {
    getList () {
      let query = {
        category_id: this.$route.params.id
      }
      fetch('productList', query).then(res => {
        this.setList(res)
      })
    },
    setList (res) {
      let list = res.data.data.list
      list.forEach(item => {
        item.product_desc = purify.sanitize(item.product_desc)
      })
      this.commondityList = list
    }
  }
}
</script>

<style scoped>
.item {
  padding: 0 0 3px;
  position: relative;
}

.item:after {
  content: "";
  position: absolute;
  bottom: 1px;
  left: 312px;
  right: 0;
  border-bottom: 1px solid #e4e4e4;
}

.item-img {
  position: relative;
  width: 312px;
  height: 312px;
  text-align: center;
  display: block;
}

.item-img img {
  width: auto;
  height: 100%;
}

.item-img span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 156px;
}

.item-img span img {
  width: auto;
  height: 32px;
}

.item-intro {
  display: block;
  padding: 0 32px 8px;
  width: 370px;
  box-sizing: border-box;
  text-align: left;
}

.item-intro .item-name {
  font-size: 32px;
  color: rgba(0,0,0,.87);
  margin-bottom: 16px;
}

.item-intro .item-brief {
  font-size: 24px;
  color: rgba(0,0,0,.54);
  margin-bottom: 16px;
  line-height: 32px;
  height: 64px;
  overflow: hidden;
}

.item-intro .item-brief p {
  text-overflow: ellipsis;
  overflow: hidden;
}

.item-intro .item-intro-price {
  font-size: 32px;
  position: relative;
}

.item-intro span {
  color: #ff6000;
}

.price {
  position: relative;
  padding-left: 5px;
  line-height: 42px;
}

.price:before {
  content: "\A5";
  position: absolute;
  left: 0;
  top: 0;
  font-size: 20px;
  text-decoration: none;
}

</style>
