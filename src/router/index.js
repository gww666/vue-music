import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Recommend from "../components/recommend/recommend";
import Rank from "../components/rank/rank";
import Singer from "../components/singer/singer";
import Search from "../components/search/search";
import SingerDetail from "../components/singer-detail";

Vue.use(Router)

export default new Router({
  routes: [
    //默认进入推荐页面
    {
      path : "/",
      redirect : {name : "Recommend"}
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
      children : [
        {          
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
