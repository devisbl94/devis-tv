import { Lightning, Colors, Utils } from '@lightningjs/sdk'
import { Row, Button } from '@lightningjs/ui-components'
import { getImgUrl } from '../lib/tools'

export default class DetailsPage extends Lightning.Component {
    static _template() {
        const textStyle = {
            textColor: Colors('white').get(),
            fontFace: 'Regular',
        }

        return {
            alpha: 0.0001,
            Shadow: {
                w: 1920,
                h: 1080,
                rect: true,
                alpha: 0.5,
                color: Colors('black').get(),
            },
            Modal: {
                w: 1536,
                h: 864,
                x: 192,
                y: 108,
                rect: true,
                alpha: 0.9,
                color: Colors('black').get(),
                Details: {
                    alpha: 0.0001,
                    Title: {
                        x: 100,
                        y: 70,
                        text: {
                            ...textStyle,
                            wordWrapWidth: 700,
                            fontSize: 56,
                        },
                    },
                    Description: {
                        x: 100,
                        y: 250,
                        text: {
                            ...textStyle,
                            lineHeight: 36,
                            wordWrapWidth: 700,
                            wordWrap: true,
                            maxLines: 12,
                            maxLinesSuffix: '...',
                            fontSize: 24,
                        },
                    },
                    Buttons: {
                        type: Row,
                        x: 200,
                        y: 750,
                        itemSpacing: 75,
                        items: [
                            {
                                type: Button,
                                title: 'Play now',
                                radius: 5,
                                icon: {
                                    src: Utils.asset('./images/play.png'),
                                    size: 16,
                                    spacing: 8,
                                },
                            },
                            {
                                type: Button,
                                title: 'Add to favourites',
                                radius: 5,
                                icon: {
                                    src: Utils.asset('./images/star.png'),
                                    size: 16,
                                    spacing: 8,
                                },
                            },
                        ],
                    },
                    Poster: {
                        x: 1020,
                        y: 70,
                        w: 400,
                        h: 600,
                    },
                    ReleaseDate: {
                        x: 1020,
                        y: 680,
                        text: {
                            ...textStyle,
                            fontSize: 18,
                        },
                    },
                },
                LoadingSpinner: {
                    mount: 0.5,
                    x: w => w / 2,
                    y: h => h / 2,
                    h: 250,
                    w: 250,
                    src: Utils.asset('./images/loading.png'),
                },
            },
        }
    }

    _init() {
        this._spinRotation = this.tag('Modal.LoadingSpinner').animation({
            duration: 1,
            repeat: -1,
            stopMethod: 'inmediate',
            actions: [{ p: 'rotation', v: { 0: 0, 1: 6.29 } }],
        })
    }

    _getFocused() {
        return this.tag('Buttons')
    }

    set data(data) {
        this.tag('Modal.Details').patch({
            Title: {
                text: data.title,
            },
            Description: {
                text: data.desc.length > 0 ? data.desc : 'No description found.',
            },
            Poster: {
                src:
                    data.imageUrl.indexOf('unavailable') > -1
                        ? data.imageUrl
                        : getImgUrl(data.imageUrl, 500),
            },
            ReleaseDate: {
                text: data.releaseDate,
            },
        })
    }

    StartLoading() {
        this.tag('Modal.Details.Buttons').selectedIndex = 0
        this._spinRotation.start()
        this.tag('Modal.Details.Poster').on('txLoaded', () => {
            this.tag('Modal.LoadingSpinner').setSmooth('alpha', 0.0001)
            this.tag('Modal.Details').setSmooth('alpha', 1)
            this._spinRotation.stop()
        })
    }

    ClearModal() {
        this._spinRotation.stop()
        this.tag('Modal.LoadingSpinner').setSmooth('alpha', 1)
        this.tag('Modal.Details').setSmooth('alpha', 0.0001)
        this.fireAncestors('$unselectItem')
    }
}
