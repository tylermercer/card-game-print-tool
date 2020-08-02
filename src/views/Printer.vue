<template>
  <div>
    <div class="noprint">
      <h2>Print Decks</h2>
      <button onclick="window.print()">
        Print
      </button>
      <hr/>
    </div>
    <div class="page"
         v-for="({ cards, title }, i) in loadedDecks"
         :key="`${title} ${i}`">
      <Card v-for="card in cards"
            :key="card.title" 
            :cardInfo="card"></Card>
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
    loadedDecks: Array,
  }
}
</script>

<style scoped>
@media print {
  .noprint {
    display: none;
  }
}
.page {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color-adjust: exact !important;
  -webkit-print-color-adjust: exact !important;
  print-color-adjust: exact !important;
}
.page >>> * {
  box-shadow: none;
  border-radius: 0;
}
</style>