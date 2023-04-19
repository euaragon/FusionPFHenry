import axios from "axios";
import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCT_DETAIL,
  GET_CATEGORY,
  GET_BRAND,
  GET_SIZE,
  POST_PUNCTUATION,
  GET_USERS,
  POST_USER_SUCCESS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_SIZE,
  ORDER_BY_PRICE,
  ORDER_BY_BEST_SELLING,
  GET_PRICE,
  PRICE_RANGE_SELECTOR,
  ADD_TO_CART,
  ADD_QUANTITY,
  ADD_SIZE,
  ADD_FAV,
  DELETE_FAV,
  GET_USERS_FAVORITES,
  GET_USER_BY_NAME,
  POST_INGRESO,
  BORRAR_TOKEN,
  POST_REGISTRO,
  POST_GOOGLE,
  GET_CART_BY_ID,
  CLOSE_SESSION,
  POST_NEWSLETTER,
  GET_NEWSLETTER,
  REGISTRO_NEWSLETTER,
  DELETE_PRODUCT_CART,
  UPDATE_PRODUCT_CART,
  POST_MERCADO_PAGO,
  GET_MERCADO_PAGO,
  GET_DATOS_USER,
  POST_ORDEN,
  GET_ORDEN_USER,
  PUT_PRODUCT_IMAGE,
  PUT_PRODUCT_PRICE,
  PUT_PRODUCT_STOCK,
  POST_PROMOTIONS,
  GET_PROMOTIONS,
  PUT_PROMO_CURRENT,
  PUT_ROL_USER,
  PUT_STATE_USER,
  GET_SALES,
} from "../Actions/actions.js";

const back = "http://localhost:3001";

// const back = para el deploy

export function getProducts() {
  return async function (dispatch) {
    try {
      var products = await axios.get(`${back}/product`);
      return dispatch({
        type: GET_PRODUCTS,
        payload: products.data,
      });
    } catch (error) {
      console.log("no se encontraron productos");
    }
  };
}

export function postProducts(payload) {
  return async function (dispatch) {
    
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      const newProduct = await axios.post(`${back}/product`, payload, {headers});
      console.log("POST", newProduct);
      return newProduct;
    } catch (error) {
      console.log("Error al crear un nuevo producto:", error.message);
    }
  };
}

export const postPunctuation = (productId, puntuacion) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.post(`${back}/reviews/${productId}`,{puntuacion},{headers});
      return dispatch({
        type: POST_PUNCTUATION,
      });
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error;// para poder mostrarlo en el front
    }
  }
}

export function getProductsByName(name) {
  return async function (dispatch) {
    try {
      var products = await axios.get(
        `${back}/product?name=${name}`
      );
      return dispatch({
        type: GET_PRODUCTS_BY_NAME,
        payload: products.data,
      });
    } catch (error) {
      alert(error);
    }
  };
}

