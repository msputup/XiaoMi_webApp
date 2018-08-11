<template>
  <header class="app-header-wrapper app-shell-header">
    <div class="app-header-left">
      <a class="app-header-item">
        <i class="iconfont icon-back"></i>
      </a>
    </div>
    <div class="app-header-middle">
      <div class="app-header-title">分类</div>
    </div>
    <div class="app-header-right">
      <a class="app-header-item">
        <i class="iconfont icon-sousuo"></i>
      </a>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
.app-shell-header {
  position:fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
}

.app-header-title {
  width: 100%;
  font-size: 30px;
  font-weight: 500;
}

.iconfont {
  font-size:44px;
}
</style>
