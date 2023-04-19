import {
  GET_PRODUCTS,
  POST_PRODUCTS,
  GET_PRODUCTS_BY_NAME,
  GET_PRODUCT_DETAIL,
  GET_CATEGORY,
  GET_SIZE,
  GET_BRAND,
  GET_USERS,
  FILTER_BY_CATEGORY,
  FILTER_BY_BRAND,
  FILTER_BY_SIZE,
  ORDER_BY_PRICE,
  GET_PRICE,
  PRICE_RANGE_SELECTOR,
  ADD_QUANTITY,
  ADD_SIZE,
  ADD_TO_CART,
  GET_CART_BY_ID,
  DELETE_FAV,
  DELETE_CART,
  GET_USERS_FAVORITES,
  POST_INGRESO,
  BORRAR_TOKEN,
  POST_REGISTRO,
  POST_GOOGLE,
  CLOSE_SESSION,
  GET_NEWSLETTER,
  POST_MERCADO_PAGO,
  GET_MERCADO_PAGO,
  GET_DATOS_USER,
  UPDATE_USER_FAILURE,
  DELETE_PRODUCT_CART,
  UPDATE_PRODUCT_CART,
  GET_ORDEN_USER,
  POST_PROMOTION,
  POST_USER_ADMIN,
  GET_SALES
} from "../Actions/actions";

const initialState = {
  products: [],
  prodRender: [],
  detail: [],
  detailAdmin: [],
  categories: [],
  filteredProducts: [],
  users: [],
  dataUser: {
    name: "",
    last_name: "",
    phone: "",
    address: "",
  },
  loginUser: {
    id: "",
    email: "",
    rol: "",
    token: "",
  },
  prices: [],
  filters: {
    size: null,
    brand: null,
  },
  selectedPriceRange: { minPrice: 0, maxPrice: 0 },
  selectedSize: [],
  selectedQty: [],
  item: [],
  itemFav: [],
  productoAgregado: [],
  newsletter: [],
  postMercadoPago: null,
  getMercadoPago: null,
  userCompras: null,
  ordenesCompras:null,
  allOrdenesCompras: null,
};

const storedUser = localStorage.getItem("loginUser");
const storedToken = localStorage.getItem("token");
const storeMp = localStorage.getItem("mercadoPago");

const userFromStorage = storedUser
  ? JSON.parse(storedUser)
  : initialState.loginUser;
const tokenFromStorage = storedToken ? storedToken : "";

const mpFromStorage = storeMp
  ? JSON.parse(storeMp)
  : initialState.postMercadoPago;

