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

<style>
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
  image-rendering: -moz-crisp-edges;
}
</style>
