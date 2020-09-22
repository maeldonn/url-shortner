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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

header {
  display: flex;
  justify-content: center;
  margin: 1rem 1rem 0 1rem;
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
  box-shadow: 3px 3px 0 0 #ffffff;
  border: none;
  transition: box-shadow 0.2s ease-in-out;
  margin: 3rem 2rem 0.5rem 2rem;
  max-width: 100%;
  font-family: inherit;
}

button:hover {
  box-shadow: 0 0 0 0 #ffffff;
}

footer {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

footer a {
  text-decoration: none;
  color: inherit;
}
</style>
