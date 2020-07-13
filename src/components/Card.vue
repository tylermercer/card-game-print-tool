<template>
  <div :class="['back', large ? 'large' : 'small']" :style="{ backgroundColor: cardInfo.backColor }" v-if="facedown">
    <p>{{cardInfo.backText}}</p>
  </div>
  <div :class="['front', large ? 'large' : 'small']" v-else>
    <h4>{{cardInfo.title}}</h4>
    <p>{{cardInfo.body}}</p>
  </div> 
</template>

<script>
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
    }
  },
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
  margin: 10px;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.2);
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
</style>