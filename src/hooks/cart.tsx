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
      const savedCartProducts = await AsyncStorage.getItem(
        '@GoMarketplace:products',
      );

      if (savedCartProducts) {
        setProducts(JSON.parse(savedCartProducts));
      }
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

        await AsyncStorage.setItem(
          '@GoMarketplace:products',
          JSON.stringify(updatedCartProducts),
        );
      } else {
        const productToAdd = product;
        productToAdd.quantity = 1;

        const newProducts = [...products, productToAdd];

        setProducts(newProducts);

        await AsyncStorage.setItem(
          '@GoMarketplace:products',
          JSON.stringify(newProducts),
        );
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

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(incrementedCartProducts),
      );
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

      await AsyncStorage.setItem(
        '@GoMarketplace:products',
        JSON.stringify(decrementedCartProducts),
      );
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
