import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function adjustStock(id, delta) {
  const res = await fetch(`${API()}/api/products/${id}/stock/adjust`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delta })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error al ajustar stock');
  return data.stock;
}

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tecnolight-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('tecnolight-cart', JSON.stringify(items));
  }, [items, loaded]);

  const addItem = useCallback(async (product, quantity = 1) => {
    if ((product.stock || 0) < quantity) return;
    try {
      await adjustStock(product.id, -quantity);
      setItems(prev => {
        const existing = prev.find(i => i.id === product.id);
        if (existing) {
          const newQty = Math.min(existing.quantity + quantity, product.stock || 99);
          return prev.map(i => i.id === product.id ? { ...i, quantity: newQty } : i);
        }
        return [...prev, {
          id: product.id, name: product.name, price: product.price || 0,
          image: product.images?.[0] || null, quantity,
          maxStock: product.stock || 0, category: product.category
        }];
      });
      return true;
    } catch {
      return false;
    }
  }, []);

  const updateQuantity = useCallback(async (id, quantity) => {
    if (quantity <= 0) {
      const item = items.find(i => i.id === id);
      if (item) {
        try { await adjustStock(id, item.quantity); } catch {}
      }
      return setItems(prev => prev.filter(i => i.id !== id));
    }
    const item = items.find(i => i.id === id);
    if (!item) return;
    const delta = quantity - item.quantity;
    try {
      await adjustStock(id, -delta);
      setItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i));
    } catch {}
  }, [items]);

  const removeItem = useCallback(async (id) => {
    const item = items.find(i => i.id === id);
    if (item) {
      try { await adjustStock(id, item.quantity); } catch {}
    }
    setItems(prev => prev.filter(i => i.id !== id));
  }, [items]);

  const clearCart = useCallback(async () => {
    for (const item of items) {
      try { await adjustStock(item.id, item.quantity); } catch {}
    }
    setItems([]);
  }, [items]);

  const confirmOrder = useCallback(async () => {
    if (items.length === 0) return false;
    try {
      const res = await fetch(`${API()}/api/orders/quick`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.id,
            description: i.name,
            quantity: i.quantity,
            unitPrice: i.price
          })),
          total: items.reduce((s, i) => s + i.price * i.quantity, 0)
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al confirmar pedido');
      setItems([]);
      return true;
    } catch {
      return false;
    }
  }, [items]);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, removeItem, clearCart, confirmOrder, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
