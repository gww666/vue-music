<template>
    <div>
        <music-list :title="title" :bgImg="bgImage" :songs="songsList"></music-list>
    </div>
</template>
<script>
    import {getSingerDetail} from "../../api/singer";
    import {RESPONSE_OK} from "../../api/config";
    import {mapGetters} from "vuex";
    import {createSong} from "../../common/js/song";
    import scroll from "../../base/scroll/scroll";
    import SongList from "../music-list";
    import MusicList from "../music-list/index";
    export default {
        data () {
            return {
                songsList: []
            }
        },
        computed : {
            ...mapGetters([
                "getSinger"
            ]),
            id () {
                return this.$route.params.id;
            },
            title() {
                return this.getSinger.name
            },
            bgImage() {
                return this.getSinger.img
            },
        },
        methods : {
            getData() {
                if (!this.getSinger.id) {
                    this.$router.push("/singer");
                    return;
                }
                getSingerDetail(this.id)
                .then(data => {
                    if (data.code === RESPONSE_OK) {
                        // console.log(data.data.list);
                        this.serializeSongsList(data.data.list);
                    }
                    
                });
            },
            serializeSongsList (list) {
                console.log(list);
                list.forEach(item => {
                    // console.log()
                    if (item.musicData.songid && item.musicData.albummid) {
                        this.songsList.push(createSong(item.musicData));
                    }
                });
                console.log(this.songsList);
            },
        },
        components : {
            "music-list" : MusicList
        },
        created () {
            this.getData();
            console.log(this.getSinger);
        }

    }
</script>
<style lang="stylus" scoped>
    
</style>