initialState.loginUser = userFromStorage;
initialState.loginUser.token = tokenFromStorage;
initialState.postMercadoPago = mpFromStorage;

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        prodRender: action.payload,
      };
    case POST_INGRESO:
      const userIngreso = action.payload;
      localStorage.setItem("token", userIngreso.token);
      localStorage.setItem("loginUser", JSON.stringify(userIngreso));
      const expirationDateIngreso = new Date(
        new Date().getTime() + 3600 * 1000
      );
      localStorage.setItem("expirationDate", expirationDateIngreso);
      return {
        ...state,
        loginUser: {
          id: userIngreso.id,
          email: userIngreso.email,
          rol: userIngreso.rol,
          state: userIngreso.state,
          token: userIngreso.token,
        },
      };

    case POST_REGISTRO:
      const userRegistro = action.payload;
      localStorage.setItem("token", userRegistro.token);
      localStorage.setItem("loginUser", JSON.stringify(userRegistro));
      const expirationDateRegistro = new Date(
        new Date().getTime() + 3600 * 1000
      );
      localStorage.setItem("expirationDate", expirationDateRegistro);
      return {
        ...state,
        loginUser: {
          id: userRegistro.id,
          email: userRegistro.email,
          rol: userRegistro.rol,
          state: userRegistro.state,
          token: userRegistro.token,
        },
      };

    case POST_GOOGLE:
      const user = action.payload;
      localStorage.setItem("token", user.token);
      localStorage.setItem("loginUser", JSON.stringify(user));
      const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
      localStorage.setItem("expirationDate", expirationDate);
      return {
        ...state,
        loginUser: {
          id: user.id,
          email: user.email,
          rol: user.rol,
          state: user.state,
          token: user.token,
        },
      };

    case BORRAR_TOKEN:
      localStorage.removeItem("token");
      localStorage.removeItem("loginUser");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("mercadoPago");
      return {
        ...state,
        loginUser: {
          id: "",
          email: "",
          rol: "",
          token: "",
        },
        dataUser: {
          name: "",
          last_name: "",
          phone: "",
          address: ""
        },
        postMercadoPago: null,
      };

    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };


    case GET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
        //filteredProducts: action.payload,
        selected: action.payload,
      };

    case GET_SIZE:
      return {
        ...state,
        sizes: action.payload,
      };

    case GET_BRAND:
      return {
        ...state,
        brands: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PRICE:
      return {
        ...state,
        prices: action.payload,
      };

    case FILTER_BY_CATEGORY:
      const filteredProducts = state.prodRender.filter((product) => {
        if (product.CategoriProducts && product.CategoriProducts.length > 0) {
          return product.CategoriProducts[0].category === action.payload;
        } else {
          return false;
        }
      });

      return {
        ...state,
        products: filteredProducts,
      };

      case FILTER_BY_SIZE:
        const sizeFilter = action.payload;
        let sizeProd = state.filteredProducts.length ? state.filteredProducts : state.prodRender;
        if (sizeFilter) {
          sizeProd = sizeProd.filter((product) => {
            if (product.TalleProducts) {
              return product.TalleProducts[0].talle.split(",").filter((e) => e === action.payload).length > 0;
            } else {
              return false;
            }
          });
        }
        return {
          ...state,
          products: sizeProd,
          filteredProducts: sizeProd
        };

    case FILTER_BY_BRAND:
      const brandFilter = action.payload.toUpperCase();
      let brandProd = state.filteredProducts.length ? state.filteredProducts : state.prodRender;
      if (brandFilter) {
        brandProd = brandProd.filter((product) => {
          if (product.MarcaProducts && product.MarcaProducts.length > 0) {
            return product.MarcaProducts[0].name.toUpperCase() === brandFilter;
          } else {
            return false;
          }
        });
      }
      return {
        ...state,
        products: brandProd,
        filteredProducts: brandProd
      };

    case ORDER_BY_PRICE:
      const { payload } = action;
      const { products } = state;
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      return {
        ...state,
        products:
          payload === "Mayor Precio"
            ? sortedProducts.reverse()
            : sortedProducts,
      };

      case PRICE_RANGE_SELECTOR:
        const { minPrice, maxPrice } = action.payload;
        let priceProd = state.filteredProducts.length ? state.filteredProducts : state.prodRender;
        let nuevoPrecio = [];
        if (minPrice && maxPrice) {
          priceProd &&
            priceProd.filter((product) => {
              if (
                Number(product.price) >= minPrice &&
                Number(product.price) <= maxPrice
              ) {
                nuevoPrecio.push(product);
              }
            });
        }
  
        return {
          ...state,
          selectedPriceRange: { minPrice, maxPrice },
          products: nuevoPrecio,
          filteredProducts:nuevoPrecio
        };

    case ADD_SIZE:
      const size = action.payload;
      console.log("console.log add_size", size);
      return {
        ...state,
        selectedSize: size,
      };

    case ADD_QUANTITY:
      const qty = action.payload;
      console.log("console.log add_qty", qty);
      return {
        ...state,
        selectedQty: qty,
      };

    case ADD_TO_CART:
      return {
        ...state,
        productoAgregado: [...action.payload],
      };

    case DELETE_PRODUCT_CART:
      return {
        ...state,
      };

    case UPDATE_PRODUCT_CART:
      return {
        ...state,
      };

    case GET_CART_BY_ID:
      console.log(action.payload, "payload reducer");
      return {
        ...state,
        item: action.payload,
      };

    case GET_USERS_FAVORITES:
      return {
        ...state,
        itemFav: action.payload,
      };

      case GET_ORDEN_USER:
        const datosOrden= action.payload
        console.log("DATOS", datosOrden)
        return {
          ...state,
          ordenesCompra: datosOrden
        };
        
    case DELETE_FAV:
      return {
        ...state,
        itemFav: action.payload,
      };
    case DELETE_CART:
      return {
        ...state,
        itemFav: action.payload,
      };

    case CLOSE_SESSION:
      return {
        ...state,
        itemFav: action.payload,
        item: action.payload,
      };

    case GET_NEWSLETTER:
      return {
        ...state,
        newsletter: action.payload,
      };

    case POST_MERCADO_PAGO:
      const mp = action.payload;
      localStorage.setItem("mercadoPago", JSON.stringify(mp));
      return {
        ...state,
        postMercadoPago: mp,
      };

    case GET_MERCADO_PAGO:
      const datosMp = action.payload;
      return {
        ...state,
        getMercadoPago: datosMp,
      };

    case GET_DATOS_USER:
      const datos = action.payload;
      return {
        ...state,
        dataUser: datos
      };

      case POST_USER_ADMIN:
      return {
        ...state,
      };

      case GET_SALES:
      const datosAllOrdenes = action.payload
      console.log("DATOS", datosAllOrdenes)
      return {
        ...state,
        allOrdenesCompras: datosAllOrdenes
      };

      // case POST_PROMOTION:
      //   const promo = action.payload;
      //   return {
      //     ...state,
      //     promotions:
      //     {
      //       code: promo.code,
      //       discount: promo.discount,
      //     }
      //   };

    default:
      return state;
  }
}

export default rootReducer;