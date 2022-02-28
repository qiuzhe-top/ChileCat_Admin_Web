<!--
 * @Author: 邹洋
 * @Date: 2021-12-01 08:10:30
 * @Email: 2810201146@qq.com
 * @LastEditors:
 * @LastEditTime: 2022-02-21 21:13:28
 * @Description:
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
.banquan {
  background: none;
  height: 5%;
  position: fixed;
  bottom: 0px;
  width: 100%;
  text-align: left;
  font-size: 10px;
  color: rgb(107, 107, 107);
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
