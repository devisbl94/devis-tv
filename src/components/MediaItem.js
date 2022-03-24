import { Lightning, Colors, Utils, Registry } from '@lightningjs/sdk'
import { getImgUrl, formatDate } from '../lib/tools'

export default class MediaItem extends Lightning.Component {
    static _template() {
        const textStyle = {
            textColor: Colors('white').get(),
            fontFace: 'Regular',
            fontSize: 16,
        }

        return {
            w: 300,
            h: 450,
            Shadow: {
                alpha: 0,
                mount: 0.5,
                x: w => w / 2,
                y: h => h / 2,
                w: w => w + 32,
                h: h => h + 32,
                color: Colors('shadow').get(),
                rect: true,
                shader: {
                    type: Lightning.shaders.FadeOut,
                    fade: 32,
                },
            },
            ImageWrapper: {
                w: w => w,
                h: h => h,
                shader: {
                    type: Lightning.shaders.RoundedRectangle,
                    radius: 4,
                },
                Background: {
                    w: w => w,
                    h: h => h,
                    color: Colors('white').get(),
                    rect: true,
                    LoadingSpinner: {
                        mount: 0.5,
                        src: Utils.asset('./images/loading.png'),
                        x: w => w / 2,
                        y: h => h / 2,
                        w: 100,
                        h: 100,
                    },
                },
                Image: {
                    mount: 0.5,
                    alpha: 0.01,
                    w: w => w,
                    h: h => h,
                    y: w => w / 2,
                    x: h => h / 2,
                },
                Info: {
                    x: 13,
                    y: h => h - h / 3,
                    w: w => w - 30,
                    h: h => h / 3 - 10,
                    rect: true,
                    alpha: 0,
                    color: Colors('black').get(),
                    Title: {
                        x: 20,
                        y: 5,
                        text: {
                            ...textStyle,
                            wordWrap: true,
                            maxLines: 2,
                            maxLinesSuffix: '...',
                            wordWrapWidth: 240,
                            fontSize: 24,
                        },
                    },
                    ReleaseDate: {
                        x: 20,
                        y: 70,
                        text: textStyle,
                    },
                    Rating: {
                        x: 20,
                        y: 100,
                        text: textStyle,
                    },
                },
                Focus: {
                    alpha: 0,
                    x: 3,
                    y: 3,
                    w: w => w - 7,
                    h: h => h - 7,
                    rect: true,
                    shader: {
                        type: Lightning.shaders.RoundedRectangle,
                        radius: 3,
                        stroke: 5,
                        strokeColor: 0xffffffff,
                        blend: 1,
                        fillColor: 0x00ffffff,
                    },
                },
            },
        }
    }

    _init() {
        this._spinRotation = this.tag('LoadingSpinner').animation({
            duration: 1,
            repeat: -1,
            stopMethod: 'inmediate',
            actions: [{ p: 'rotation', v: { 0: 0, 1: 6.29 } }],
        })

        this._spinRotation.start()

        this.tag('ImageWrapper.Image').on('txLoaded', () => {
            Registry.setTimeout(() => {
                this.tag('ImageWrapper.Image').setSmooth('alpha', 1)
                this._spinRotation.stop()
            }, 300)
        })

        this._focusAnimation = this.animation({
            duration: 0.2,
            actions: [
                { p: 'scale', v: { 0: 1, 1: 1.075 } },
                { t: 'Shadow', p: 'alpha', v: { 0: 0, 1: 1 } },
                { t: 'Info', p: 'scale', v: { 0: 1, 1: 1.1 } },
                { t: 'Focus', p: 'alpha', v: { 0: 0, 1: 1 } },
            ],
        })

        this._fadeAnimation = this.animation({
            delay: 0.4,
            duration: 0.3,
            actions: [{ t: 'Info', p: 'alpha', v: { 0: 0, 1: 0.8 } }],
        })
    }

    _focus() {
        if (this._focusAnimation) {
            this._focusAnimation.start()
        }
        if (this._fadeAnimation) {
            this._fadeAnimation.start()
        }
    }

    _unfocus() {
        this._focusAnimation.stop()
        this._fadeAnimation.stop()
    }

    set data(data) {
        this._data = {
            imageUrl:
                data.poster_path == null
                    ? Utils.asset('./images/unavailable.png')
                    : data.poster_path,
            title: typeof data.title !== 'undefined' ? data.title : data.name,
            genreIds: [...data.genre_ids],
            releaseDate:
                typeof data.release_date !== 'undefined'
                    ? 'Release date: ' + formatDate(data.release_date)
                    : 'First aired: ' + formatDate(data.first_air_date),
            desc: data.overview,
            rating:
                parseFloat(data.vote_average) > 0
                    ? 'Rating: ' + String(data.vote_average)
                    : 'Rating: N/A',
        }

        this.tag('ImageWrapper').patch({
            Image: {
                texture: {
                    type: Lightning.textures.ImageTexture,
                    src:
                        this._data.imageUrl.indexOf('unavailable') > -1
                            ? this._data.imageUrl
                            : getImgUrl(this._data.imageUrl, 300),
                },
            },
            Info: {
                Title: {
                    text: this._data.title,
                },
                ReleaseDate: {
                    text: this._data.releaseDate,
                },
                Rating: {
                    text: this._data.rating,
                },
            },
        })
    }

    get data() {
        return this._data
    }
}
