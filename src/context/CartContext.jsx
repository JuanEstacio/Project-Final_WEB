import React, { createContext, useReducer } from "react";
import { CartReducer } from "./CartReducer";
import { db, auth } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const initialState = {
    shoppingCart: [],
    totalPrice: 0,
    totalQty: 0,
  };

  const [cart, dispatch] = useReducer(CartReducer, initialState);

  // Función para guardar la orden en Firestore
  const saveOrderToFirestore = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    if (!userId) {
      console.error("No se puede guardar la orden. Usuario no autenticado.");
      return;
    }

    const orderData = {
      userId,
      products: cart.shoppingCart,
      totalPrice: cart.totalPrice,
      totalQty: cart.totalQty,
      createdAt: new Date(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      console.log("Orden guardada correctamente.");
      dispatch({ type: "EMPTY" }); // Vaciar el carrito después de guardar
    } catch (error) {
      console.error("Error al guardar la orden: ", error.message);
    }
  };

  return (
    <CartContext.Provider value={{ ...cart, dispatch, saveOrderToFirestore }}>
      {children}
    </CartContext.Provider>
  );
};
