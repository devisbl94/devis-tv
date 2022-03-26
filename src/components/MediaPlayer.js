import { Lightning, VideoPlayer } from '@lightningjs/sdk'

export default class MediaPlayer extends Lightning.Component {
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

    PlayVideo() {
        VideoPlayer.open(VideoPlayer.src)
        VideoPlayer.play()
    }

    StopVideo() {
        VideoPlayer.pause()
    }

    SkipForward() {
        VideoPlayer.skip(5)
    }

    SkipBackward() {
        VideoPlayer.skip(-5)
    }
}
