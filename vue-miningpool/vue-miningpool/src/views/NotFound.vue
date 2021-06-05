<template>
  <div class="d-flex justify-content-center align-items-center p-5 m-6" id="main">
    <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">{{title}}</h1>
    <div class="inline-block align-middle">
      <h2 class="font-weight-normal lead" id="desc">{{ $t('message.404') }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
      title: "404"
    };
  }
};
</script>

<style scoped>
#main {
  height: 60vh;
}
</style>
