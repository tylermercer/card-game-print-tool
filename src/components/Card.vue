<template>
  <div class="back"
       :style="{ backgroundColor: colored ? `${cardInfo.backColor}` : null }"
       v-if="facedown">
    <p>{{cardInfo.backText}}</p>
  </div>
  <div class="front"
       :style="{ backgroundColor: colored ? `${cardInfo.frontColor}` : null }"
       v-else>
    <h4>{{cardInfo.title}}</h4>
    <div v-html="bodyMd"></div>
  </div> 
</template>

<script>
import MarkdownIt from 'markdown-it'

export default {
  props: {
    facedown: {
      type: Boolean,
      default: false
    },
    cardInfo: Object,
    large: {
      type: Boolean,
      default: false
    },
    print: {
      type: Boolean,
      default: false
    },
    colored: {
      type: Boolean,
      default: true
    }
  },
  data() {
    let { body } = this.cardInfo
    return {
      ...this.cardInfo,
      bodyMd: body ? new MarkdownIt().render(body) : null,
    }
  }
}
</script>

<style scoped>
.front,
.back {
  border: 1px solid black;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  break-inside: avoid;
  padding: 5px;
  align-items: center;
  margin: 0;
  width: 25%;
  height: 25%;
}
.back {
  font-size: 2.5rem;
}
.front {
  font-size: 0.8rem;
}
.front >>> p,
.front >>> h4 {
  margin: 0;
}
</style>