<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props : {
            propTybe : {
                type : Number,
                default : 1
            },
            click : {
                type : Boolean,
                default : true
            },
            songlist : {
                type : Array,
                default : []
            }
        },
        methods : {
            initScroll () {
                if (!this.$refs.wrapper) {
                    console.log("还没有拿到dom");
                    return false;
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    propTybe : this.propTybe,
                    click : this.click
                });
            },
            enable () {
                this.scroll && this.scroll.enable();
            },
            refresh () {
                // console.log("this.scroll", this.scroll);
                this.scroll && this.scroll.refresh();
            }
        },
        mounted () {
            setTimeout(() => {
                this.initScroll();
            }, 20);
        },
        watch : {
            songlist : function () {
                setTimeout(() => {
                    console.log("data变化");
                    this.refresh();
                }, 20);
            }
        }
    }
</script>

<style lang="stylus">
    
</style>