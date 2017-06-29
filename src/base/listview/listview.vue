<template>
    <scroll 
        :list="data" 
        class="listview" 
        ref="scroll"
        :listen-scroll="listenScroll"
        @scroll="scroll"
        :propType="propType"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.img">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
                
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="shortcutsTouchStart"
            @touchmove.prevent.stop="shortcutsTouchMove">
            <ul>
                <li v-for="(item, index) in shortcuts" class="item" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </scroll>
    
</template>

<script>
    import Scroll from "../scroll/scroll";
    import {getData} from "../../common/js/dom";
    //定义一个锚点（anchor）的高度，便于计算手指划过几个anchor
    const anchorHeight = 18;
    export default {
        props : {
            data : {
                type : Array,
                default : []
            }
        },
        data () {
            return {
                // listenScroll : true
            }
        },
        computed : {
            shortcuts () {
                return this.data.map((item, index) => item.title.slice(0, 1));
            }
        },
        components : {
            "scroll" : Scroll
        },
        methods : {
            shortcutsTouchStart (event) {
                // console.log(event);
                
                let index = getData(event.target, "index");
                this.touch.anchorIndex = index;
                this.touch.pageY = event.touches[0].pageY;
                this._scrollTo(index);
            },
            shortcutsTouchMove (event) {
                // console.log(event);
                //计算当次活动的pageY
                let movePageY = event.touches[0].pageY;
                //计算划过了几个anchor
                let moveAnchor = Math.floor((movePageY - this.touch.pageY) / anchorHeight);
                let moveAnchorIndex = parseInt(this.touch.anchorIndex) + moveAnchor;
                // console.log(moveAnchorIndex);
                this._scrollTo(moveAnchorIndex);
            },
            scroll (...rest) {
                // console.log(rest);
                console.log(11111111111);
            },
            _scrollTo(index) {
                this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0);
            }
        },
        created () {
            //创建一个记录当前anchor是第几个的变量
            this.touch = {};
            //是否监听滚动的flag值
            this.listenScroll = true;
            //
            this.propType = 3;
            
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>