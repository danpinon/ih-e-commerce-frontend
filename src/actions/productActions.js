import axios from 'axios';


import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS

} from '../constants/productConstants'

export const getProducts = (keyword = '', currentPage = 1, price, category, ratings = 0) => async (dispatch) => {
    try {

        dispatch({ type: ALL_PRODUCTS_REQUEST})

        let link = `https://shop-it-ecommerce.herokuapp.com/api/v1/products?keyword=apple&category=Electronics&ratings[gte]=0/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${ratings}`
        if(category) {
            link = `https://shop-it-ecommerce.herokuapp.com/api/v1/products?keyword=apple&category=Electronics&ratings[gte]=0/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(link)
        console.log('data', data)
        dispatch({ 
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })

        

    } catch(error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://shop-it-ecommerce.herokuapp.com/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({ 
        type: CLEAR_ERRORS
    })
}