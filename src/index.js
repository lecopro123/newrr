import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import RouterConfig from './app/routerConfig'
import { ThemeProvider } from './app/theme/ThemeContext'
import './index.scss'
import store from './redux/storeConfig'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <ThemeProvider>
        <Provider store={store}>
            <React.StrictMode>
                <RouterConfig />
            </React.StrictMode>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
