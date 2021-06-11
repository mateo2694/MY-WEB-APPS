import MediaPlayer from './MediaPlayer';
import Autoplay from './plugins/Autoplay';
import Autopause from './plugins/Autopause';
import AdsPlugin from './plugins/Ads/AdsPlugin';

// DOM elements
const video: HTMLMediaElement = document.querySelector("video");
const playButton: HTMLElement = document.getElementById("playButton");
const muteButton: HTMLElement = document.getElementById("muteButton");

const player: MediaPlayer = new MediaPlayer({ target: video, plugins: [new Autoplay, new Autopause, new AdsPlugin] });
playButton.onclick = () => player.playPause();
muteButton.onclick = () => player.muteUnmute();