<template>
  <div class="home">
    <header>
      <h1 class="img">URL Shortner</h1>
    </header>
    <section>
      <form class="form" v-if="!created" @submit.prevent="createShortUrl">
        <div v-if="errorMessage" class="error">
          {{errorMessage}}
        </div>
        <input class="input" type="url" id="url" v-model="url" placeholder="enter a url" required />
        <input class="input" id="slug" v-model="slug" maxlength="5" placeholder="enter a slug" />
        <button class="create">CREATE SHORT URL</button>
      </form>
      <div v-if="created" class="created">
        <div class="result">
          <input class="link" v-model="link"/>
          <button class="copy" v-clipboard:copy="link">Copy</button>
        </div>
        <button class="back" @click="reset">CREATE A NEW URL</button>
      </div>
    </section>
    <footer class="footer">
      <p>Made with ❤️ by <a href="https://maeldonn.github.io/" target="_blank">maeldonn</a></p>
    </footer>
  </div>
</template>

<script>
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
  data: () => ({
    url: '',
    slug: '',
    link: null,
    created: false,
    errorMessage: '',
    isLoading: false, // TODO: Add a loader
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
            this.link = response.data.link;
            this.created = true;
          })
          .catch((error) => {
            if (error.message.includes('409')) {
              this.errorMessage = 'Slug is already in use';
            } else if (error.message.includes('429')) {
              this.errorMessage = 'You are sending too many requests. Try again in 60 seconds.';
            } else {
              this.errorMessage = 'Impossible to create a short url. Please retry later.';
            }
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

header {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.img {
  font-size: 4rem;
}

.form {
  display: flex;
  flex-direction: column;
}

.error {
  background: #A63446;
  padding: 1rem 2rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center;
}

.input,
.create,
.link,
.back {
  margin: 1rem 0;
  max-width: 100%;
}

.input,
.link {
  padding-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
}

.create,
.back {
  cursor: pointer;
  font-size: 1.15rem;
  padding: 0.75em 1.25rem;
}

.created {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.result {
  display: flex;
  justify-content: baseline;
  align-items: center;
}

.footer {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.footer a {
  text-decoration: none;
  color: inherit;
}

</style>
