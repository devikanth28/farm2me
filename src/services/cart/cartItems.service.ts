import { cartItems } from "./cart_mocks/cartItemsdata";

const getCartItems = async () => {
  try {
    const response = cartItems;
    return response;
  } catch {
    console.log("error in getCartItems");
  }
};

const CartItemsService = {
  getCartItems,
};

export default CartItemsService;
