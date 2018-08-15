<template>
  <div class="description-view space-top">
    <div class="tab-header">
      <div class="tab-header-inner border-bottom-1px box-flex align-center">
        <a
          v-for="(desc,index) in descTabs"
          :key="index"
          class="flex"
          :class="descTabsIndex==index?'on':''"
          @click="descTabsIndex=index">{{desc.name}}</a>
      </div>
    </div>
    <div class="tab-view">
      <div
        v-show="descTabsIndex==index"
        v-for="(desc,index) in descTabs"
        :key="'desc'+index"
        class="tab-item">
        <section v-for="(showDesc,index) in desc.tabContent" :key="'showDesc'+index">
          <div class="desc-img-box">
            <img v-lazy="showDesc.plainView.img" v-show="index < defaultShow">
          </div>
        </section>
        <a class="show-all-desc" v-show="defaultShow != desc.tabContent.length" @click="defaultShow = desc.tabContent.length">查看全部图文详情 &gt;</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      descTabsIndex: 0,
      defaultShow: 3
    }
  },
  props: ['descTabs']
}
</script>

<style scoped>
.description-view .tab-header {
  height: 88px;
}
.description-view .tab-header-inner {
  height: 88px;
  background: #fff;
  will-change: scroll-position;
  text-align: center;
}
.description-view .tab-header-inner .flex.on {
  color: #ff6700;
}
.description-view .tab-header-inner .flex {
  display: block;
  font-size: 26px;
  width: 100%;
  border-right: 1px solid #f4f4f4;
}

.description-view .tab-header-inner .flex:last-child {
    border-right: none;
}

.description-view .tab-view {
  background: #fff;
}

.description-view .tab-view section {
  overflow: hidden;
}

.description-view .tab-view img {
  display: block;
  width: 100%;
  vertical-align: middle;
}
.description-view .show-all-desc {
  display: block;
  background: #fff;
  line-height: 88px;
  font-size: 26px;
  color: #ff6700;
  text-align: center;
}
</style>
