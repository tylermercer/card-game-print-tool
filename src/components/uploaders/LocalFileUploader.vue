<template>
  <div v-if="fileReaderSupported" class="drop-zone-container">
    <pre class="drop-zone-background">{{playingCards}}</pre>
    <label class="drop-zone"
          for="file-input"
          @dragover.prevent
          @drop.prevent="e => handleFiles(e.dataTransfer.files)">
      <p v-if="error" class="text-error">
        {{error}}
      </p>
      <template v-else>
        <p>Click or drag-and-drop here to upload CSV files</p>
        <p>
          <small>
            or{{" "}}
              <a class="color-primary cursor-pointer"
                  @click.stop.prevent="() => $emit('demo')">
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
  <p v-else>
    Your browser doesn't support FileReader, but you can still{{" "}}
    <a class="color-primary cursor-pointer"
      @click="() => $emit('demo')">
      try it with a deck of playing cards
    </a>
    or
    <a class="color-primary cursor-pointer"
      @click="() => useGoogleSheets = true">
      load decks from Google Sheets
    </a>
  </p>
</template>

<script>
import playingCards from '@/../demo-data/playing-cards.csv'
import { decksFromFiles } from '@/load-decks.js'

export default {
  data() {
    return {
      fileReaderSupported: !!window.FileReader,
      error: null,
      playingCards
    }
  },
  methods: {
    async handleFiles(files) {
      let [newDecks, errors] = await decksFromFiles(files);
      this.error = (errors && errors.length)? errors[0].message : null;
      this.$emit('load-decks', newDecks);
    },
  }
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
</style>