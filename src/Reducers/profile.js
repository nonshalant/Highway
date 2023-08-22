import { PROFILE_ERROR, ADD_ADDRESS, PRODUCT_ID, ADD_TO_CART, RETRIEVE_CART, FETCH_FAVORITE_STORES, INCREMENT_CART, DECREMENT_CART, RETREIVE_ADDRESS, GET_PROFILE, REVIEW_ORDER_ITEMS, COMPLETE_PURCHASE } from "../Actions/types";

const initialState = {
  profile: null,
  address: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false
      };
    case ADD_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: true
      };
    case RETREIVE_ADDRESS:
      return {
        ...state,
        address: payload,
        loading: false
      };
    case FETCH_FAVORITE_STORES:
      return {
        ...state,
        favoriteStores: payload,
        loading: false
      }
      // STORE CASES 
    case PRODUCT_ID:
      return {
        ...state,
        productId: payload,
        loading: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case RETRIEVE_CART:
      return {
        ...state,
        cart: payload,
        loading: false
      };
    case INCREMENT_CART:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.productName === payload.productName) {
            return payload;
          }
          return item;
        })
      };
    case DECREMENT_CART:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.productName === payload.productName) {
            return payload;
          }
          return item;
        })
      };
    case REVIEW_ORDER_ITEMS:
      return {
        ...state,
        orderReviewCart: payload,
        loading: false
      };
    case COMPLETE_PURCHASE:
      return {
        ...state,
        clientSecret: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
