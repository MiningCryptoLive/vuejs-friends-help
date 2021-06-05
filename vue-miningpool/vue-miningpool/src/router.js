import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Help from "./views/Help.vue";
import Faq from "./views/Faq.vue";
import Stats from "./views/Stats.vue";
import Blocks from "./views/Blocks.vue";
import Miners from "./views/Miners.vue";
import Payments from "./views/Payments.vue";
import Accounts from "./views/Accounts.vue";
import NotFound from "./views/NotFound.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: "/",
  routes: [
    {
      path: "/",
      name: "getHome",
      component: Home
    },
    {
      path: "/help",
      name: "getHelp",
      component: Help
    },
    {
      path: "/faq",
      name: "getFaq",
      component: Faq
    },
    {
      path: "/stats",
      name: "getStats",
      component: Stats
    },
    {
      path: "/miners",
      name: "getMiners",
      component: Miners
    },
    {
      path: "/payments",
      name: "getPayments",
      component: Payments
    },
    {
      path: "/blocks",
      name: "getBlocks",
      component: Blocks,
      children: [
        {
          path: "immature",
          component: Blocks
        },
        {
          path: "pending",
          component: Blocks
        },
        {
          path: "stats",
          component: Blocks
        }
      ]
    },
    {
      path: "/account/:wallet",
      component: Accounts,
      children: [
        {
          path: "",
          component: Accounts
        },
        {
          path: "rewards",
          component: Accounts
        },
        {
          path: "payouts",
          component: Accounts
        },
        {
          path: "earnings",
          component: Accounts
        },
        {
          path: "api",
          component: Accounts
        }
      ]
    },
    {
      path: "/404",
      component: NotFound
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
