<template>
  <div id="home">
    <div v-if="loading">
      <pre>{{ error }}</pre>
    </div>
    <div v-else>
      <div class="slider mb-3 py-3">
        <b-container>
          <h1 class="name">{{ Config.name }} {{ $t('pool') }}</h1>
          <div class="info mb-4">
            {{ $t('pool_inf1') }}
            <b-badge>{{ Config.scheme }}</b-badge>
            {{ $t('pool_inf2') }}
          </div>
          <div class="row mb-2 mt-4">
            <div class="col">
              <b-card no-body header-tag="header">
                <h6 slot="header" class="mb-0">
                  <v-icon name="info"></v-icon>
                  {{ $t('pool_info') }}
                </h6>
                <b-list-group>
                  <b-list-group-item>
                    {{ $t('algorithm') }}
                    <span class="float-right">{{ Config.algo }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('block_reward') }}
                    <span
                      class="float-right"
                    >{{ Config.block_reward }} {{ Config.symbol }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('min_payout') }}
                    <span
                      class="float-right"
                    >{{ Config.min_payout }} {{ Config.symbol }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('pool_fee') }}
                    <span
                      class="float-right"
                    >{{ Config.fee | intNumber }}&nbsp;%</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </div>
            <div class="col">
              <b-card no-body header-tag="header">
                <h6 slot="header" class="mb-0">
                  <v-icon name="bar-chart"></v-icon>
                  {{ $t('pool_stats') }}
                </h6>
                <b-list-group>
                  <b-list-group-item>
                    {{ $t('miners_online') }}
                    <span
                      class="float-right"
                    >{{ stats.minersTotal | intNumber }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('pool_hashrate') }}
                    <span
                      class="float-right"
                    >{{ stats.hashrate | intHashrate }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('blocks_found') }}
                    <span
                      class="float-right"
                    >{{ stats.maturedTotal + stats.immatureTotal + stats.candidatesTotal | intNumber }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('last_block_found') }}
                    <span class="float-right" v-if="stats.stats.lastBlockFound">
                      <timeago
                        :converterOptions="{ includeSeconds: true }"
                        :locale="this.$i18n.locale"
                        :datetime="stats.stats.lastBlockFound | intToTimeStamp"
                      ></timeago>
                    </span>
                  <span class="float-right" v-else>Не найдено</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card>
            </div>
            <div class="col">
              <b-card no-body header-tag="header">
                <h6 slot="header" class="mb-0">
                  <v-icon name="bar-chart-2"></v-icon>
                  {{ $t('net_stats') }}
                </h6>
                <b-list-group>
                  <b-list-group-item>
                    {{ $t('net_diff') }}
                    <span
                      class="float-right"
                    >{{ stats.nodes[0].difficulty | intDifficulty }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('net_hash') }}
                    <span
                      class="float-right"
                    >{{ stats.nodes[0].difficulty / Config.block_time | intHashrate }}</span>
                  </b-list-group-item>
                  <b-list-group-item>
                    {{ $t('block_height') }}
                    <span class="float-right">
                      <a
                        target="_blank"
                        rel="nofollow"
                        v-bind:href="Config.explorer.height + stats.nodes[0].height"
                      >{{ stats.nodes[0].height | intNumber }}</a>
                    </span>
                  </b-list-group-item>
                  <span v-if="!this.stats.stats.roundShares">
                    <b-list-group-item v-if="Config.scheme == 'SOLO'">
                      {{ $t('pool_luck') }}
                      <span class="float-right">0 %</span>
                    </b-list-group-item>
                    <b-list-group-item v-if="Config.scheme == 'PPLNS'">
                      {{ $t('current_round') }}
                      <span class="float-right">0 %</span>
                    </b-list-group-item>
                  </span>
                  <span v-else>
                    <b-list-group-item v-if="Config.scheme == 'SOLO'">
                      {{ $t('pool_luck') }}
                      <span
                        class="float-right"
                      >{{ stats.stats.roundShares | intToLuck(stats.nodes[0].difficulty) }} %</span>
                    </b-list-group-item>
                    <b-list-group-item v-if="Config.scheme == 'PPLNS'">
                      {{ $t('current_round') }}
                      <span
                        class="float-right"
                      >{{ stats.stats.roundShares | intToLuck(stats.nodes[0].difficulty) }} %</span>
                    </b-list-group-item>
                  </span>
                </b-list-group>
              </b-card>
            </div>
          </div>
        </b-container>
      </div>
      <b-container>
        <b-card>
              <Wallet></Wallet>
            </b-card>
          <!-- div class="col-md-8 offset-md-2">
            <b-card no-body>
              <table class="table mb-0">
                <thead>
                  <tr>
                    <th scope="col" class="border-right border-top-0 text-center">#</th>
                    <th scope="col" class="border-right border-top-0">{{ $t('miner') }}</th>
                    <th scope="col" class="border-top-0 text-right">{{ $t('hashrate') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(value, index) in sortMiners.slice(0, 10)" :key="value.id">
                    <td scope="row" class="border-right text-center">{{ index + 1 }}</td>
                    <td class="border-right">
                      <router-link :to="'/account/' + value.key">{{ value.key }}</router-link>
                    </td>
                    <td class="text-right">{{ value.value.hr | intHashrate }}</td>
                  </tr>
                </tbody>
              </table>
            </b-card>
          </div-->
      </b-container>
    </div>
  </div>
</template>

<script>
import Wallet from "../components/Wallet";
export default {
  components: {
    Wallet
  },
  props: ["stats"],
  name: "Home",
  data() {
    return {
      title: "Home",
      top: {},
      error: null,
      intervalStats: new Function(),
      intervalTop: new Function(),
      loading: false
    };
  },
  computed: {
    sortMiners() {
      const self = this;
      let miners = self.top.top_miners;
      return self.$options.methods.sortObject(miners);
    }
  },
  methods: {
    initTop() {
      const self = this;
      let url = "top_miners";
      self
        .post(url, {})
        .then(res => {
          self.top = res;
        })
        .catch(err => {
          self.error = err;
        });
    },
    initRun() {
      const self = this;

      self.initTop();
      self.intervalTop = setInterval(function() {
        self.initTop();
      }, self.Config.api.time);
    }
  },
  mounted() {
    this.initRun();
  },
  beforeDestroy() {
    clearInterval(this.intervalTop);
  }
};
</script>
