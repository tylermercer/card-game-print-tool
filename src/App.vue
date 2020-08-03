<template>
  <div>
    <h1 class="title">Card Game Prototyping Tool</h1>
    <component :is="currentView"
               :decks="decks"
               @simulate="simulate"
               @print="print"
               @upload-new="uploadNew"
               @demo="demo">
    </component>
  </div>
</template>

<script>
import Uploader from '@/views/Uploader'
import Printer from '@/views/Printer'
import Simulator from '@/views/Simulator'
import demoDecks from '@/demo-decks.js'

export default {
  data() {
    return {
      decks: [],
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
      if (decks) this.decks = decks;
      this.currentView = Simulator;
    },
    print(decks) {
      if (decks) this.decks = decks;
      this.currentView = Printer;
    },
    uploadNew() {
      this.currentView = Uploader;
    },
    async demo() {
      this.decks = await demoDecks;
      this.currentView = Simulator;
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
button {
  margin: 4px;
}
</style>

<style scoped>
@media print {
  .title {
    display: none;
  }
}
</style>
