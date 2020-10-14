<template>
  <header>
      <img class="logo" src="../assets/logo.png" />
    </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
header {
  text-align: center;
  margin: 1rem 1rem 0 1rem;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.logo {
  max-width: 70%;
  width: 500px;
  image-rendering: -moz-crisp-edges;
}
</style>
