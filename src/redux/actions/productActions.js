import { ADD_PRODUCT, DELETE_PRODUCT } from '../constants/productCostants'

export const productAction = (data) => async (dispatch, getstate) => {
    try {

        dispatch({ type: ADD_PRODUCT, payload: data })

    } catch (error) {

    }
}

export const deleteProduct = (id) => async (dispatch, getstate) => {
    try {
        const { products } = getstate()
        const afterDelete = products.filter((product, index) => {
            return product.code !== id
        })
        dispatch({ type: DELETE_PRODUCT, payload: afterDelete })

    } catch (error) {

    }
}