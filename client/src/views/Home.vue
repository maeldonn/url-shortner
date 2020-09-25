<template>
  <div class="home">
    <Header />
    <section v-if="!created && !isLoading" class="form">
      <form @submit.prevent="createShortUrl">
        <div v-if="errorMessage" class="error">{{errorMessage}}</div>
        <input type="url" id="url" v-model="url" placeholder="enter a url" />
        <input id="slug" v-model="slug" maxlength="5" placeholder="enter a slug (optional)" />
        <button>KILL URL</button>
      </form>
    </section>
    <section v-if="isLoading">
      <img src="../assets/spinner.svg" alt="">
    </section>
    <section v-if="created && !isLoading" class="created">
      <input v-model="link" />
      <button v-clipboard:copy="link">COPY</button>
      <button @click="reset">GO BACK</button>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';

const axios = require('axios');
const Joi = require('joi');

const schema = Joi.object({
  url: Joi.string()
    .trim()
    .pattern(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/,
    )
    .required(),
  slug: Joi.string()
    .trim()
    .pattern(/^[\w\-]+$/i)
    .max(5),
});

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
  data: () => ({
    url: '',
    slug: '',
    link: null,
    created: false,
    errorMessage: '',
    isLoading: false,
  }),
  watch: {
    url: {
      handler() {
        this.errorMessage = '';
      },
    },
    slug: {
      handler() {
        this.errorMessage = '';
      },
    },
  },
  methods: {
    createShortUrl() {
      if (this.validateData()) {
        this.isLoading = true;
        axios
          .post(
            '/',
            {
              url: this.url,
              slug: this.slug || undefined,
            },
            {
              headers: {
                'content-type': 'application/json',
              },
            },
          )
          .then((response) => {
            setTimeout(() => {
              this.link = response.data.link;
              this.created = true;
              this.isLoading = false;
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              if (error.message.includes('409')) {
                this.errorMessage = 'Slug is already in use';
              } else if (error.message.includes('429')) {
                this.errorMessage = 'You are sending too many requests. Try again in 60 seconds.';
              } else {
                this.errorMessage = 'Impossible to create a short url. Please retry later.';
              }
              this.isLoading = false;
            }, 1000);
          });
      }
    },
    validateData() {
      const value = schema.validate({
        url: this.url,
        slug: this.slug || undefined,
      });
      if (!value.error) {
        return true;
      }
      if (value.error.message.includes('url')) {
        this.errorMessage = 'URL is not valid';
      } else {
        this.errorMessage = 'Slug is not valid';
      }
      return false;
    },
    reset() {
      this.url = '';
      this.slug = '';
      this.link = null;
      this.created = false;
    },
  },
};
</script>

<style scoped>
.home {
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

.form {
  max-width: 100%;
}

form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
}

input,
button,
.error {
  margin: 0.5rem 2rem;
  max-width: 100%;
  font-family: inherit;
}

.error {
  background: #b33a3a;
  padding: 1rem 2rem;
  color: #ffffff;
  text-align: center;
}

input {
  padding-bottom: 1rem;
  font-size: 1.5rem;
  color: inherit;
  background: none;
  border: none;
  border-bottom: 4px solid #ffffff;
  text-align: center;
  -webkit-transition: border-bottom-color 0.2s ease-in-out;
  -o-transition: border-bottom-color 0.2s ease-in-out;
  transition: border-bottom-color 0.2s ease-in-out;
  padding: 0.75em 0.5rem;
}

input:focus {
  outline: none;
  border-bottom-color: #ff9900;
}

input::-webkit-input-placeholder {
  opacity: 0.7;
}

input::-moz-placeholder {
  opacity: 0.7;
}

input:-ms-input-placeholder {
  opacity: 0.7;
}

input::-ms-input-placeholder {
  opacity: 0.7;
}

input::placeholder {
  opacity: 0.7;
}

button {
  margin-top: 3rem;
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
}

button:hover {
  -webkit-box-shadow: 0 0 0 0 #ffffff;
          box-shadow: 0 0 0 0 #ffffff;
}

.created {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  max-width: 80%;
}
</style>
