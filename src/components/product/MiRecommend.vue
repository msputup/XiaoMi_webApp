<template>
  <div class="recommend-box">
    <template v-if ="typeof(likeHeader) != 'string'">
    <div class="recommend-top-img" v-for="(list,index) in likeHeader" :key="index">
      <img v-lazy="list.img_url">
    </div>
    </template>
    <div class="recommend-title" v-else>{{likeHeader}}</div>
    <div class="recommend-list layout align-center">
      <div class="goods-item" v-for="(list,index) in likeList" :key="index">
        <a>
          <div class="goods-img-box">
            <img v-lazy="list.image_url">
          </div>
          <div class="goods-info">
            <div class="goods-name">{{list.name}}</div>
            <div class="goods-price price">
              {{list.price}}
              <del v-if="list.price !== list.market_price" class="price">{{list.market_price}}</del>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      likeHeader: null,
      likeList: null
    }
  },
  props: {
    api: {
      required: true
    },
    query: {
      default: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$fetch(this.api, this.query).then(res => {
        if (this.query) {
          this.likeHeader = res.data.data.title
          this.likeList = res.data.data.recommend_list
        } else {
          this.likeHeader = res.data.data.header.body.items
          this.likeList = res.data.data.recom_list
        }
      })
    }
  }
}
</script>

<style scoped>
.recommend-box {
  background: #fff;
  text-align: left;
}

.recommend-top-img {
  width: 100%;
}

.recommend-top-img img {
  width: 100%;
  height: 120px;
}

.recommend-list {
  overflow: hidden;
}

.recommend-box .recommend-title {
  line-height: 80px;
  padding: 0 32px;
  font-size: 30px;
  margin-top: 16px;
}
.layout {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
}

.goods-item {
  flex: 0 1 49.5%;
  overflow: hidden
}

.goods-item a {
  display: block;
}

.goods-img-box {
  position: relative;
}

.goods-img-box img {
  display: block;
  width: 100%;
  min-height: 356px;
}

.goods-info {
  padding: 18px 26px 22px;
  white-space:nowrap;
}

.goods-price {
  font-size: 32px;
  display: inline-block;
  color: #ff6700;
  margin-top: 1px;
}

.price {
  position: relative;
  padding-left: 0.6em;
  line-height: 1.4em
}

.price:before {
    content: "\A5";
    position: absolute;
    left: 0;
    top: 0;
    font-size: .76em;
    text-decoration: none;
}

.goods-price del {
  font-size:22px;
  margin-left: 10px;
  color: rgba(0, 0, 0, .54);
  text-decoration: line-througth;
}
</style>
