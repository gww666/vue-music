<template>
    <div class="recommend">
        <scroll :songlist="songlist" class="recommend-content">
            <div>
                <div class="banner" :style="{height : bannerHeight + 'px'}">
                    <swipe :auto="4000" class="banner-swipe">
                        <swipe-item v-for="(item, index) in sliderList" :key="index" class="banner-item"><img :src="item.picUrl" alt="" class="banner-img" :style="{height : bannerHeight + 'px'}"></swipe-item>
                    </swipe>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in songlist" class="item">
                        <div class="icon">
                            <img width="60" height="60" :src="item.imgurl">
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>
    </div>
    
</template>
<script>
import {getBanner, getSongList} from '../../api/recommend';
import {RESPONSE_OK} from "../../api/config";
import { Swipe, SwipeItem } from 'mint-ui';
import MScroll from "../../base/scroll/scroll";

    export default {
        data () {
            return {
                sliderList : [],
                bannerHeight : 0,
                songlist : []
            }
        },
        methods : {
            getData () {
                getBanner().then(data => {
                    if (data.code === RESPONSE_OK) {
                        console.log(data.data.slider);
                        this.sliderList = data.data.slider;
                        // console.log("this.$refs.banner_img", this.$refs.banner_img);
                        this.initImgHeight(this.sliderList[0].picUrl);
                    }
                });
                getSongList().then(data => {
                    if (data.code === RESPONSE_OK) {
                        console.log(data);
                        this.songlist = data.data.list;
                    }
                });
            },
            //动态获取图片高度，保存到data中，赋给外层的banner_container
            initImgHeight(src) {
                let img = new Image();
                img.onload = () => {
                    let screenWidth = window.screen.width;
                    //计算缩放比例
                    let imgHeight = parseInt(img.height / (img.width / screenWidth));
                    this.bannerHeight = imgHeight;
                    console.log("this.bannerHeight", this.bannerHeight);
                    // console.log(imgHeight);
                }
                img.src = src;

            },
            //初始化banner高度值
            initBannerHeight() {
            }
        },
        created () {
            this.getData();
        },
        components : {
            "swipe" : Swipe,
            "swipe-item" : SwipeItem,
            "scroll" : MScroll
        },
        mounted () {
            setTimeout(() => {

            }, 20);
        }
    }
</script>
<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .banner-img
        width: 100%
        // height: 150px
    .banner-item 
        // height: 150px
        // height: auto
    .banner
        // height: 150px
        // width: 100%
        // height: auto
    .banner-swipe
        // width: 100%
        // height: auto
    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
    .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
    
    
</style>