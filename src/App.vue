<template>
  <div id="app">
    <h1>Card Game Prototype Tool</h1>
    <div class="content">
      <div class="left">
        <h2>Decks</h2>
        <div v-for="({cards, title}, i) in decks" class="deck" :key="title">
          <p>{{title}} ({{cards.length}} cards)</p>
          <Card v-if="cards.length" :cardInfo="cards[cards.length-1]" facedown/>
          <button @click="() => centerCard = cards.pop()" :disabled="!cards.length || centerCard">Draw</button>
          <button @click="() => { cards.push(centerCard); centerCard = null }" :disabled="!centerCard">Place</button>
          <button @click="() => shuffle(i)">Shuffle</button>
        </div>
      </div>
      <div class="center">
        <h2>Current Card</h2>
        <Card v-if="centerCard" :facedown="flipped" :cardInfo="centerCard" large/>
        <p v-else>Draw a card to view it here</p>
        <button @click="() => flipped = !flipped" :disabled="!centerCard">Flip</button>
      </div>
      <div class="right">
        <h2>Hands</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      flipped: false,
      centerCard: null,
      decks: [
        {
          title: "Voyage",
          cards: [
              {
                title: "Attacked by Squids!",
                body: "You'll need swords and axes to fight off these dangerous poulps. Their bodies are too soft for Leiden bullets.",
                backText: "VOYAGE DECK",
                backColor: "pink"
              },
              {
                title: "Trapped Under the Ice!",
                body: "The Nautilus' danger level immediately rises by one. This lasts for the next three turns.",
                backText: "VOYAGE DECK",
                backColor: "orange"
              },
          ]
        },
        {
          title: "Exploration",
          cards: [
              {
                title: "The Saloon",
                body: "Looking out through the copper-reinforced glass window, you see marine life of all kinds.",
                backText: "EXPLORE DECK",
                backColor: "lightblue"
              },
              {
                title: "The Captain's Quarters",
                body: "The Captain plays a sad melody on his organ. A portrait of a young couple with two children hangs on the wall. His family?",
                backText: "EXPLORE DECK",
                backColor: "azure"
              },
          ]
        }
      ]
    }
  },
  methods: {
    shuffle(index) {
      let list = [...(this.decks[index].cards)];
      for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
      }
      this.decks[index].cards = list
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
#app {
  padding: 20px;
}
.center,
.left,
.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-align: center;
}
</style>
