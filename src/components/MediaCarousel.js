import { Lightning, Colors, Registry } from '@lightningjs/sdk'
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
                PlaceHolder: {
                    alpha: 0.0001,
                    x: 620,
                    y: 200,
                    text: {
                        text: 'No items available',
                        fontColor: Colors('white').get(),
                        fontFace: 'Regular',
                        fontSize: 48,
                        highlightPaddingLeft: 20,
                        highlightPaddingRight: 20,
                        highlightColor: 0x8c000000,
                    },
                },
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
                this._data = data
            })
            .catch(error => {
                console.log(error)
            })
    }

    _getFocused() {
        return this._row
    }

    _focus() {
        this.tag('Row').patch({
            PlaceHolder: {
                text: {
                    highlight: true,
                },
            },
        })
    }

    _unfocus() {
        this.tag('Row').patch({
            PlaceHolder: {
                text: {
                    highlight: false,
                },
            },
        })
    }

    _handleEnter() {
        if (this._row.selected) {
            this.fireAncestors('$getItemSelected', this._row.selected.data)
        }
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

    applyFilter(filterId) {
        let items = []
        if (filterId == 0) {
            this._data.results.map(item => {
                items.push({
                    type: MediaItem,
                    data: item,
                })
            })
            this._data.results.map(item => {
                items.push({
                    type: MediaItem,
                    data: item,
                })
            })
        } else {
            this._data.results.map(item => {
                for (const index in item) {
                    if (index == 'genre_ids') {
                        item[index].map(genreId => {
                            if (genreId === filterId) {
                                items.push({
                                    type: MediaItem,
                                    data: item,
                                })
                            }
                        })
                    }
                }
            })
        }

        this._row.items = []
        if (items.length > 0) {
            this.tag('Row.PlaceHolder').setSmooth('alpha', 0.0001)
            let count = 0
            let interval = Registry.setInterval(() => {
                if (count == items.length) {
                    Registry.clearInterval(interval)
                }
                if (items[count]) {
                    this._row.appendItems([items[count]])
                }
                count++
            }, 30)
        } else {
            this.tag('Row.PlaceHolder').setSmooth('alpha', 1)
        }
    }
}
