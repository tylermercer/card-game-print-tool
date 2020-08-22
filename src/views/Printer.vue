<template>
  <div class="printer">
    <div class="noprint controls">
      <h2>Print Decks</h2>
      <p>
        <input type="radio" id="front-and-back" value="front-and-back" v-model="printMode">
        <label for="front-and-back">Print front and back</label>
      </p>
      <p>
        <input type="radio" id="front-only" value="front-only" v-model="printMode">
        <label for="front-only">Print front only</label>
      </p>
      <p>
        <input type="checkbox" id="enable-colors" v-model="enableColors">
        <label for="enable-colors">Show card colors</label>
      </p>
      <p>{{pages.length}} Pages</p>
      <button class="button"
              @click="() => $emit('upload-new')">Back</button>
      <button class="button primary"
              onclick="window.print()">
        Print
      </button>
    </div>
    <div class="scrim">
      <div :class="['page', (includeBacks &&  i % 2 === 1) ? 'backs' : '']"
          v-for="(page, i) in pages"
          :key="`${i}`">
        <Card v-for="(card, j) in page"
              :key="card.title + j"
              :cardInfo="card"
              :facedown="includeBacks && i % 2 === 1"
              :colored="enableColors"></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  components: {
    Card
  },
  props: {
    decks: Array,
  },
  data() {
    return {
      enableColors: true,
      printMode: "front-and-back"
    };
  },
  computed: {
    includeBacks() {
      return this.printMode === "front-and-back"
    },
    pages() {
      return this.decks.map(
        d => d.cards.reduce((acc, each, i) => {
          if (i % 16 === 0) {
            acc.push([]);//front
            if (this.includeBacks) acc.push([]);//back
          }
          if (this.includeBacks) {
            acc[acc.length-1].push(each); //back
            acc[acc.length-2].push(each); //front
          }
          else {
            acc[acc.length-1].push(each); //back
          }
          return acc;
        },
        []
      )
    ).reduce((acc, each) => [...acc, ...each], [])
    }
  }
}
</script>

<style scoped>
@media print {
  .noprint {
    display: none;
  }
}
.printer {
  position: relative;
}
.page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  color-adjust: exact !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
  max-width: 600px;
  margin: 10px auto 10px auto;
  height: 830px;
  break-inside: avoid;
  page-break-inside: avoid;
  page-break-after: always;
  break-after: always;
  position: relative;
}
.page:last-child {
  page-break-after: auto;
  break-after: auto;
}
@media screen {
  .page {
    max-width: 696px;
    padding: 36px 48px;
    margin: 0 auto;
    border-bottom: 1px dashed gray;
    background-color: white;
  }
  .scrim {
    background-color: lightgray;
    padding: 10px;
  }
  .controls {
    padding-bottom: 10px;
  }
}
.page.backs {
  flex-direction: row-reverse;
}
.page >>> * {
  box-shadow: none;
  border-radius: 0;
}
</style>