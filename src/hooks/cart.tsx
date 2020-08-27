import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // TODO LOAD ITEMS FROM ASYNC STORAGE
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const productToAddExists = products.find(
        cartProduct => cartProduct.id === product.id,
      );

      if (productToAddExists) {
        const updatedCartProducts = products.map(cartProduct => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + 1,
            };
          }

          return cartProduct;
        });

        setProducts(updatedCartProducts);
      } else {
        const productToAdd = product;
        productToAdd.quantity = 1;

        setProducts([...products, productToAdd]);
      }
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const incrementedCartProducts = products.map(cartProduct => {
        if (cartProduct.id === id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      });

      setProducts(incrementedCartProducts);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const decrementedCartProducts = products.map(cartProduct => {
        if (cartProduct.id === id && cartProduct.quantity > 1) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1,
          };
        }

        return cartProduct;
      });

      setProducts(decrementedCartProducts);
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
