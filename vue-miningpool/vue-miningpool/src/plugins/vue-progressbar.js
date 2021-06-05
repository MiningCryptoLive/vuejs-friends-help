import Vue from "vue";
import VueProgressBar from "vue-progressbar";

const options = {
  color: "#41bc00",
  failedColor: "#ff5500",
  thickness: "2px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300
  }
};

Vue.use(VueProgressBar, options);
