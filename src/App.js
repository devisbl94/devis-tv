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
import MainPage from './pages/MainPage'
import DetailsPage from './pages/DetailsPage'
import MediaPlayer from './components/MediaPlayer'

export default class App extends Lightning.Component {
    static getFonts() {
        return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
    }

    static _template() {
        return {
            MainPage: {
                type: MainPage,
            },
            DetailsPage: {
                type: DetailsPage,
            },
            MediaPlayer: {
                type: MediaPlayer,
            },
        }
    }

    static _states() {
        return [
            class ShowMain extends this {
                _getFocused() {
                    return this._mainPage
                }
            },
            class ShowDetails extends this {
                $enter() {
                    this._detailsPage.setSmooth('alpha', 1)
                    this._detailsPage.StartLoading()
                }
                $exit() {
                    this._detailsPage.setSmooth('alpha', 0.0001)
                }
                _getFocused() {
                    return this._detailsPage
                }
                _handleBack() {
                    this._detailsPage.ClearModal()
                    this._setState('ShowMain')
                }
            },
            class ShowPlayer extends this {
                $enter() {
                    this._mainPage.setSmooth('alpha', 0.0001)
                    this._mediaPlayer.PlayVideo()
                }
                $exit() {
                    this._mainPage.setSmooth('alpha', 1)
                }
                _getFocused() {
                    return this._mediaPlayer
                }
                _handleBack() {
                    this._setState('ShowDetails')
                    this._mediaPlayer.StopVideo()
                }
                _handleLeft() {
                    this._mediaPlayer.SkipBackward()
                }
                _handleRight() {
                    this._mediaPlayer.SkipForward()
                }
            },
        ]
    }

    _init() {
        this._setState('ShowMain')
    }

    $getItemSelected(itemlSelected) {
        this._detailsPage.data = itemlSelected
        this._setState('ShowDetails')
    }

    $unselectItem() {
        this._setState('ShowMain')
    }

    $enterPlayer() {
        this._setState('ShowPlayer')
    }

    get _mainPage() {
        return this.tag('MainPage')
    }

    get _detailsPage() {
        return this.tag('DetailsPage')
    }

    get _mediaPlayer() {
        return this.tag('MediaPlayer')
    }
}
