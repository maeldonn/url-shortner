const app = new Vue({
  el: '#app',
  data: {
    url: '',
    errorMessage: '',
  },
  methods: {
    getShortUrl() {
      console.log(this.url);
    },
  },
});
