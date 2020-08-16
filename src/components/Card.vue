<template>
  <div :class="['back', large ? 'large' : 'small', print ? 'print' : '']"
       :style="{ backgroundColor: colored ? `${cardInfo.backColor}` : null }"
       v-if="facedown">
    <p>{{cardInfo.backText}}</p>
  </div>
  <div :class="['front', large ? 'large' : 'small', print ? 'print' : '']"
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
  border: 2px solid black;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 4px;
  break-inside: avoid;
}
@media screen {
  .front,
  .back {
    box-shadow: 0px 4px 4px rgba(0,0,0,0.2);
  }
}
.back.large {
  font-size: 2rem;
}
.back.small,
.front.large {
  font-size: 1rem;
}
.front.small {
  font-size: 0.5rem;
}
.large {
  height: 280px;
  width: 200px;
  border-radius: 10px;
}
.small {
  height: 140px;
  width: 100px;
  border-radius: 5px;
}
.print {
  margin: 0;
  border-width: 1px;
  width: 25%;
  height: 25%;
}
.back.print {
  font-size: 2.5rem;
}
.front.print {
  font-size: 1.5rem;
}
</style>