<template>
    <div>404</div>
</template>
<script>
    import {getSingerDetail} from "../../api/singer";
    import {RESPONSE_OK} from "../../api/config";
    import {mapGetters} from "vuex";
    export default {
        data () {
            return {
            }
        },
        computed : {
            ...mapGetters([
                "getSinger"
            ]),
            id () {
                return this.$route.params.id;
            }
        },
        methods : {
            getData() {
                if (!this.getSinger.id) {
                    this.$router.push("/singer");
                    return;
                }
                getSingerDetail(this.id)
                .then(data => {
                    console.log(data);
                });
            }
        },
        created () {
            this.getData();
            console.log(this.getSinger);
        }

    }
</script>
<style lang="stylus" scoped>
    
</style>