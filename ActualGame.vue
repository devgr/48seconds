<template>
  <div>
    <p>Time Remaining: {{ time }}</p>
    <p>Game Completion: {{ percent }}&percnt;</p>
    <br />
    <p v-if="previousResult" class="italic">{{ previousResult }}</p>
    <p>{{ question.text }}</p>
    <button v-for="(answer, key) in question.answers" :key="key" v-on:click="clickAnswer(answer)">{{ answer.text }}</button>
  </div>
</template>
<script>
import QuestionProvider from './QuestionProvider'
export default {
  name: 'ActualGame',
  data () {
    const maxTime = 48

    this.timer = window.setInterval(() => {
      this.tick()
    }, 1000)

    this.questionProvider = new QuestionProvider(maxTime)

    return {
      percent: 0,
      time: maxTime,
      question: this.questionProvider.getNext(maxTime),
      previousResult: ''
    }
  },
  methods: {
    tick () {
      if (this.time === 0) {
        this.$emit('done', this.percent)
      }
      this.time--
    },
    beforeDestroy () {
      window.clearInterval(this.timer)
    },
    clickAnswer (answer) {
      const result = this.questionProvider.calcChange(answer)
      this.percent += result.change
      this.previousResult = result.text
      let delayMS = 750
      if (result.text) {
        delayMS = 2000
      }
      this.question = {
        text: '',
        answers: []
      }
      window.setTimeout(() => {
        this.question = this.questionProvider.getNext(this.time)
        this.previousResult = ''
      }, delayMS)
    }
  }
}
</script>