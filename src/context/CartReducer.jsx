export const CartReducer = (state, action) => {
    const { shoppingCart, totalPrice, totalQty } = state;
  
    let product, index, updatedPrice, updatedQty;
  
    switch (action.type) {
      case "ADD_TO_CART":
        const exists = shoppingCart.find((p) => p.id === action.product.id);
        if (exists) return state;
        product = { ...action.product, qty: 1, total: action.product.price };
        updatedQty = totalQty + 1;
        updatedPrice = totalPrice + product.price;
        return { shoppingCart: [product, ...shoppingCart], totalPrice: updatedPrice, totalQty: updatedQty };
  
      case "EMPTY":
        return { shoppingCart: [], totalPrice: 0, totalQty: 0 };
  
      default:
        return state;
    }
  };
  