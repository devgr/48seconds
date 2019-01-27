<template>
  <h2>{{ text }}</h2>
</template>
<script>
export default {
  name: 'TitleCard',
  data () {
    window.setTimeout(() => {
      this.text = 'This should be easy.'
    }, 4000)
    window.setTimeout(() => {
      this.$emit('next')
    }, 8000)

    return {
      text: 'Ah! The Global Game Jam, where I feel at home.'
    }
  }
}
</script>