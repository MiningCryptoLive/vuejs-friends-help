import Config from "./config";

export default {
  data() {
    return {
      Config: Config
    };
  },
  methods: {
    sortObject(obj) {
      let arr = [];
      let prop;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          arr.push({
            key: prop,
            value: obj[prop]
          });
        }
      }
      arr.sort(function(a, b) {
        return b.value.hr - a.value.hr;
      });
      return arr;
    }
  },
  filters: {
    intToRoundShare(round) {
      let roundShare = (round * 100).toFixed(0);
      return roundShare + " %";
    },
    intReward(value) {
      var Reward = value * 0.000000000000000001;
      return Reward.toFixed(6);
    },
    intAmount(value) {
      var Amount = value * 0.000000001;
      return Amount.toFixed(6);
    },
    intNumber(number) {
      var value = new Intl.NumberFormat().format(number);
      return value;
    },
    intHashrate(params) {
      let hashrate = params;

      let i = 0;
      let units = ["H", "Kh", "Mh", "Gh", "Th", "Ph"];
      while (hashrate > 1000) {
        hashrate = hashrate / 1000;
        i++;
      }
      return hashrate.toFixed(2) + " " + units[i];
    },
    intHashrateChart(params) {
      let hashrate = params;

      let i = 0;
      let units = ["H", "K", "M", "G", "T", "P"];
      while (hashrate > 1000) {
        hashrate = hashrate / 1000;
        i++;
      }
      return hashrate.toFixed(0) + " " + units[i];
    },
    intDifficulty(params) {
      let n = params;

      if (n < 1000) {
        return n;
      }
      let i = 0;
      let units = ["H", "K", "M", "G", "T", "P"];
      while (n > 1000) {
        n = n / 1000;
        i++;
      }
      return n.toFixed(3) + " " + units[i];
    },
    intToTimeStamp(timeStamp) {
      let time = new Date(1000 * timeStamp).toISOString();
      return time;
    },
    intToLuck(n1, n2) {
      let luck = (n1 / n2) * 100;
      return luck.toFixed(0);
    },
    intToLuckStyle(value) {
      let luck = value;

      if (luck <= 100) {
        luck = "text-success";
      } else if (luck >= 200) {
        luck = "text-danger";
      } else {
        luck = "text-warning";
      }
      return luck;
    }
  }
};
