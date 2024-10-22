<template>
  <div id="app">
    <!-- VideoPlayer 컴포넌트 삽입 -->
    <VideoPlayer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VideoPlayer from "./components/VideoPlayer.vue";

export default defineComponent({
  name: "App",
  components: {
    VideoPlayer, // VideoPlayer 컴포넌트를 등록하는 개념
  },
});
</script>

<style>
/* scss를 사용해보자 */
</style>
