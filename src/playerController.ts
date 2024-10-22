import Hls from "hls.js";

export const initializePlayer = (
  videoElement: HTMLVideoElement,
  src: string
) => {
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(videoElement);
  } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
    videoElement.src = src;
  }
};

export const playVideo = (videoElement: HTMLVideoElement) => {
  videoElement.play();
  console.info("play");
};

export const pauseVideo = (videoElement: HTMLVideoElement) => {
  videoElement.pause();
  console.info("pause");
};

export const stopVideo = (videoElement: HTMLVideoElement) => {
  videoElement.pause();
  videoElement.currentTime = 0;
  console.info("stop");
};
