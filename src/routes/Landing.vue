<template>
  <Uploader class="centered"
            @publish="(decks) => $emit('publish', decks)"></Uploader>
</template>

<script>
import Uploader from '../components/Uploader'

export default {
  components: {
    Uploader
  }
}
</script>

<style scoped>
.centered {
  max-width: 600px;
  margin: 0 auto;
}
</style>