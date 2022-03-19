import { Lightning } from '@lightningjs/sdk'
import { Row } from '@lightningjs/ui-components'
import MediaItem from './MediaItem'

export default class MediaCarousel extends Lightning.Component {
    static _template() {
        return {
            x: 100,
            h: 650,
            w: 1920,
            Label: {
                text: {
                    text: '',
                    fontFace: 'Regular',
                    fontSize: 64,
                },
            },
            Row: {
                type: Row,
                y: 100,
                itemSpacing: 40,
                wrapSelected: true,
                scrollIndex: 0,
            },
        }
    }

    _init() {
        const items = []
        this._endpoint(this._category)
            .then(response => {
                return response.json()
            })
            .then(data => {
                data.results.map(value => {
                    items.push({
                        type: MediaItem,
                        data: value,
                    })
                })
                data.results.map(value => {
                    items.push({
                        type: MediaItem,
                        data: value,
                    })
                })
                this._row.items = items
            })
            .catch(error => {
                console.log(error)
            })
    }

    _getFocused() {
        return this._row
    }

    set label(value) {
        this.tag('Label').text = value
    }

    set category(value) {
        this._category = value
    }

    set endpoint(value) {
        this._endpoint = value
    }

    get _row() {
        return this.tag('Row')
    }
}
