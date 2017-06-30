<template>
    <div class="singer">
        <listview :data="singerList"></listview>
    </div>

</template>
<script>
    import getSingerList from "../../api/singer";
    import {RESPONSE_OK} from "../../api/config";
    import ListView from "../../base/listview/listview";
    import ListView1 from "../../base/listview/listview1";
    import Singer from "../../common/js/singer";
    export default {
        data () {
            return {
                singerList : []
            }
        },
        components : {
            "listview" : ListView,
            "listview1" : ListView1
        },
        methods : {
            //对数据进行二次处理
            handleData (list) {
                let obj = {
                    hot : {
                        title : "热门",
                        items : []
                    }
                }
                list.forEach((item, index) => {
                    //热门歌手取前10个
                    if (index < 10) {
                        obj.hot.items.push(new Singer({
                            name : item.Fsinger_name,
                            id : item.Fsinger_id,
                            img : item.Fsinger_mid
                        }));
                    }
                    if (!obj[item.Findex]) {
                        obj[item.Findex] = {
                            title : item.Findex,
                            items : []
                        }
                    }
                    obj[item["Findex"]].items.push(new Singer({
                            name : item.Fsinger_name,
                            id : item.Fsinger_id,
                            img : item.Fsinger_mid
                        }));
                });
                //对obj进行排序，得到有序数组
                //首先进行分类
                let hot = [];
                let normal = [];
                for (let key in obj) {
                    // console.log(obj[key]);
                    if (obj[key].title.match(/[a-zA-Z]/)) {
                        normal.push(obj[key]);
                    } else if (obj[key].title.match("热门")) {
                        hot.push(obj[key]);
                    }
                }
                //然后进行排序
                normal.sort((a, b) => {
                    // console.log(a);
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                });

                // console.log(hot);
                // console.log(normal);

                // console.log(obj);
                return hot.concat(normal);
            }

        },
        created () {
            getSingerList()
            .then(data => {
                if (data.code === RESPONSE_OK) {
                    // this.singerList = data.data.list;
                    this.singerList = this.handleData(data.data.list);
                    // console.log("singerList", this.singerList);
                }
                // console.log("singerlist", data);
            });
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>