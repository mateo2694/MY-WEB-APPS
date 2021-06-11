class MediaPlayer {
    constructor({ target, plugins }) {
        this.media = target;
        this.plugins = plugins;
        this._initPlugins();
    }
    _initPlugins() {
        this.plugins.forEach(plugin => {
            plugin.run(this);
        });
    }
    playPause() {
        this.media.paused ? this.media.play() : this.media.pause();
    }
    play() {
        this.media.play();
    }
    pause() {
        this.media.pause();
    }
    muteUnmute() {
        this.media.muted ? this.media.muted = false : this.media.muted = true;
    }
    get muted() {
        return this.media.muted;
    }
    set muted(isMuted) {
        this.media.muted = isMuted;
    }
}
export default MediaPlayer;
