<template>
  <div>
    {{ title }}: {{ wallet }}
    <div v-if="loading">
      <pre>{{ error }}</pre>
    </div>
    <div v-else>
      <pre> {{ stats }}</pre>
      <pre> {{ account }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Accounts",
  data() {
    return {
      title: "Accounts",
      wallet: this.$route.params.wallet,
      stats: {},
      account: {},
      error: null,
      intervalStats: new Function(),
      intervalAccount: new Function(),
      loading: false
    };
  },
  methods: {
    initStats() {
      const self = this;
      let url = "stats";
      self
        .get(url, {})
        .then(res => {
          self.stats = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initAccount() {
      const self = this;
      let url = "accounts/" + this.wallet;
      self
        .post(url, {})
        .then(res => {
          self.account = res;
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
      self.initAccount();

      self.intervalStats = setInterval(function() {
        self.initStats();
      }, self.Config.api.time);

      self.intervalAccount = setInterval(function() {
        self.initAccount();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalStats);
    clearInterval(this.intervalAccount);
  }
};
</script>
