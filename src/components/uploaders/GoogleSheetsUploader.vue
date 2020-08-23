<template>
  <div class="uploader">
    <label for="gs-url">Sheet URL</label>
    <input id="gs-url" type="text" v-model="sheetUrl"/>
    <label for="gs-sheets">Sheet names (comma-separated)</label>
    <input id="gs-sheets" type="text" v-model="sheetNames"/>
    <div class="controls">
      <button class="button primary"
        @click="loadFromSheets"
        :disabled="!(sheetNames && sheetUrl)">
        Load
      </button>
      <p class="text-error is-marginless" v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
import { deckFromGoogleSheets } from '@/load-decks.js'

export default {
  data() {
    return {
      error: null,
      sheetUrl: "",
      sheetNames: "",
    }
  },
  methods: {
    async loadFromSheets() {
      //eslint-disable-next-line no-useless-escape
      const matches = this.sheetUrl.match(/spreadsheets\/d\/([^\/]+)/);
      if (matches.length < 2) {
        this.error = "Invalid URL";
      }
      const key = matches[1];

      const sheetNamesArray = this.sheetNames.split(',');

      try {
        const newDecks = await Promise.all(sheetNamesArray.map((name) => deckFromGoogleSheets(name, key)));
        this.error = null;
        this.$emit('load-decks', newDecks);
      }
      catch(e) {
        console.error(e);
        this.error = e.message == 'Unauthorized' ?
          'Could not access spreadsheet. Is link sharing enabled?' :
          e.message;
      }
    },
  }
}
</script>

<style scoped>
.uploader {
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #BBB;
  border-radius: 8px;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
input[type="text"] {
  margin-bottom: 10px;
}
</style>