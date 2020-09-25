<template>
  <div class="not-found">
    <Header />
    <section>
      <h1>4<span>0</span>4</h1>
      <router-link class="btn btn-primary btn-lg" :to="{ name: 'Home' }" role="button">
        <button>GO BACK</button>
      </router-link>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default {
  name: 'NotFound',
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
.not-found {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: space-evenly;
      -ms-flex-pack: space-evenly;
          justify-content: space-evenly;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
}

h1 {
  font-size: 7rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 1rem;
}

h1 span {
  color: #ff9900;
}

button {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.75em 1.25rem;
  background-color: #ff9900;
  -webkit-box-shadow: 3px 3px 0 0 #ffffff;
          box-shadow: 3px 3px 0 0 #ffffff;
  border: none;
  -webkit-transition: -webkit-box-shadow 0.2s ease-in-out;
  transition: -webkit-box-shadow 0.2s ease-in-out;
  -o-transition: box-shadow 0.2s ease-in-out;
  transition: box-shadow 0.2s ease-in-out;
  transition: box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
  margin: 3rem 2rem 0.5rem 2rem;
  max-width: 100%;
  font-family: inherit;
}

button:hover {
  -webkit-box-shadow: 0 0 0 0 #ffffff;
          box-shadow: 0 0 0 0 #ffffff;
}
</style>
