<template>
  <header>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="top-menu">
      <b-container>
        <b-navbar-brand to="/">{{ Config.pool_name }}</b-navbar-brand>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <li v-for="menu in menus" :key="menu.id">
              <router-link v-bind:to="{ name: menu.route }" class="nav-link" :title="$t(menu.name)">
                {{ $t(menu.name) }}
                <span v-if="menu.info">
                  <span
                    class="new-blocks"
                    v-if="stats.candidatesTotal + stats.immatureTotal > 0"
                  >{{ stats.candidatesTotal + stats.immatureTotal }}</span>
                </span>
              </router-link>
            </li>
            <b-nav-item-dropdown>
              <template slot="button-content">{{ $t('pools') }}</template>
              <b-dropdown-item
                v-for="pool in Config.pools"
                :key="pool.id"
                :href="pool.url"
              >{{pool.name}}</b-dropdown-item>
              <b-dropdown-divider/>
              <b-dropdown-item href="https://eth.pool-node.com">Pools Overview</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <Language :locales="['en', 'ru']" :show-full="true"></Language>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>
<script>
import Language from "./Language";
export default {
  name: "Menu",
  props: ["menus", "stats"],
  components: {
    Language
  },
  data() {
    return {};
  }
};
</script>
