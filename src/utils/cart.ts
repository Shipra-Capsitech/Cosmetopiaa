export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  
}

export const getCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated"));
};

export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
}) => {
  const cart = getCart();

  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.imageUrl || "",
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id: string) => {
  const cart = getCart().filter(
    (item) => item.id !== id
  );

  saveCart(cart);
};