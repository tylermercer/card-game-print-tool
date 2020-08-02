<template>
  <div class="centered" v-if="fileReaderSupported">
    <div class="drop-zone-container">
      <div class="drop-zone-background">
        <div>title,body,backText,backColor,frontColor,quantity</div>
        <div>A♠,,Velocipede,lightblue,lightgray,1</div>
        <div>2♠,,Velocipede,lightblue,lightgray,1</div>
        <div>3♠,,Velocipede,lightblue,lightgray,1</div>
        <div>4♠,,Velocipede,lightblue,lightgray,1</div>
        <div>5♠,,Velocipede,lightblue,lightgray,1</div>
        <div>6♠,,Velocipede,lightblue,lightgray,1</div>
      </div>
      <label class="drop-zone"
             for="file-input"
             @dragover.prevent
             @drop.prevent="e => handleFiles(e.dataTransfer.files)">
        <p>Click or drag-and-drop here to upload CSV files</p>
        <p><small>
          or{{" "}}
            <button class="color-primary button clear text-button"
                    @click="demo">
              try it with a deck of playing cards
            </button>
          </small></p>
      </label>
      <input id="file-input"
            class="element-invisible"
            type="file"
            accept=".csv"
            @input="e => handleFiles(e.target.files)"
            multiple/>
    </div>
    <p v-for="{ title, path, cards } in decks"
       :key="path">
      {{title}} ({{cards.length}} card{{cards.length !== 1 ? 's' : ''}})
    </p>
    <p>
      <button class="button primary"
              @click="() => publish('simulate')"
              :disabled="decks.length === 0">
        Simulate
      </button>
    </p>
    <p>
      <button @click="() => publish('print')"
              :disabled="decks.length === 0">
        Print Decks
      </button>
    </p>
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
import Papa from 'papaparse'

function toJson(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete (results) {
        resolve(results.data)
      },
      error (err) {
        reject(err)
      }
    })
  })
}

export default {
  data() {
    return {
      fileReaderSupported: !!window.FileReader,
      decks: []
    }
  },
  methods: {
    async handleFiles(files) {
      this.decks = this.decks.concat(await Promise.all([...files].map(async f => {
        let data = await toJson(f);
        let cards = [];
        data.forEach(d => {
          let num = d.quantity;
          delete d.quantity;
          for (let i = 0; i < num; i++) {
            cards.push({...d})
          }
        })
        return {
          title: f.name,
          path: f.path,
          cards,
          facedown: true,
        }
      })));
    },
    publish(next) {
      if (this.decks.length === 0 || !next) return;
      this.$emit(next, this.decks);
    },
    demo() {
      this.$emit('simulate');
    }
  },
}
</script>

<style scoped>
.drop-zone-container {
  position: relative;
  height: 300px;
  margin-bottom: 16px;
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
  background-image: linear-gradient(rgba(255,255,255,0), white 25%);
}
.drop-zone-background {
  overflow-x: hidden;
  font-family: 'Courier New', Courier, monospace;
  opacity: 0.6;
  padding: 4px 8px;
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
</style>