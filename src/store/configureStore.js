import AppReducer from '../Reducers'
import { createStore, applyMiddleware } from 'redux';


export default () => {
    const store = createStore(
      AppReducer,
    );
    return store
}