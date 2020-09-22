<template>
  <div class="not-found">
    <header>
      <img class="logo" src="../assets/logo.png" />
    </header>
    <section>
      <h1>4<span>0</span>4</h1>
      <router-link class="btn btn-primary btn-lg" :to="{ name: 'Home' }" role="button">
        <button>GO BACK</button>
      </router-link>
    </section>
    <footer>
      <p>
        Made with ❤️ by
        <a href="https://maeldonn.github.io/" target="_blank">maeldonn</a>
      </p>
    </footer>
  </div>
</template>

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

header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  margin: 1rem 1rem 0 1rem;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.logo {
  max-width: 70%;
  width: 500px;
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

footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  margin: 1rem 0;
}

footer a {
  text-decoration: none;
  color: inherit;
}
</style>
