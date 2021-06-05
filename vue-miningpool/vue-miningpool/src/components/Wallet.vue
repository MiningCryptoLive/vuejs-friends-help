<template>
  <div>
    <b-form id="app" @submit="checkForm" method="post">
      <b-input-group>
        <b-input-group-text v-if="address" slot="prepend" @click="resetForm">
          <v-icon name="x" class="icon-menu text-danger"></v-icon>
        </b-input-group-text>
        <b-form-input
          ref="walletInput"
          class="d-md-block"
          type="text"
          id="address"
          v-model="address"
          name="address"
          :valye="address"
          :placeholder="$t('your_wallet')"
        />
        <b-input-group-append>
          <b-btn type="submit">
            <v-icon name="search" class="icon-menu"></v-icon>
          </b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-form>
    <b-alert
      class="allert_wallet"
      v-if="errors.length"
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <span
        v-for="error in errors"
        :key="error.id"
      >{{ error }} {{dismissCountDown}} {{$t("message.seconds")}}...</span>
    </b-alert>
  </div>
</template>
<script>
import Vue from "vue";
import Config from "../config";

export default {
  name: "Wallet",
  data() {
    return {
      Config: Config,
      errors: [],
      address: Vue.localStorage.get(Config.symbol) || "",
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    checkForm: function(e) {
      e.preventDefault();
      this.dismissCountDown = this.dismissSecs;
      this.errors = [];
      if (this.address === "") {
        this.errors.push(this.$t("message.valid_address"));
      } else if (this.address.length < Config.valid_address) {
        this.errors.push(this.$t("message.valid_address"));
      } else if (this.address.length > Config.valid_address) {
        this.errors.push(this.$t("message.valid_address"));
      } else {
        this.$router.push("/account/" + this.address);
        Vue.localStorage.set(Config.symbol, this.address);
      }
    },
    resetForm: function(e) {
      this.$localStorage.set(Config.symbol, true);
      this.$localStorage.remove(Config.symbol);
      e.preventDefault();
      this.$data.address = "";
    }
  }
};
</script>
