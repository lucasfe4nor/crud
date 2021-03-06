import { call, put, takeLatest } from 'redux-saga/effects';

import {
  ALL_PRODUCTS,
  NEW_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from '../services/api';

import {
  getProductsSucess,
  newProductFailed,
  newProductSucess,
  updateProductFailed,
  updateProductSucess,
  deleteProductSucess,
} from '../actions/products';

function* getProducts(action) {
  try {
    const products = yield call(ALL_PRODUCTS, action.page, action.sort);

    yield put(getProductsSucess(products.products, products.totalPages));
  } catch (error) {
    console.log(error);
  }
}

function* newProduct(action) {
  try {
    const response = yield call(NEW_PRODUCT, action.product);

    if (response.product) {
      yield put(newProductSucess(response.product));
    } else {
      throw response;
    }
  } catch (error) {
    yield put(newProductFailed(error.error));
  }
}

function* updateProduct(action) {
  try {
    const response = yield call(
      UPDATE_PRODUCT,
      action.product,
      action.productId
    );

    if (response.product) {
      yield put(updateProductSucess(response.product));
    } else {
      throw response;
    }
  } catch (error) {
    yield put(updateProductFailed(error.error));
  }
}

function* deleteProduct(action) {
  try {
    yield call(DELETE_PRODUCT, action.productId);

    yield put(deleteProductSucess(action.productId));
  } catch (error) {
    console.log(error);
  }
}

function* productSaga() {
  yield takeLatest('GET_PRODUCTS_REQUESTED', getProducts);
  yield takeLatest('NEW_PRODUCT_REQUESTED', newProduct);
  yield takeLatest('UPDATE_PRODUCT_REQUESTED', updateProduct);
  yield takeLatest('DELETE_PRODUCT_REQUESTED', deleteProduct);
}

export default productSaga;
