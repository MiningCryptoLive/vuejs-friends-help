<template>
  <div>
    {{ title }}
    <div v-if="loading">
      <pre>{{ error }}</pre>
    </div>
    <div v-else>
      <pre> {{ miners }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Miners",
  data() {
    return {
      title: "Miners",
      miners: {},
      error: null,
      intervalMiners: new Function(),
      loading: false
    };
  },
  methods: {
    initMiners() {
      const self = this;
      let url = "miners";
      self
        .post(url, {})
        .then(res => {
          self.miners = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initRun() {
      const self = this;
      self.initMiners();
      self.intervalMiners = setInterval(function() {
        self.initMiners();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalMiners);
  }
};
</script>
