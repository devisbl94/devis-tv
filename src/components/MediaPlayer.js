import { Lightning, VideoPlayer, Utils } from '@lightningjs/sdk'

export default class MediaPlayer extends Lightning.Component {
    static _template() {
        return {
            Controls: {
                alpha: 0.0001,
                h: 70,
                w: 70,
                x: 925,
                y: 950,
                Rewind: {
                    h: 120,
                    w: 70,
                    x: x => x - 155,
                    y: y => y - 100,
                    src: Utils.asset('../../static/images/mediarewind.png'),
                },
                Forward: {
                    h: 120,
                    w: 70,
                    x: x => x + 15,
                    y: y => y - 100,
                    src: Utils.asset('../../static/images/mediaforward.png'),
                },
            },
        }
    }

    _init() {
        VideoPlayer.consumer(this)
        const videoUrl =
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

        const myLoader = (url, videoEl) => {
            return new Promise(resolve => {
                videoEl.setAttribute('src', url)
                videoEl.load()
                resolve()
            })
        }

        VideoPlayer.loader(myLoader)
        VideoPlayer.open(videoUrl)
        VideoPlayer.pause()
    }

    StartVideo() {
        VideoPlayer.open(VideoPlayer.src)
        VideoPlayer.play()
        this._controls.setSmooth('alpha', 0.8)
        this._active = true
        this.UpdateControls()
    }

    StopVideo() {
        VideoPlayer.pause()
        this._controls.setSmooth('alpha', 0.0001)
        this._active = false
        this.UpdateControls()
    }

    PlayPauseVideo() {
        VideoPlayer.playPause()
        this._active = !this._active
        this.UpdateControls()
    }

    SkipForward() {
        VideoPlayer.skip(5)
    }

    SkipBackward() {
        VideoPlayer.skip(-5)
    }

    UpdateControls() {
        if (this._active) {
            this._controls.patch({
                src: Utils.asset('../../static/images/mediapause.png'),
            })
        } else {
            this._controls.patch({
                src: Utils.asset('../../static/images/mediaplay.png'),
            })
        }
    }

    $videoPlayerEnded() {
        this.fireAncestors('$exitPlayer')
    }

    get _controls() {
        return this.tag('Controls')
    }
}
