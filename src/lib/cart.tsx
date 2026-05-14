import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = { id: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  detailed: { product: Product; qty: number }[];
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "shopline.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (id: string, qty = 1) =>
    setItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });

  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((p) => (qty <= 0 ? p.filter((i) => i.id !== id) : p.map((i) => (i.id === id ? { ...i, qty } : i))));
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? { product, qty: i.qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = detailed.reduce((s, d) => s + d.product.price * d.qty, 0);

  return (
    <Ctx.Provider value={{ items, count, subtotal, add, remove, setQty, clear, detailed }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });
