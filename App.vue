<template>
  <game />
</template>
<script>
import Game from './Game'
export default {
  name: 'Home',
  components: { Game }
}
</script>
<style>
body {
  font-family: sans-serif;
  color: white;
  background-color: black;
  text-align: center;
}
p {
  font-size: 2em;
}
p.italic {
  font-style: italic;
}
button {
  display: block;
  font-size: 2em;
  background-color: black;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 5px;
}
button:hover {
  cursor: pointer;
}
</style>