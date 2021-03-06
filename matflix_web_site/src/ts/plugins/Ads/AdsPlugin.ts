import MediaPlayer from "../../MediaPlayer";
import { Ads, Ad } from './Ads';

const AD_PERIOD: number = 30;
const AD_LIFESPAN: number = 10;

class AdsPlugin {
    private ads: Ads;
    private player: MediaPlayer;
    private currentAd: Ad;
    private adsContainer: Element;

    constructor() {
        this.ads = Ads.getInstance();
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    run(mediaPlayer: MediaPlayer) {
        this.player = mediaPlayer;
        this.player.media.addEventListener('timeupdate', this.handleTimeUpdate);
        this.adsContainer = document.getElementById('adsContainer');//this.player.media.nextElementSibling;
    }

    private handleTimeUpdate() {
        const currentTime = Math.floor(this.player.media.currentTime);

        if (currentTime % AD_PERIOD === 0) {
            this.renderAd();
        }
    }

    private renderAd() {
        if (this.currentAd) {
            return;
        }

        const ad = this.ads.getAd();
        this.currentAd = ad;
        this.adsContainer.innerHTML = `
            <div class="ads">
                <a class="ads__link" href="${this.currentAd.url}" target="_blank">
                    <img class="ads__img" src="${this.currentAd.imageUrl}" />
                    <div class="ads__info">
                        <h5 class="ads__title font--emphasis">${this.currentAd.title}</h5>
                        <p class="ads__body font--normal">${this.currentAd.body}</p>
                    </div>
                </a>
            </div>`;

        setTimeout(() => {
            this.currentAd = null;
            this.adsContainer.innerHTML = '';
        }, AD_LIFESPAN * 1000);
    }
}

export default AdsPlugin;