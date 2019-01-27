<template>
  <div>
    <title-card v-if="state === 'TITLE'" v-on:next="state = 'PLAY'" />
    <actual-game v-else-if="state === 'PLAY'" v-on:done="gameDone" />
    <div v-else-if="state === 'GAMEOVER'">
      <h2 v-if="finalScore > 0">You&apos;re a winner! You made something!</h2>
      <h2 v-if="finalScore == 0">Somehow, you ended exactly where you started. You&apos;re a winner!</h2>
      <h2 v-if="finalScore < 0">You managed to end the jam with less of a game than you started with. You&apos;re still a winner though.</h2>
      <br />
      <button v-on:click="state = 'PLAY'">Play Again</button>
    </div>
  </div>
</template>
<script>
import TitleCard from './TitleCard'
import ActualGame from './ActualGame'
export default {
  name: 'Game',
  components: { TitleCard, ActualGame },
  data () {
    return {
      state: 'TITLE',
      finalScore: 0
    }
  },
  methods: {
    gameDone (finalScore) {
      this.finalScore = finalScore
      this.state = 'GAMEOVER'
    }
  }
}
</script>