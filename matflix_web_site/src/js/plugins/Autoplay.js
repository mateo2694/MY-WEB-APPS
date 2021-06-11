class Autoplay {
    run(mediaPlayer) {
        if (!mediaPlayer.muted) {
            mediaPlayer.muted = true;
        }
        mediaPlayer.playPause();
    }
}
export default Autoplay;
