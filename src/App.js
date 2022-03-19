/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Lightning, Utils } from '@lightningjs/sdk'
import { Column } from '@lightningjs/ui-components'
import MediaCarousel from './components/MediaCarousel'
import {
    getPopular,
    getTrending,
    getTopRated,
    getAnimatedMovies,
    getUpcomingMovieReleases,
    getShowsAiring,
    getDocumentaries,
} from './lib/endpoints'

export default class App extends Lightning.Component {
    static getFonts() {
        return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
    }

    static _template() {
        return {
            Background: {
                w: 1920,
                h: 1080,
                color: 0xff273d3d,
                rect: true,
            },
            Column: {
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
            },
            Logo: {
                x: 1500,
                y: 60,
                src: Utils.asset('images/logo.png'),
            },
        }
    }

    _getFocused() {
        return this.tag('Column')
    }
}
