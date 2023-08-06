import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // esta linea sirve para conectar nuestra App con la extension REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
    rootReducer,
    composeEnhancer(applyMiddleware(thunkMiddleware)) // esta línea sirva para que podamos hacer peticiones a una Api/servidor
);


export default store;