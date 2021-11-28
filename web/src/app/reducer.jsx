import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import userReducer from '../features/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = { key: 'root', storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

// eslint-disable-next-line max-len
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));
export const persistor = persistStore(store);
