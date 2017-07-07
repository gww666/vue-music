<template>
    <scroll 
        :list="data" 
        class="listview" 
        ref="scroll"
        :listen-scroll="listenScroll"
        @mscroll="handleMScroll"
        :probeType="probeType"
    >
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item"
                        @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.img">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
                
            </li>
        </ul>
        <div class="list-shortcut" @touchstart.stop.prevent="shortcutsTouchStart"
            @touchmove.prevent.stop="shortcutsTouchMove">
            <ul>
                <li v-for="(item, index) in shortcuts" class="item" :data-index="index"
                    :class="{'current' : currentIndex === index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">
                {{fixedTitle}}
                <!--
                    <i class="iconfont">&#xe619;</i>
                -->
            </div>
        </div>
        <!-- Loading组件 -->

        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
    
</template>

<script>
    import Scroll from "../scroll/scroll";
    import {getData} from "../../common/js/dom";
    import Loading from "../loading/loading";
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
                scrollY : 0,
                heightList : [],
                currentIndex : 0,
                diff : -1
            }
        },
        computed : {
            shortcuts () {
                return this.data.map((item, index) => item.title.slice(0, 1));
            },
            fixedTitle () {
                if (this.scrollY >= 0) {
                    return "";
                }
                return this.data.length > 0 ? this.data[this.currentIndex].title : "";
            }
        },
        components : {
            "scroll" : Scroll,
            "loading" : Loading
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
            handleMScroll (pos) {
                let heightList = this.heightList;
                this.scrollY = pos.y;
            },
            //计算每个栏目的高度
            getHeightList () {
                let height = 0;//第一组高度为0
                this.heightList.push(height);
                let list = this.$refs.listGroup;
                // console.log(list[0].offsetTop);
                for (let i = 0; i < list.length; i++) {
                    let item = list[i];
                    height += item.offsetHeight;
                    this.heightList.push(height);
                }
            },
            selectItem (singer) {
                this.$emit('select', singer);
            },
            _scrollTo(index) {
                this.scrollY = -(this.heightList[index]);
                // console.log(this.scrollY);
                this.$refs.scroll.scrollToElement(this.$refs.listGroup[index], 0);
            }
        },
        created () {
            //创建一个记录当前anchor是第几个的变量
            this.touch = {};
            //是否监听滚动的flag值
            this.listenScroll = true;
            //
            this.probeType = 3;
        },
        watch : {
            data () {
                console.log("data发生变化");
                setTimeout(() => {
                    this.getHeightList();
                    console.log(this.heightList);
                }, 20);
            },
            scrollY (newY, oldY) {
                const heightList = this.heightList;
                for (let i = 0; i < heightList.length - 1; i++) {
                    let h1 = heightList[i];
                    let h2 = heightList[i + 1];
                    if (-newY >= h1 && -newY < h2) {
                        this.currentIndex = i;
                        this.diff = newY + h2;
                        break;
                    }
                }
            },
            diff (newDiff) {
                let fixedHeight = this.$refs.fixed.offsetHeight;
                let translateY = newDiff < fixedHeight ? newDiff - fixedHeight : 0;
                // if (translateY === 0) {
                //     return false;
                // }
                // this.translateY = translateY;
                // console.log(fixedHeight);
                // console.log(this.diff);
                // if (this.diff < fixedHeight) {
                    console.log("fixedHeight");
                    this.$refs.fixed.style.transform = `translate3d(0, ${translateY}px, 0)`;
                // }
            }
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