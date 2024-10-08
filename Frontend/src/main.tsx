import { createRoot } from 'react-dom/client'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App.tsx'
import authReducer from './redux/auth-reducer.ts'
import './index.scss'
import { StrictMode } from 'react';

const rootReducer = combineReducers({ auth: authReducer })

const store = createStore(rootReducer, applyMiddleware(thunk))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
