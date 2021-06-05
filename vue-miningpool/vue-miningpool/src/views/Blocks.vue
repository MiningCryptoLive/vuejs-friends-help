<template>
  <div>
    {{ title }}
    <div v-if="loading">API_ERROR.....
      <pre>{{ error }}</pre>
    </div>

    <div v-else>
      <pre> {{ blocks }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "Blocks",
  data() {
    return {
      title: "Blocks",
      blocks: {},
      error: null,
      intervalBlocks: new Function(),
      loading: false
    };
  },
  methods: {
    initBlocks() {
      const self = this;
      let url = "blocks";
      self
        .post(url, {})
        .then(res => {
          self.blocks = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initRun() {
      const self = this;
      self.initBlocks();
      self.intervalBlocks = setInterval(function() {
        self.initBlocks();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalBlocks);
  }
};
</script>