export function getDetail(prodId) {
  return async function (dispatch) {
    try {
      var productDetail = await axios.get(
        `${back}/product/${prodId}`,
        prodId
      );
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: productDetail.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategory() {
  return async function (dispatch) {
    try {
      var category = await axios.get(`${back}/filter/category`);
      return dispatch({
        type: GET_CATEGORY,
        payload: category.data,
      });
    } catch (error) {
      console.log("no se encontraron categorias");
    }
  };
}

export function getSize() {
  return async function (dispatch) {
    try {
      var size = await axios.get(`${back}/filter/talle`);
      return dispatch({
        type: GET_SIZE,
        payload: size.data,
      });
    } catch (error) {
      console.log("no se encontraron talles");
    }
  };
}

export function getBrand() {
  return async function (dispatch) {
    try {
      var brand = await axios.get(`${back}/filter/marca`);
      return dispatch({
        type: GET_BRAND,
        payload: brand.data,
      });
    } catch (error) {
      console.log("no se encontraron marcas");
    }
  };
}

export function getPrice() {
  return async function (dispatch) {
    try {
      var price = await axios.get(`${back}/precios`);
      return dispatch({
        type: GET_PRICE,
        payload: price.data,
      });
    } catch (error) {
      console.log("no se encontraron precios");
    }
  };
}

export function getUsers() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      var users = await axios.get(`${back}/user`, {headers});
      return dispatch({
        type: GET_USERS,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserByName(name) {
  return async function (dispatch) {
    try {
      var users = await axios.get(
        `${back}/user?name=${name}`
      );
      return dispatch({
        type: GET_USER_BY_NAME,
        payload: users.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const postDataUser = (loginUserId, datos) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      await axios.post(`${back}/user/${loginUserId}`, datos, {
        headers,
      });
      dispatch({
        type: POST_USER_SUCCESS,
      });
    } catch (err) {
      console.log("Error updating user: ", err); // Agregar este console.log
    }
  };
};

export const ingreso = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post(`${back}/user/login`, {
        email,
      });
      const usuario = apiData.data;
      dispatch({
        type: POST_INGRESO,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const registros = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post(`${back}/user/registro`, {
        email,
      });
      const usuario = apiData.data;
      dispatch({
        type: POST_REGISTRO,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const registroAdmin = (email, rol) => {
  console.log("accion",email, rol);
  return async function (dispatch) {
    try {
      const apiData = await axios.post(`${back}/admin/registro`, {
        email,rol
      });
      const usuario = apiData.data;
      dispatch({
        type: POST_REGISTRO,
      });
      return usuario;
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUserGoogle = (email) => {
  return async function (dispatch) {
    try {
      const apiData = await axios.post(`${back}/user/google`, {
        email,
      });
      const usuario = apiData.data;
      dispatch({
        type: POST_GOOGLE,
        payload: usuario,
      });
      return usuario;
    } catch (error) {}
  };
};

export const borrarToken = () => {
  return {
    type: BORRAR_TOKEN,
    payload: {
      email: "",
      rol: "",
      token: "",
    },
  };
};

export function orderByPrice(payload) {
  return {
    type: ORDER_BY_PRICE,
    payload,
  };
}

export function filterBySize(payload) {
  return {
    type: FILTER_BY_SIZE,
    payload,
  };
}

export function filterByCategory(payload) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: payload.toLowerCase(),
  };
}

export function filterByBrand(brand) {
  return async (dispatch) => {
    dispatch({
      type: FILTER_BY_BRAND,
      payload: brand,
    });
  };
}

export function orderByBestSelling(payload) {
  return {
    type: ORDER_BY_BEST_SELLING,
    payload,
  };
}

export function priceRangeSelector(payload) {
  return {
    type: PRICE_RANGE_SELECTOR,
    payload,
  };
}

export function addToCart(loginUserId, item) {

  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
     await axios.post(
        `${back}/cart/${loginUserId}`,
        item,{headers}
      );
      return dispatch({
        type: ADD_TO_CART,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteFromCart(compraProductId) {
  return async function (dispatch) {
    try {
      var currentUserCart = await axios.delete(
        `${back}/compraproducto/${compraProductId}`
        // { data: { id, talle, qty } }
      );
      return dispatch({
        type: DELETE_PRODUCT_CART,
        payload: currentUserCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function updateProduct(compraProductId, talle, qty) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      var updatedUserCart = await axios.delete(
        `${back}/compraproducto/${compraProductId}`,
        { data: { talle, qty } },{headers}
      );
      return dispatch({
        type: UPDATE_PRODUCT_CART,
        payload: updatedUserCart,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUserCart(loginUserId) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      var userCart = await axios.get(
        `${back}/cart/${loginUserId}`,{headers}
      );
      const userCartData = userCart.data;
      return dispatch({
        type: GET_CART_BY_ID,
        payload: userCartData,
      });
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      console.log("error cart",error );
      throw error; // para poder mostrarlo en el front
    }
  };
}

export function addSize(payload) {
  return {
    type: ADD_SIZE,
    payload,
  };
}

export function addQty(payload) {
  return {
    type: ADD_QUANTITY,
    payload,
  };
}

export function addFav(userId, prodId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.post(
        `${back}/favorite/${userId}/${prodId}`,
        {},
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: ADD_FAV,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error; // para poder mostrarlo en el front
    }
  };
}

export function getFav(userId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.get(
        `${back}/favorite/${userId}`,
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: GET_USERS_FAVORITES,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error; // para poder mostrarlo en el front
    }
  };
}

export function deletFav(userId, prodId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiData = await axios.delete(
        `${back}/favorite/${userId}/${prodId}`,
        { headers }
      );
      const favorito = apiData.data;
      dispatch({
        type: DELETE_FAV,
        payload: favorito,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
}
export function closeSession() {
  return {
    type: CLOSE_SESSION,
    payload: [],
  };
}

export const postNewsletter = (email) => {
  return async function (dispatch) {
    try {
      await axios.post(`${back}/newsletter`, email);

      dispatch({
        type: POST_NEWSLETTER,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
};

export const getNewsletter = () => {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const apiGet = await axios.get(`${back}/newsletter`, {
        headers,
      });
      const apiData = apiGet.data;
      dispatch({
        type: GET_NEWSLETTER,
        payload: apiData,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
};

export const correoRegistroNewsletter = (correo) => {
  return async function (dispatch) {
    try {
      await axios.post(
        `${back}/correo/registroNewsletter`,
        correo
      );
      dispatch({
        type: REGISTRO_NEWSLETTER,
      });
    } catch (error) {}
  };
};

export const mercadoPago = (item,promo, player) => {
  console.log(item, promo, player, 'actions');
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      console.log(item);
      const response = await axios.post(
        `${back}/mp/create_preference`,
        { data: { item, promo, player } },
        { headers }
      );
      const apiData = response.data;
      const initPoint = apiData.global.init_point;
      window.location.href = initPoint;
      dispatch({
        type: POST_MERCADO_PAGO,
        payload: apiData.global,
      });
    } catch (error) {
      console.log(error.request.response);
    }
  };
};

export const statusMercadoPago = (compraId) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.get(
        `${back}/mp/compra/${compraId}`,
        { headers }
      );
      const apiData = response.data;
      console.log("accion statusMercadoPago", apiData);
      dispatch({
        type: GET_MERCADO_PAGO,
        payload: apiData,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getDatosUser = (loginUserId) => {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      const response = await axios.get(
        `${back}/user/datos/${loginUserId}`,
        { headers }
      );
      const apiData = response.data;
      dispatch({
        type: GET_DATOS_USER,
        payload: apiData,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const putRolUser = (userId, rol) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.put(`${back}/user/${userId}`,{rol},{headers})
      dispatch({
        type: PUT_ROL_USER
      })
    } catch (error) {
      console.log(error.response.data);
    }
   
  }
}

export const putStateUser = (userId, state) => {
  return async function(dispatch){
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.put(`${back}/user/state/${userId}`,{state},{headers})
      dispatch({
        type: PUT_STATE_USER
      })
    } catch (error) {
      console.log(error.response.data);
    }
   
  }
}

export const crearOrdenDeCompra = (loginUserId, orden) => {
  console.log(loginUserId, orden, 'actions');
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      const datosApi = await axios.post(
        `${back}/ordencompra/${loginUserId}`,
        { orden },
        { headers }
      );
      const datos = datosApi.data;
      dispatch({
        type: POST_ORDEN,
        payload: datos,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export function getOrdenesCompraId(userId) {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const ordenesCompraId = await axios.get(
        `${back}/ordencompra/${userId}`,
        { headers }
      );
      const ordenesCompraUser = ordenesCompraId.data;
      console.log(ordenesCompraUser, 'actions');

      dispatch({
        type: GET_ORDEN_USER,
        payload: ordenesCompraUser,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function getAllOrdenesCompra() {
  return async function (dispatch) {
    const token = localStorage.getItem("token");
    const headers = {
      "x-access-token": token,
    };
    try {
      const allOrdenesCompra = await axios.get(
        `${back}/ordencompra/admin`,
        { headers }
      );
      let allOrdenesCompraUser
      allOrdenesCompra ? allOrdenesCompraUser = allOrdenesCompra.data : allOrdenesCompraUser = null;
      console.log(allOrdenesCompra, 'actions');

      dispatch({
        type: GET_SALES,
        payload: allOrdenesCompraUser,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function modifyProductPrice(id, price) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.put(
        `${back}/product/${id}`,
        { price },
        { headers }
      );
      return dispatch({
        type: PUT_PRODUCT_PRICE,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function modifyProductImage(id, image) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.put(
        `${back}/product/${id}`,
        { image },
        { headers }
      );
      return dispatch({
        type: PUT_PRODUCT_IMAGE,
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };
}

export function modifyProductStock(id, stock) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "x-access-token": token,
      };
      await axios.put(
        `${back}/product/${id}`,
        { stock },
        { headers }
      );
      return dispatch({
        type: PUT_PRODUCT_STOCK,
      });
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error; // para poder mostrarlo en el front
    }
  };
}

export const crearPromo = (discount) => {
  return async function(dispatch){
    try {
      const apiPromo = await axios.post(`${back}/promotions`,discount)
      const promo = apiPromo.data
      return dispatch({
        type: POST_PROMOTIONS,
        payload: promo
      })
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
  }
}

export const getPromo = (code) => {
  return async function(dispatch){
    try {
      const apiPromo = await axios.get(`${back}/promotions/${code}`)
      const promo = apiPromo.data
      return dispatch({
        type: GET_PROMOTIONS,
        payload: promo
      })
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error;// para poder mostrarlo en el front
    }
  }
}

export const putPromo = (promotionId, loginUserId ) => {
  return async function(dispatch){
    try {
      await axios.put(`${back}/promotions/${promotionId}/${loginUserId}`)
      return dispatch({
        type: PUT_PROMO_CURRENT
      })
    } catch (error) {
      console.log(error.response.data);//para recueprar el error del back
      throw error;// para poder mostrarlo en el front
    }
  } 
  
}