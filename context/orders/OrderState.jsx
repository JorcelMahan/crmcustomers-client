import { useReducer } from 'react';
import OrderContext from './OrderContext';
import OrderReducer from './OrderReducer';
import {
  SELECT_CLIENT,
  SELECT_PRODUCT,
  QUANTITY_PRODUCTS,
  UPDATE_TOTAL,
} from '../../types';

const OrderState = ({ children }) => {
  // Initial State
  const initialState = {
    client: {},
    products: [],
    total: 0,
  };

  // Use Reducer
  const [state, dispatch] = useReducer(OrderReducer, initialState);

  // Modify Client
  const addClient = client => {
    dispatch({
      type: SELECT_CLIENT,
      payload: client,
    });
  };

  // Modify Product
  const addProduct = productsSelected => {
    let newState;
    if (state.products.length > 0) {
      // Take the second copy of the array and assign the new one
      newState = productsSelected.map(product => {
        const newObject = state.products.find(
          productState => productState.id === product.id
        );
        return { ...product, ...newObject };
      });
    } else {
      newState = productsSelected;
    }

    dispatch({
      type: SELECT_PRODUCT,
      payload: newState,
    });
  };

  // Modify Quantity
  const quantityProducts = newProduct => {
    dispatch({
      type: QUANTITY_PRODUCTS,
      payload: newProduct,
    });
  };

  // Update Total
  const updateTotal = () => {
    dispatch({
      type: UPDATE_TOTAL,
    });
  };

  return (
    <OrderContext.Provider
      value={{
        client: state.client,
        products: state.products,
        total: state.total,
        addClient,
        addProduct,
        quantityProducts,
        updateTotal,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderState;
