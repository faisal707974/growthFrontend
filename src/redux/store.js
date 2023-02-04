import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addProductReducer } from './reducers/productReducer'


const reducer = combineReducers({
    products: addProductReducer
})

const middleware = [thunk]

// const initialState = {
//     products: []
// }

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)))

export default store;