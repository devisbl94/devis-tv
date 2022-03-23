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
                this._data = data
            })
            .catch(error => {
                console.log(error)
            })
    }

    _getFocused() {
        return this._row
    }

    _handleEnter() {
        this.fireAncestors('$getItemSelected', this._row.selected.data)
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

        this._row.items = items
    }
}
