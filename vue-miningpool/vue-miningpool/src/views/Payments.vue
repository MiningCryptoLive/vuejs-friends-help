<template>
  <div>
    {{ title }}
    <div v-if="loading">
      <pre>{{ error }}</pre>
    </div>
    <div v-else>
      <pre> {{ payments }}</pre>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  name: "Payments",
  data() {
    return {
      title: "Payments",
      payments: {},
      error: null,
      intervalPayments: new Function(),
      loading: false
    };
  },
  methods: {
    initPayments() {
      const self = this;
      let url = "payments";
      self
        .post(url, {})
        .then(res => {
          self.payments = res;
          self.loading = false;
        })
        .catch(err => {
          self.error = err;
          self.loading = true;
        });
    },
    initRun() {
      const self = this;
      self.initPayments();
      self.intervalPayments = setInterval(function() {
        self.initPayments();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalPayments);
  }
};
</script>
