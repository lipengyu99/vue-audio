<template>
  <div class="home">
    <Player/>
  </div>
</template>

<script>
// @ is an alias to /src
import Player from '../components/Player.vue'
export default {

  components: {
    Player
  }
}
</script>
<style lang="scss">
  .home{
   position: relative;
   z-index: 0;
   display: flex;
  justify-content: center;
    align-items: center;
   width: 100%;
   height: 100vh;
   background-color: pink;
  }
</style>
