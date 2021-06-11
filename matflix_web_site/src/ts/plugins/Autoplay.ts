import MediaPlayer from "../MediaPlayer";

class Autoplay {
    run(mediaPlayer: MediaPlayer) {
        if (!mediaPlayer.muted) {
            mediaPlayer.muted = true;
        }

        mediaPlayer.playPause();
    }
}

export default Autoplay;