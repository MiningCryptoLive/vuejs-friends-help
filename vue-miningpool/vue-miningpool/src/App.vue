<template>
  <div>
    <Menu v-bind:menus="menus" v-bind:stats="stats"></Menu>
    <div v-if="loading">API_ERROR.....</div>
    <div v-else>
      <router-view v-bind:stats="stats"></router-view>
    </div>
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>
<script>
import Menu from "./components/Menu";
//import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Menu
    //Footer
  },
  data() {
    return {
      menus: [
        {
          name: "home",
          info: false,
          route: "getHome"
        },
        {
          name: "stats",
          info: false,
          route: "getStats"
        },
        {
          name: "payments",
          info: false,
          route: "getPayments"
        },
        {
          name: "blocks",
          info: true,
          route: "getBlocks"
        },
        {
          name: "faq",
          info: false,
          route: "getFaq"
        },
        {
          name: "help",
          info: false,
          route: "getHelp"
        }
      ],
      stats: {
        hashrate: 0,
        minersTotal: 0,
        maturedTotal: 0,
        immatureTotal: 0,
        candidatesTotal: 0,
        stats: {
          lastBlockFound: 0
        },
        nodes: [
          {
            difficulty: 0,
            height: 0
          }
        ]
      },
      intervalStats: new Function(),
      error: null,
      loading: false
    };
  },
  methods: {
    initStats() {
      const self = this;
      let url = "stats";
      self
        .post(url, {})
        .then(res => {
          self.stats = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initRun() {
      const self = this;
      self.initStats();
      self.intervalStats = setInterval(function() {
        self.initStats();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.$Progress.finish();
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalStats);
  },
  created() {
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  }
};
</script>
<style src='./assets/main.css'></style>
