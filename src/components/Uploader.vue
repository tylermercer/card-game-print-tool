<template>
  <div v-if="fileReaderSupported">
    <div>
      <label for="file-input"
             @dragover.prevent
             @drop.prevent="e => handleFiles(e.dataTransfer.files)">
        <p>Click or drag-and-drop here to upload CSV files</p>
        <p><small>
          or <router-link to="/simulator">try it with a deck of playing cards</router-link>
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
              @click="() => publish('/simulator')"
              :disabled="decks.length === 0">
        Simulate
      </button>
    </p>
    <p>
      <button @click="() => publish('/printer')"
              :disabled="decks.length === 0">
        Print Decks
      </button>
    </p>
  </div>
  <div v-else>
    <p>Your browser doesn't support FileReader, but you can still <router-link to="/simulator">simulate an UNO game</router-link></p>
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
      this.$emit('publish', this.decks);
      this.$router.push(next);
    }
  },
}
</script>

<style scoped>
label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 300px;
  margin: 0 auto 16px auto;
  border: 2px dashed #999;
  padding: 30px;
  font-size: 20px;
  border-radius: 8px;
}
</style>