<template>
  <div id="app">
    <m-header></m-header>
    <tabs></tabs>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
     
  </div>
</template>

<script>
import MHeader from "./components/m-header/m-header";
import Tabs from "./components/tabs/tabs";
export default {
  name: 'app',
  components : {
    "m-header" : MHeader,
    "tabs" : Tabs
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  // @import "~common/stylus/reset.styl"
  // @import "~common/stylus/variable.styl";
  // body
  //   background: $color-background
    //改变小点样式
    .mint-swipe-indicator
        background: #999
        opacity: 0.6
    .mint-swipe-indicators .is-active 
        background: #fff
        opacity: 0.6
</style>
