<template>
  <div>
    <div class="noprint">
      <h2>Print Decks</h2>
      <button onclick="window.print()">Print</button>
      <hr/>
    </div>
    <p>Maiores consequatur vero unde porro accusantium natus similique. Omnis qui accusamus labore ducimus facilis aut culpa optio. Qui eius dolor tempore quo in sit.</p>
  </div>
</template>

<script>
export default {
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
</style>