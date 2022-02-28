export const addItemToCart = (prevCartItems, itemToAdd) => {
  const existingCart = prevCartItems.find(
    (item) => item.product.id === itemToAdd.id
  );
  if (existingCart)
    return prevCartItems.map((item) => {
      if (item.product.id === itemToAdd.id) item.quantity++;
      return item;
    });
  return [...prevCartItems, { quantity: 1, product: itemToAdd }];
};

export const removeItemFromCart = (prevCartItems, itemToRemove) => {
  const existingCart = prevCartItems.find(
    (item) => item.product.id === itemToRemove.id
  );

  if (existingCart.quantity === 1)
    return prevCartItems.filter((item) => item.product.id !== itemToRemove.id);

  return prevCartItems.filter((item) => {
    if (item.product.id === itemToRemove.id) item.quantity--;
    return item;
  });
};
