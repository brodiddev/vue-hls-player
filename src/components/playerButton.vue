<template>
  <div>
    <button @click="$emit('play')">Play</button>
    <button @click="$emit('pause')">Pause</button>
    <button @click="$emit('stop')">Stop</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlayerButton",
  emits: ["play", "pause", "stop"],
});
</script>

<style scoped lang="scss">
button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    background-color: #1d6fa5;
  }

  &:not(:last-child) {
    margin-right: 10px;
  }
}
</style>
