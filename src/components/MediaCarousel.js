import { Lightning, Registry } from '@lightningjs/sdk'
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

    _getFocused() {
        return this._row
    }

    _handleEnter() {
        if (this._row.selected) {
            this.fireAncestors('$getItemSelected', this._row.selected.data)
        }
    }

    set label(value) {
        this.tag('Label').text = value
    }

    get _row() {
        return this.tag('Row')
    }

    set data(data) {
        this._data = [...data, ...data]
        let count = 0
        let interval = Registry.setInterval(() => {
            if (count == this._data.length) {
                Registry.clearInterval(interval)
            }

            if (this._data[count]) {
                this._row.appendItems([
                    {
                        type: MediaItem,
                        data: this._data[count],
                    },
                ])
            }
            count++
        }, 30)
    }
}
