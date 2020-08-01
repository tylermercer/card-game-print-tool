<template>
  <div id="simulator">
    <button class="button outline dark" @click="reset">Reset</button>
    <div class="content">
      <div class="left">
        <h2>Decks</h2>
        <section v-for="({cards, title, facedown}, i) in decks"
             :key="title">
          <h4>
            {{title}} ({{cards.length}} cards)
          </h4>
          <Card v-if="cards.length"
                :cardInfo="cards[cards.length-1]"
                :facedown="facedown"/>
          <button class="button primary"
                  @click="() => centerCard = cards.pop()"
                  :disabled="!cards.length || centerCard">
            Draw
          </button>
          <button @click="() => { cards.push(centerCard); centerCard = null }"
                  :disabled="!centerCard">
            Place
          </button>
          <button @click="() => shuffle(i)">
            Shuffle
          </button>
        </section>
      </div>
      <div class="center">
        <h2>Current Card</h2>
        <Card v-if="centerCard"
              :facedown="centerFacedown"
              :cardInfo="centerCard"
              large/>
        <p v-else>
          Draw a card to view it here
        </p>
        <button class="button primary"
                @click="() => centerFacedown = !centerFacedown"
                :disabled="!centerCard">
          Flip
        </button>
      </div>
      <div class="right">
        <h2>
          Hands
        </h2>
        <section class="hand"
             v-for="({name, cards, facedown}, i) in hands"
             :key="name">
          <h4>
            {{name}} ({{cards.length}} cards)
          </h4>
          <div class="hand-inner">
            <div v-for="(card, j) in cards"
                 :key="card.title">
              <Card :cardInfo="card"
                    :facedown="facedown"/>
              <button @click="() => useFromHand(i, j)"
                      :disabled="centerCard">
                Use
              </button>
            </div>
          </div>
          <div>
            <button class="button primary"
                    @click="() => { cards.push(centerCard); centerCard = null }"
                    :disabled="!centerCard">
              Give
            </button>
            <button @click="() => flipHand(i)"
                    :disabled="!cards.length">
              Flip
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'App',
  components: {
    Card
  },
  props: {
    loadedDecks: Array
  },
  data() {
    return {
      centerFacedown: false,
      centerCard: null,
      decks: [],
      hands: [
        {
          name: "Player 1",
          cards: [],
          facedown: false,
        },
        {
          name: "Player 2",
          cards: [],
          facedown: false,
        },
        {
          name: "Player 3",
          cards: [],
          facedown: false,
        }
      ]
    };
  },
  created() {
    this.reset();
  },
  methods: {
    shuffle(index) {
      let list = [...(this.decks[index].cards)];
      for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
      }
      this.decks[index].cards = list
    },
    useFromHand(handIndex, cardIndex) {
      this.centerCard = this.hands[handIndex].cards[cardIndex];
      this.hands[handIndex].cards.splice(cardIndex, 1);
    },
    flipHand(handIndex) {
      this.hands[handIndex].facedown = !this.hands[handIndex].facedown;
    },
    reset() {
      this.hands.forEach(h => {
        h.cards = [];
        h.facedown = false;
      });
      this.decks = [
        ...this.loadedDecks
          .map(d => ({title: d.title, cards: [...d.cards], facedown: true}))
          .concat(
            this.loadedDecks.map(d => ({ title: d.title + " Discard", cards: [], facedown: false }))
          )
        ];
      this.centerCard = null;
      this.centerFacedown = false;
    }
  },
  watch: {
    centerCard(newVal) {
      if (newVal) this.centerFacedown = false;
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
.hand-inner {
  display: flex;
}
</style>
