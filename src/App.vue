<template>
  <div>
    <h1 class="title"><router-link to="/">Card Game Prototype Tool</router-link></h1>
    <router-view :loadedDecks="loadedDecks"></router-view>
  </div>
</template>

<script>
const toTitleCase = (file) => {
  let name = file.slice(2, -4);
  return name[0].toUpperCase().concat(name.slice(1));
}

const fileContext = require.context('../game-data--demo/', true, /\.csv$/)
const loadedDecks = fileContext.keys().map(key => ({
  title: toTitleCase(key),
  cards: fileContext(key),
  facedown: true
}));

export default {
  data() {
    return {
      loadedDecks
    }
  }
}
</script>

<style>
@import '../node_modules/chota/dist/chota.min.css';

.element-invisible {
  position: absolute !important;
  height: 1px; width: 1px; 
  overflow: hidden;
  clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
  clip: rect(1px, 1px, 1px, 1px);
  opacity: 0;
}

body {
  padding: 10px;
}

section {
  border: 1px solid var(--color-lightGrey);
  padding: var(--grid-gutter);
  padding-top: 8px;
  border-radius: 4px;
  margin: 10px;
}
</style>

<style scoped>
@media print {
  .title {
    display: none;
  }
}
</style>
