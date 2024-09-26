import { createRoot } from 'react-dom/client'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App.tsx'
import authReducer from './redux/auth-reducer.ts'
import './index.scss'
import { StrictMode } from 'react';

const rootReducer = combineReducers({ auth: authReducer })

const store = createStore(rootReducer)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    </StrictMode>
)
