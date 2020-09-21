<template>
  <div class="not-found">
    <header>
      <img class="logo" src="../assets/logo.png" />
    </header>
    <section>
      <h1>4<span>0</span>4</h1>
      <router-link class="btn btn-primary btn-lg" :to="{ name: 'Home' }" role="button">
        <button>Go back Home</button>
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
}

.logo {
  max-width: 100%;
  width: 400px;
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

input,
button {
  margin: 0.5rem 2rem;
  max-width: 100%;
  font-family: inherit;
}

input {
  padding-bottom: 1rem;
  font-size: 1.5rem;
  color: inherit;
  background: none;
  border: none;
  border-bottom: 4px solid #ffffff;
  text-align: center;
  transition: border-bottom-color 0.2s ease-in-out;
  padding: 0.75em 1.25rem;
}

input:focus {
  outline: none;
  border-bottom-color: #ff9900;
}

input::placeholder {
  opacity: 0.7;
}

button {
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.75em 1.25rem;
  background-color: #ff9900;
  box-shadow: 3px 3px 0 0 #ffffff;
  border: none;
  transition: box-shadow 0.2s ease-in-out;
}

button:hover {
  box-shadow: 0 0 0 0 #ffffff;
}

footer {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

footer a {
  text-decoration: none;
  color: inherit;
}
</style>
