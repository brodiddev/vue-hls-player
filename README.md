# vue-hls-player

이 프로젝트는 Vue.js 애플리케이션에서 **HLS.js**를 사용하여 HLS (.m3u8) 스트림을 재생하는 비디오 플레이어를 만드는 방법을 설명합니다. 플레이어는 기본적인 재생, 일시 정지, 정지 기능을 제공합니다.

## 목차

- [소개](#소개)
- [설치](#설치)
- [프로젝트 구조](#프로젝트-구조)
- [플레이어 구현](#플레이어-구현)
- [주요 코드 설명](#주요-코드-설명)
- [트러블슈팅](#트러블슈팅)
- [참고 자료](#참고-자료)

## 소개

이 프로젝트는 **Vue 3**과 **TypeScript**를 사용하여 **HLS.js**와 통합된 비디오 플레이어를 구현합니다. HLS 스트리밍을 지원하는 비디오 플레이어를 Vue 환경에서 쉽게 구현할 수 있도록 안내합니다.

## 설치

### 사전 준비 사항

프로젝트를 시작하기 전에 아래 소프트웨어가 설치되어 있어야 합니다:

- Node.js (버전 >= 14.x)
- Vue CLI (`npm install -g @vue/cli`)
- TypeScript

### 설치 과정

1. 리포지토리 클론:

   ```bash
   git clone https://github.com/your-username/vue-hls-player.git
   cd vue-hls-player
   ```

2. 의존성 설치:

   ```bash
   npm install
   ```

3. 개발 서버 실행:

   ```bash
   npm run serve
   ```

   브라우저에서 `http://localhost:8080/`로 접속하여 HLS 플레이어를 확인할 수 있습니다.

## 프로젝트 구조

```bash
vue-hls-player/
├── src/
│   ├── components/
│   │   ├── VideoPlayer.vue   # 메인 플레이어 컴포넌트
│   │   ├── PlayerButton.vue  # 재생, 일시 정지, 정지 버튼 컴포넌트
│   ├── App.vue               # 루트 Vue 컴포넌트
│   ├── main.ts               # Vue 애플리케이션 진입점
│   ├── playerController.ts   # 비즈니스 로직 (HLS.js) 처리
├── package.json              # 프로젝트 의존성 및 스크립트
├── tsconfig.json             # TypeScript 설정
└── vue.config.js             # Vue CLI 설정
```

## 플레이어 구현

### VideoPlayer.vue

`VideoPlayer` 컴포넌트는 비디오 요소를 포함하며, HLS.js를 초기화하고 기본적인 재생 컨트롤을 관리합니다.

```vue
<template>
  <div class="video-player">
    <video ref="videoRef" class="video" width="640" height="360" controls></video>
    <div class="controls">
      <PlayerButton @play="handlePlay" @pause="handlePause" @stop="handleStop" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import PlayerButton from './PlayerButton.vue';
import { initializePlayer, playVideo, pauseVideo, stopVideo } from '../playerController';

export default defineComponent({
  name: 'VideoPlayer',
  components: { PlayerButton },
  setup() {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

    onMounted(() => {
      if (videoRef.value) {
        initializePlayer(videoRef.value, videoSrc);
      }
    });

    const handlePlay = () => videoRef.value && playVideo(videoRef.value);
    const handlePause = () => videoRef.value && pauseVideo(videoRef.value);
    const handleStop = () => videoRef.value && stopVideo(videoRef.value);

    return { videoRef, handlePlay, handlePause, handleStop };
  },
});
</script>

<style scoped>
.video-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
</style>
```

### playerController.ts

`playerController.ts` 파일에는 HLS 스트림을 관리하는 비즈니스 로직과 재생, 일시 정지, 정지 기능이 포함됩니다.

```ts
import Hls from 'hls.js';

export const initializePlayer = (videoElement: HTMLVideoElement, src: string) => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(videoElement);
  } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
    videoElement.src = src;
  }
};

export const playVideo = (videoElement: HTMLVideoElement) => {
  videoElement.play();
  console.info("재생 중");
};

export const pauseVideo = (videoElement: HTMLVideoElement) => {
  videoElement.pause();
  console.info("일시 정지");
};

export const stopVideo = (videoElement: HTMLVideoElement) => {
  videoElement.pause();
  videoElement.currentTime = 0;
  console.info("정지");
};
```

## 주요 코드 설명

- **HLS.js 통합**: `initializePlayer` 함수에서 HLS.js가 초기화되며, HLS 스트림이 비디오 요소에 로드됩니다. 브라우저에서 HLS를 직접 지원하지 않으면 HLS.js가 이를 대신 처리합니다.
- **재생, 일시 정지, 정지 기능**: 이 함수들은 HTML5 비디오 API를 사용하여 비디오 요소의 재생 상태를 제어합니다.

## 트러블슈팅

#### `.vue` 모듈에 대한 타입 정의 문제
비즈니스 로직과 UI 로직을 분리하기 위해 **Vue** 파일을 TypeScript와 함께 사용할 때는 `.vue` 모듈에 대한 타입을 정의하는 파일을 생성해야 합니다. 다음과 같은 내용을 가진 `shims-vue.d.ts` 파일을 `src` 폴더 아래에 생성하세요:

```typescript
/**
 * .vue 모듈에 대한 타입을 정의하는 파일을 생성해주면 해결
 * src 아래 shims-vue.d.ts 파일명으로 생성한다.
 * shims-vue.d.ts 파일은 Vue.js와 TypeScript를 함께 사용할 때 타입 정의 파일을 선언하기 위한 관례적인 이름이다.
 * shims는 특정한 환경에서 다른 환경과의 호환성을 제공하기 위해 사용되는 코드 조각을 의미한다.
 */
/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```
## 참고 자료

- [Vue.js 공식 문서](https://vuejs.org/)
- [HLS.js 공식 문서](https://github.com/video-dev/hls.js/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)

