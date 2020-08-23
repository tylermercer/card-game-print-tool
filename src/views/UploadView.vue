<template>
  <div class="centered">
    <h1 class="title">Card Game Prototyping Tool</h1>
    <div class="tabs is-full">
      <a :class="!useGoogleSheets? 'tab active' : 'tab'" @click="() => useGoogleSheets = false">Load from my computer</a>
      <a :class="useGoogleSheets? 'tab active' : 'tab'" @click="() => useGoogleSheets = true">Load from Google Sheets</a>
    </div>
    <template v-if="!useGoogleSheets">
      <!--Local file uploader-->
      <template v-if="fileReaderSupported">
        <div class="drop-zone-container">
          <pre class="drop-zone-background">{{playingCards}}</pre>
          <label class="drop-zone"
                for="file-input"
                @dragover.prevent
                @drop.prevent="e => handleFiles(e.dataTransfer.files)">
            <template v-if="localUploadError">
              <p class="text-error">{{localUploadError}}</p>
            </template>
            <template v-else>
              <p>Click or drag-and-drop here to upload CSV files</p>
              <p>
                <small>
                  or{{" "}}
                    <a class="color-primary cursor-pointer"
                       @click.stop.prevent="demo">
                      try it with a deck of playing cards
                    </a>
                </small>
              </p>
            </template>
          </label>
          <input id="file-input"
                class="element-invisible"
                type="file"
                accept=".csv"
                @input="e => handleFiles(e.target.files)"
                multiple/>
        </div>
      </template>
      <template v-else>
        <p>
          Your browser doesn't support FileReader, but you can still{{" "}}
          <a class="color-primary cursor-pointer"
            @click="demo">
            try it with a deck of playing cards
          </a>
          or
          <a class="color-primary cursor-pointer"
            @click="() => useGoogleSheets = true">
            load decks from Google Sheets
          </a>
        </p>
      </template>
    </template>
    <template v-else>
      <!--Google Sheets uploader-->
      <div class="gs-uploader">
          <label for="gs-url">Sheet URL</label>
          <input id="gs-url" type="text" v-model="gsSheetUrl"/>
          <label for="gs-url">Sheet names (comma-separated)</label>
          <input id="gs-url" type="text" v-model="gsSheetNames"/>
          <div class="gs-uploader-controls">
            <button class="button primary"
              @click="loadFromSheets"
              :disabled="!(gsSheetNames && gsSheetUrl)">
              Load
            </button>
            <p class="text-error is-marginless" v-if="gsUploadError">{{gsUploadError}}</p>
          </div>
      </div>
    </template>
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
import { decksFromFiles, deckFromGoogleSheets } from '@/load-decks.js'
import playingCards from '@/../demo-data/playing-cards.csv'

import SchemaInfo from '@/components/SchemaInfo.vue'

export default {
  props: {
    decks: Array
  },
  components: {
    SchemaInfo
  },
  data() {
    return {
      fileReaderSupported: !!window.FileReader,
      loadedDecks: this.decks.filter(d => !d.demo),
      localUploadError: null,
      gsUploadError: null,
      gsSheetUrl: "",
      gsSheetNames: "",
      playingCards,
      useGoogleSheets: false,
    }
  },
  methods: {
    async handleFiles(files) {
      let [newDecks, errors] = await decksFromFiles(files);
      this.localUploadError = (errors && errors.length)? errors[0].message : null;
      this.loadedDecks = this.loadedDecks.concat(newDecks);
    },
    async loadFromSheets() {
      console.log("loading from sheets");
      //eslint-disable-next-line no-useless-escape
      const matches = this.gsSheetUrl.match(/spreadsheets\/d\/([^\/]+)/);
      if (matches.length < 1) {
        this.gsUploadError = "Invalid URL";
      }
      const key = matches[1];

      const sheetNames = this.gsSheetNames.split(',');
      try {
        const newDecks = await Promise.all(sheetNames.map((name) => deckFromGoogleSheets(name, key)));
        this.gsUploadError = null;
        this.loadedDecks = this.loadedDecks.concat(newDecks);
      }
      catch(e) {
        console.error(e);
        this.gsUploadError = e.message == 'Unauthorized' ? 'Could not access spreadsheet. Is link sharing enabled?' : e.message;
      }
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
.drop-zone-container {
  position: relative;
  height: 300px;
  margin-bottom: 10px;
}
.drop-zone {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border: 2px dashed #999;
  padding: 30px;
  font-size: 20px;
  border-radius: 8px;
  background-image: linear-gradient(rgba(255,255,255,0) 0%, white 25%, white 70%, rgba(255,255,255,0) 100%);
}
.drop-zone-background {
  background-color: white;
  overflow: hidden;
  font-family: 'Courier New', Courier, monospace;
  opacity: 0.6;
  padding: 4px 8px;
  height: 100%;
  margin: 0;
}
.centered {
  max-width: 600px;
  margin: 0 auto;
}
.text-button {
  border: none;
  background-color: unset;
  padding: 0;
  display: inline;
  margin: 0;
}
.text-button:active {
  transform: none;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
.gs-uploader {
  margin-bottom: 16px;
  padding: 8px;
  border: 1px solid #BBB;
  border-radius: 8px;
}
.gs-uploader-controls {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.tabs {
  margin-bottom: 16px;
}
.tab {
  cursor: pointer;
}
input[type="text"] {
  margin-bottom: 10px;
}
</style>