const THRESHOLD = 0.25;
class Autopause {
    constructor() {
        this.threshold = THRESHOLD;
        this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }
    run(mediaPlayer) {
        this.player = mediaPlayer;
        this.observer = new IntersectionObserver(this.handleIntersectionObserver, { threshold: this.threshold });
        this.observer.observe(this.player.media);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }
    handleIntersectionObserver(entries) {
        const isVisible = entries[0].intersectionRatio >= this.threshold;
        isVisible ? this.player.play() : this.player.pause();
    }
    handleVisibilityChange() {
        const isVisible = document.visibilityState == 'visible';
        isVisible ? this.player.play() : this.player.pause();
    }
}
export default Autopause;
