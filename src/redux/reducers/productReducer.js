import { ADD_PRODUCT, DELETE_PRODUCT } from '../constants/productCostants'

export const addProductReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return action.payload
        case DELETE_PRODUCT:
            return action.payload
        default:
            return state
    }
}