import MediaPlayer from './MediaPlayer.js';
import Autoplay from './plugins/Autoplay.js';
import Autopause from './plugins/Autopause.js';
import AdsPlugin from './plugins/Ads/AdsPlugin.js';
// DOM elements
const video = document.querySelector("video");
const playButton = document.getElementById("playButton");
const muteButton = document.getElementById("muteButton");
const player = new MediaPlayer({ target: video, plugins: [new Autoplay, new Autopause, new AdsPlugin] });
playButton.onclick = () => player.playPause();
muteButton.onclick = () => player.muteUnmute();
