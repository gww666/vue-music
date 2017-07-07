import * as types from "./mutation-type";

const mutations = {
    [types.SINGER_UPDATE] (state, singer) {
        state.singer = singer;
    }
}

export default mutations;