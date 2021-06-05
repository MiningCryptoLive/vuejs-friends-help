<template>
  <div>
    {{ title }}
    <div v-if="loading">
      API_ERROR.....
      <pre>{{ error }}</pre>
    </div>
    <div v-else>
	<pre> {{ stats }}</pre>
    <pre> {{ chart }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  name: "Stats",
  props: ["stats"],
  data() {
    return {
      title: "Stats",
      chart: {},
      error: null,
      intervalCahrt: new Function(),
      loading: false
    };
  },
  methods: {
    initChart() {
      const self = this;
      let url = "stats/chart";
      self
        .post(url, {})
        .then(res => {
          self.chart = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initRun() {
      const self = this;
      self.initChart();

      self.intervalChart = setInterval(function() {
        self.initChart();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalChart);
  }
};
</script>
