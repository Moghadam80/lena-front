"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
};

type AddCartItem = Omit<CartItem, "quantity">;

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: AddCartItem) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function getCartItemKey(item: Pick<
  CartItem,
  "productId" | "size" | "color"
>) {
  return `${item.productId}-${item.size}-${item.color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("mariemur-cart");

      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch {
      localStorage.removeItem("mariemur-cart");
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("mariemur-cart", JSON.stringify(items));
    }
  }, [items, hydrated]);

  // Zarinpal sends the user back to /?payment=success|failed
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("payment");

    if (!status) return;

    if (status === "success") {
      const refId = params.get("refId");
      setItems([]);
      toast.success(
        refId
          ? `پرداخت با موفقیت انجام شد · کد پیگیری: ${refId}`
          : "پرداخت با موفقیت انجام شد",
        { duration: 6000 }
      );
    } else {
      toast.error("پرداخت ناموفق بود یا لغو شد");
    }

    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  const addItem = useCallback((newItem: AddCartItem) => {
    setItems((current) => {
      const key = getCartItemKey(newItem);
      const existing = current.find(
        (item) => getCartItemKey(item) === key
      );

      if (existing) {
        return current.map((item) =>
          getCartItemKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...newItem, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((current) =>
      current.map((item) =>
        getCartItemKey(item) === key ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) =>
      current.filter((item) => getCartItemKey(item) !== key)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}