<template>
  <div class="centered" v-if="fileReaderSupported">
    <div class="drop-zone-container">
      <pre class="drop-zone-background">{{playingCards}}</pre>
      <label class="drop-zone"
             for="file-input"
             @dragover.prevent
             @drop.prevent="e => handleFiles(e.dataTransfer.files)">
        <template v-if="error">
          <p class="text-error">{{error}}</p>
        </template>
        <template v-else>
          <p>Click or drag-and-drop here to upload CSV files</p>
          <p>
            <small>
              or{{" "}}
                <button class="color-primary button clear text-button"
                        @click="demo">
                  try it with a deck of playing cards
                </button>
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
  </div>
  <div class="centered" v-else>
    <p>
      Your browser doesn't support FileReader, but you can still{{" "}}
      <button class="color-primary button clear text-button"
              @click="demo">
        try it with a deck of playing cards
      </button>
    </p>
  </div>
</template>

<script>
import { decksFromFiles } from '@/load-decks.js'
import playingCards from '@/../demo-data/playing-cards.csv'

export default {
  props: {
    decks: Array
  },
  data() {
    return {
      fileReaderSupported: !!window.FileReader,
      loadedDecks: this.decks.filter(d => !d.demo),
      error: null,
      playingCards,
    }
  },
  methods: {
    async handleFiles(files) {
      let [newDecks, errors] = await decksFromFiles(files);
      this.error = (errors && errors.length)? errors[0].message : null;
      this.loadedDecks = this.loadedDecks.concat(newDecks);
    },
    deleteDeck(index) {
      this.error = null;
      this.loadedDecks.splice(index, 1);
    },
    publish(next) {
      if (this.loadedDecks.length === 0 || !next) return;
      this.$emit(next, this.loadedDecks);
    },
    demo() {
      this.$emit('demo');
    }
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
</style>