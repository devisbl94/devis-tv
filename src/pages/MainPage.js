import { Lightning, Utils, Registry } from '@lightningjs/sdk'
import { Column, Row, Button } from '@lightningjs/ui-components'
import MediaCarousel from '../components/MediaCarousel'
import {
    getPopular,
    getTrending,
    getTopRated,
    getAnimatedMovies,
    getUpcomingMovieReleases,
    getShowsAiring,
    getDocumentaries,
} from '../lib/endpoints'

export default class MainPage extends Lightning.Component {
    static _template() {
        const ButtonStyle = {
            type: Button,
            radius: 5,
            h: 60,
        }

        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff273d3d,
                rect: true,
            },
            Content: {
                type: Column,
                y: 200,
            },
            Header: {
                alpha: 0.8,
                rect: true,
                w: 1920,
                h: 150,
                color: 0xff273d3d,
                NavBar: {
                    type: Row,
                    alpha: 1,
                    x: 300,
                    y: 80,
                    itemSpacing: 40,
                    scrollIndex: 0,
                    signals: {
                        selectedChange: true,
                    },
                    items: [
                        {
                            ...ButtonStyle,
                            title: 'All',
                            genreId: 0,
                        },
                        {
                            ...ButtonStyle,
                            title: 'Animation',
                            genreId: 16,
                        },
                        {
                            ...ButtonStyle,
                            title: 'Drama',
                            genreId: 18,
                        },
                        {
                            ...ButtonStyle,
                            title: 'Mystery',
                            genreId: 9648,
                        },
                        {
                            ...ButtonStyle,
                            title: 'Family ',
                            genreId: 10751,
                        },
                    ],
                },
            },
            Logo: {
                x: 1500,
                y: 60,
                src: Utils.asset('../../static/images/logo.png'),
            },
        }
    }

    async _init() {
        const contentData = [
            {
                label: 'Popular movies',
                category: 'movie',
                endpoint: getPopular,
            },
            {
                label: 'Movies trending right now',
                category: 'movie',
                endpoint: getTrending,
            },
            {
                label: 'Top rated movies',
                category: 'movie',
                endpoint: getTopRated,
            },
            {
                label: 'Popular animated movies',
                category: 'movie',
                endpoint: getAnimatedMovies,
            },
            {
                label: 'Upcoming movie releases',
                category: 'movie',
                endpoint: getUpcomingMovieReleases,
            },
            {
                label: 'Popular series',
                category: 'tv',
                endpoint: getPopular,
            },
            {
                label: 'TV shows trending right now',
                category: 'tv',
                endpoint: getTrending,
            },
            {
                label: 'Top rated series',
                category: 'tv',
                endpoint: getTopRated,
            },
            {
                label: 'TV shows airing today',
                category: 'tv',
                endpoint: getShowsAiring,
            },
            {
                label: 'Recommended documentaries',
                category: 'tv',
                endpoint: getDocumentaries,
            },
        ]

        this._data = []
        contentData.map(async row => {
            const response = await row.endpoint(row.category)
            const data = (await response.json()).results

            this._content.appendItems([
                {
                    type: MediaCarousel,
                    label: row.label,
                    data: data,
                },
            ])

            this._data.push({
                label: row.label,
                data: data,
            })

            this._setState('NavBar')
        })
    }

    static _states() {
        return [
            class NavBar extends this {
                _getFocused() {
                    return this._navbar
                }
                _handleDown() {
                    this._setState('Content')
                }
            },
            class Content extends this {
                _getFocused() {
                    return this._content
                }
                _handleUp() {
                    this._setState('NavBar')
                }
            },
        ]
    }

    get _navbar() {
        return this.tag('NavBar')
    }

    get _content() {
        return this.tag('Content')
    }

    selectedChange(itemSelected) {
        Registry.clearIntervals()
        this._content.items = []
        this._data.map(row => {
            if (itemSelected.genreId === 0) {
                this._content.appendItems([
                    {
                        type: MediaCarousel,
                        label: row.label,
                        data: row.data,
                    },
                ])
            } else {
                let items = []
                row.data.map(item => {
                    for (const index in item) {
                        if (index == 'genre_ids') {
                            item[index].map(genreId => {
                                if (itemSelected.genreId === genreId) {
                                    items.push(item)
                                }
                            })
                        }
                    }
                })
                if (items.length > 0) {
                    this._content.appendItems([
                        {
                            type: MediaCarousel,
                            label: row.label,
                            data: items,
                        },
                    ])
                }
            }
        })
    }
}
