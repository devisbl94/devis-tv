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
                items: [
                    {
                        type: MediaCarousel,
                        label: 'Popular movies',
                        category: 'movie',
                        endpoint: getPopular,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Movies trending right now',
                        category: 'movie',
                        endpoint: getTrending,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Top rated movies',
                        category: 'movie',
                        endpoint: getTopRated,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Popular animated movies',
                        category: 'movie',
                        endpoint: getAnimatedMovies,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Upcoming movie releases',
                        category: 'movie',
                        endpoint: getUpcomingMovieReleases,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Popular series',
                        category: 'tv',
                        endpoint: getPopular,
                    },
                    {
                        type: MediaCarousel,
                        label: 'TV shows trending right now',
                        category: 'tv',
                        endpoint: getTrending,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Top rated series',
                        category: 'tv',
                        endpoint: getTopRated,
                    },
                    {
                        type: MediaCarousel,
                        label: 'TV shows airing today',
                        category: 'tv',
                        endpoint: getShowsAiring,
                    },
                    {
                        type: MediaCarousel,
                        label: 'Recommended documentaries',
                        category: 'tv',
                        endpoint: getDocumentaries,
                    },
                ],
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
                    x: 150,
                    y: 60,
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

    _init() {
        this._setState('NavBar')
    }

    static _states() {
        return [
            class NavBar extends this {
                _getFocused() {
                    return this.tag('NavBar')
                }
                _handleDown() {
                    this._setState('Content')
                }
            },
            class Content extends this {
                _getFocused() {
                    return this.tag('Content')
                }
                _handleUp() {
                    this._setState('NavBar')
                }
            },
        ]
    }

    selectedChange(itemSelected) {
        Registry.clearIntervals()
        this.tag('Content').items.map(row => {
            row.applyFilter(itemSelected.genreId)
        })
    }
}
