import { BASE_URL } from "../../config/api";
import {
  CATEGORIES_ERROR_MESSAGE,
  CATEGORIES_GET_SUCCESS,
  PRODUCTS_DELETE,
  PRODUCTS_GET_SUCCESS,
  PRODUCTS_LOADING,
  PRODUCT_ERROR_MESSAGE,
  PROUDUCT_BY_ID_GET,
  USER_SET_ACCESS_TOKEN,
} from "./actionType";

const fetchProductSuccess = (payload) => ({
  type: PRODUCTS_GET_SUCCESS,
  payload,
});
const productLoading = (payload) => ({
  type: PRODUCTS_LOADING,
  payload,
});
const productFormError = (errors) => ({
  type: PRODUCT_ERROR_MESSAGE,
  errors,
});
const fetchCategories = (payload) => ({
  type: CATEGORIES_GET_SUCCESS,
  payload,
});
const categoryFormError = (errors) => ({
  type: CATEGORIES_ERROR_MESSAGE,
  errors,
});
const setProductById = (payload) => ({
  type: PROUDUCT_BY_ID_GET,
  payload,
});
export const fetchProduct = () => async (dispatch) => {
  try {
    dispatch(productLoading(true));
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const response = await fetch("http://localhost:3000/products", {
      method: "GET",
    });
    const dataJson = await response.json();
    dispatch(fetchProductSuccess(dataJson.data));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(productLoading(false));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await fetch(BASE_URL + `/Products/${id}`, {
      method: "DELETE",
    });
    dispatch(fetchProduct());
  } catch (err) {
    console.log(err);
  }
};

export const addProduct = (payload) => async (dispatch) => {
  try {
    const images = [];
    images.push(payload.images1, payload.images2, payload.images3);
    const data = { ...payload, images: images };
    const response = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
  } catch (err) {
    return { err };
  }
};

export const fetchProductById = (id) => async (dispatch) => {
  try {
    dispatch(productLoading(true));

    const response = await fetch(BASE_URL + `/Products/${id}`, {
      method: "GET",
    });
    const dataJson = await response.json();
    dispatch(setProductById(dataJson.data));
    return dataJson.data;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(productLoading(false));
  }
};

export const putProduct = (id, payload) => async (dispatch) => {
  try {
    const images = [];
    const imgId = [];
    images.push(payload.images1, payload.images2, payload.images3);
    imgId.push(payload.id1, payload.id2, payload.id3);
    const data = { ...payload, images: images, imageId: imgId };
    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
  } catch (err) {
    return { err };
  }
};

export const login = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
  } catch (err) {
    console.log(err);
  } finally {
  }
};
export const register = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
  } catch (err) {
    return { err };
  }
};

export const fetchCategory = () => async (dispatch) => {
  try {
    const data = await fetch(`${BASE_URL}/categories`, {
      method: "GET",
    });
    const { categories } = await data.json();
    dispatch(fetchCategories(categories));
  } catch (err) {
    console.log(err);
  }
};

export const addCategory = (payload) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        access_token: localStorage.getItem("access_token"),
      },
      body: JSON.stringify(payload),
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
  } catch (err) {
    return { err };
  }
};
export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        access_token: localStorage.getItem("access_token"),
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw responseJson.message;
    }
  } catch (err) {
    console.log(err);
  }
};
