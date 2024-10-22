<template>
  <div class="video-player">
    <video
      ref="videoRef"
      class="video"
      width="640"
      height="360"
      controls
    ></video>
    <div class="controls">
      <PlayerButton
        @play="handlePlay"
        @pause="handlePause"
        @stop="handleStop"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import PlayerButton from "./playerButton.vue";
import {
  initializePlayer,
  playVideo,
  pauseVideo,
  stopVideo,
} from "../playerController";

export default defineComponent({
  name: "VideoPlayer",
  components: {
    PlayerButton,
  },
  setup() {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

    onMounted(() => {
      if (videoRef.value) {
        initializePlayer(videoRef.value, videoSrc);
      }
    });

    const handlePlay = () => {
      if (videoRef.value) {
        playVideo(videoRef.value);
      }
    };

    const handlePause = () => {
      if (videoRef.value) {
        pauseVideo(videoRef.value);
      }
    };

    const handleStop = () => {
      if (videoRef.value) {
        stopVideo(videoRef.value);
      }
    };

    return {
      videoRef,
      handlePlay,
      handlePause,
      handleStop,
    };
  },
});
</script>

<style scoped lang="scss">
.video-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .video {
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .controls {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }
}
</style>
