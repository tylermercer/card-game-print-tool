<template>
  <component :is="currentView"
              :decks="decks"
              @print="print"
              @upload-new="uploadNew"
              @demo="demo">
  </component>
</template>

<script>
import UploadView from '@/views/UploadView'
import PrintView from '@/views/PrintView'
import demoDecks from '@/demo-decks.js'

export default {
  data() {
    return {
      decks: [],
      currentView: UploadView
    }
  },
  components: {
    UploadView,
    PrintView
  },
  methods: {
    print(decks) {
      if (decks) this.decks = decks;
      this.goToPrintView();
    },
    uploadNew() {
      this.currentView = UploadView;
    },
    async demo() {
      this.decks = await demoDecks;
      this.goToPrintView();
    },
    goToPrintView() {
      window.history.pushState({}, "Print", "print");
      this.currentView = PrintView;
      window.onpopstate = () => {
        this.currentView = UploadView;
        window.history.onpopstate = () => {};
      }
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
button {
  margin: 4px;
}
.cursor-pointer,
summary {
  cursor: pointer;
}
table.lined tr {
  border-bottom: 1px solid var(--color-lightGrey);
}
</style>
