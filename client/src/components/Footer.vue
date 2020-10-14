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

<style scoped>
footer {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  margin: 1rem 0;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  -webkit-animation: rainbow .5s infinite;
          animation: rainbow .5s infinite;
}

@-webkit-keyframes rainbow {
 0%,
 to {
  color:#7ccdea
 }
 16% {
  color:#0074d9
 }
 32% {
  color:#2ecc40
 }
 48% {
  color:#ffdc00
 }
 64% {
  color:#b10dc9
 }
 80% {
  color:#ff4136
 }
}
@keyframes rainbow {
 0%,
 to {
  color:#7ccdea
 }
 16% {
  color:#0074d9
 }
 32% {
  color:#2ecc40
 }
 48% {
  color:#ffdc00
 }
 64% {
  color:#b10dc9
 }
 80% {
  color:#ff4136
 }
}
</style>
