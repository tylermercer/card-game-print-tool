<template>
  <div class="centered">
    <h1 class="title">Card Game Prototyping Tool</h1>
    <div class="tabs is-full">
      <a :class="!useGoogleSheets? 'tab active' : 'tab'" @click="() => useGoogleSheets = false">Load from my computer</a>
      <a :class="useGoogleSheets? 'tab active' : 'tab'" @click="() => useGoogleSheets = true">Load from Google Sheets</a>
    </div>
    <component :is="uploader"
               @demo="demo"
               @load-decks="addDecks">
    </component>
    <div v-for="({ title, key, cards }, i) in loadedDecks"
      :key="key"
      class="item">
      <span class="is-vertical-align">{{title}} ({{cards.length}} card{{cards.length !== 1 ? 's' : ''}})</span>
      <button class="button outline pull-right"
              @click="() => deleteDeck(i)">
        Delete
      </button>
    </div>
    <button class="button primary"
            @click="() => publish('print')"
            :disabled="loadedDecks.length === 0">
      Print
    </button>
    <SchemaInfo></SchemaInfo>
  </div>
</template>

<script>
import SchemaInfo from '@/components/SchemaInfo.vue'
import GoogleSheetsUploader from '@/components/uploaders/GoogleSheetsUploader.vue'
import LocalFileUploader from '@/components/uploaders/LocalFileUploader.vue'

export default {
  props: {
    decks: Array
  },
  components: {
    SchemaInfo,
    GoogleSheetsUploader,
    LocalFileUploader
  },
  data() {
    return {
      loadedDecks: this.decks.filter(d => !d.demo),
      useGoogleSheets: false,
    }
  },
  computed: {
    uploader() {
      return this.useGoogleSheets? GoogleSheetsUploader : LocalFileUploader;
    }
  },
  methods: {
    addDecks(newDecks) {
      this.loadedDecks = this.loadedDecks.concat(newDecks);
    },
    deleteDeck(index) {
      this.localUploadError = null;
      this.gsUploadError = null;
      this.loadedDecks.splice(index, 1);
    },
    publish(next) {
      if (this.loadedDecks.length === 0 || !next) return;
      this.$emit(next, this.loadedDecks);
    },
    demo() {
      this.$emit('demo');
    },
  },
}
</script>

<style scoped>
.centered {
  max-width: 600px;
  margin: 0 auto;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
.tabs {
  margin-bottom: 16px;
}
.tab {
  cursor: pointer;
}
</style>