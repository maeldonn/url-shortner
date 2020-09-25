<template>
  <footer>
      <p>
        Made with ❤️ by
        <a href="https://maeldonn.github.io/" target="_blank">maeldonn</a>
      </p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style>
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
