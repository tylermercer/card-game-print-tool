<template>
  <div>
    <h1 class="title">Card Game Prototype Tool</h1>
    <component :is="currentView"
               :loadedDecks="loadedDecks"
               @simulate="simulate"
               @print="print"
               @upload-new="uploadNew">
    </component>
  </div>
</template>

<script>
import Uploader from '@/views/Uploader'
import Printer from '@/views/Printer'
import Simulator from '@/views/Simulator'


const toTitleCase = (file) => {
  let name = file.slice(2, -4);
  return name[0].toUpperCase().concat(name.slice(1));
}

const fileContext = require.context('../demo-data/', true, /\.csv$/)
const loadedDecks = fileContext.keys().map(key => ({
  title: toTitleCase(key),
  cards: fileContext(key),
  facedown: true
}));

export default {
  data() {
    return {
      loadedDecks,
      currentView: Uploader
    }
  },
  components: {
    Uploader,
    Printer,
    Simulator
  },
  methods: {
    simulate(decks) {
      if (decks) this.loadedDecks = decks;
      this.currentView = Simulator;
    },
    print(decks) {
      this.loadedDecks = decks;
      this.currentView = Printer;
    },
    uploadNew() {
      this.loadedDecks = loadedDecks;
      this.currentView = Uploader;
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
