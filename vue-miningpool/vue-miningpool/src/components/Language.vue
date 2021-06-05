<template>
  <b-nav-item-dropdown :dropup="dropup" no-caret right>
    <template slot="button-content">
      <span style="font-size:14px;">{{ dropdownLbl }}&nbsp;</span>
      <img :src="'/img/' + dropdownLbl + '.svg'" alt width="18" style="margin-top:-2px;">
    </template>
    <b-dropdown-item
      class="locale-link"
      v-for="locale in locales"
      :key="locale.id"
      @click="setLocale(locale)"
      :class="{ 'is-current': locale === activeLocale }"
      href="#"
    >
      <span style="font-size:14px;">{{ getLanguageString(locale) }}&nbsp;</span>
      <img
        :src="'/img/' + getLanguageString(locale) + '.svg'"
        alt
        width="18"
        style="margin-top:-2px;"
      >
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import Vue from "vue";

import VueLocalStorage from "vue-localstorage";

Vue.use(VueLocalStorage);

const localeStrings = {
  en: "EN",
  ru: "RU"
};

Vue.config.lang = Vue.localStorage.get("lang") || "en";

export default {
  name: "Language",
  props: {
    locales: {
      type: Array
    },
    showFull: Boolean,
    dropup: Boolean,
    locLabel: {
      type: String
    }
  },
  data: function() {
    return {
      activeLocale: Vue.config.lang
    };
  },
  computed: {
    dropdownLbl: function() {
      return this.locLabel ? this.locLabel : localeStrings[this.activeLocale];
    }
  },
  methods: {
    setLocale: function(locale) {
      Vue.config.lang = locale;
      this.activeLocale = locale;
      Vue.localStorage.set("lang", locale);
      this.$i18n.locale = Vue.config.lang;
    },
    getLanguageString: function(locale) {
      return this.showFull ? localeStrings[locale] : locale;
    }
  }
};
</script>
