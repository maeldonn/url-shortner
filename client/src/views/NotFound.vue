<template>
<div class="not-found">
  <h1>404 not found</h1>
  <router-link
          class="btn btn-primary btn-lg"
          :to="{ name: 'Home' }"
          role="button">Go back Home</router-link>
</div>
</template>
