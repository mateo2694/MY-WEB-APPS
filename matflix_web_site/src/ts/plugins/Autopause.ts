import MediaPlayer from "../MediaPlayer";

const THRESHOLD: number = 0.25;

class Autopause {
    private threshold: number;
    private player: MediaPlayer;
    private observer: IntersectionObserver;

    constructor() {
        this.threshold = THRESHOLD;
        this.handleIntersectionObserver = this.handleIntersectionObserver.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    }

    run(mediaPlayer: MediaPlayer) {
        this.player = mediaPlayer;
        this.observer = new IntersectionObserver(this.handleIntersectionObserver, { threshold: this.threshold });
        this.observer.observe(this.player.media);
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    private handleIntersectionObserver(entries: IntersectionObserverEntry[]) {
        const isVisible: boolean = entries[0].intersectionRatio >= this.threshold;
        isVisible ? this.player.play() : this.player.pause();
    }

    private handleVisibilityChange() {
        const isVisible: boolean = document.visibilityState == 'visible';
        isVisible ? this.player.play() : this.player.pause();
    }
}

export default Autopause;