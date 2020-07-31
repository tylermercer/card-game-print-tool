<template>
  <div>
    <nav>
      <h1><router-link to="/">Card Game Prototype Tool</router-link></h1>
      <p><router-link to="/printer">Print Decks</router-link></p>
    </nav>
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

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}
@media print {
  nav {
    display: none;
  }
}
nav * {
  height: 24px;
  padding: 10px;
  margin: 0;
}
</style>
