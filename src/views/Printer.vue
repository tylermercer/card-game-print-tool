<template>
  <div class="printer">
    <div class="noprint">
      <h2>Print Decks</h2>
      <button class="button primary"
              onclick="window.print()">
        Print
      </button>
      <button class="button"
              @click="() => $emit('upload-new')">Back</button>
      <hr/>
    </div>
    <div :class="['page', i % 2 === 1 ? 'backs' : '']"
         v-for="(page, i) in pages"
         :key="`${i}`">
      <Card v-for="card in page"
            :key="card.title + card.body"
            :cardInfo="card"
            :facedown="i % 2 === 1"
            print></Card>
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
    let pages = this.decks.map(
        d => d.cards.reduce((acc, each, i) => {
          if (i % 16 === 0) {
            acc.push([]);//front
            acc.push([]);//back
          }
          acc[acc.length-1].push(each); //back
          acc[acc.length-2].push(each); //front
          return acc;
        },
        []
      )
    ).reduce((acc, each) => [...acc, ...each], [])
    return {
      pages,
    };
  },
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
.page.backs {
  flex-direction: row-reverse;
}
.page >>> * {
  box-shadow: none;
  border-radius: 0;
}
</style>