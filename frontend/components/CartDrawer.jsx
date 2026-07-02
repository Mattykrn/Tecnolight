import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, MessageCircle, ArrowRight, CheckCircle, Loader } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, clearCart, confirmOrder, totalPrice, totalItems } = useCart();
  const [confirming, setConfirming] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState(null);

  const whatsappMessage = items.map(i =>
    `• ${i.name} x${i.quantity} — $${(i.price * i.quantity).toLocaleString('es-AR')}`
  ).join('%0A') + `%0A%0ATotal: $${totalPrice.toLocaleString('es-AR')}`;

  const handleConfirm = async () => {
    setConfirming(true);
    setError(null);
    const ok = await confirmOrder();
    setConfirming(false);
    if (ok) {
      setConfirmed(true);
      setTimeout(() => { setConfirmed(false); onClose(); }, 2000);
    } else {
      setError('No se pudo confirmar el pedido. Intentá de nuevo.');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[1100]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[1100] shadow-2xl flex flex-col"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <ShoppingCart size={20} className="text-[#FF5A1F]" />
                <span className="font-bold text-gray-900 text-lg">Carrito</span>
                <span className="text-sm text-gray-400">({totalItems} items)</span>
              </div>
              <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {confirmed ? (
                <div className="text-center py-16">
                  <CheckCircle size={56} className="mx-auto text-green-500 mb-4" />
                  <p className="text-gray-900 font-bold text-lg mb-1">Pedido Confirmado</p>
                  <p className="text-gray-400 text-sm">Recibirás novedades por WhatsApp o email.</p>
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-400 text-sm">El carrito está vacío</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-[#FF5A1F] font-bold text-sm mt-0.5">
                        ${(item.price || 0).toLocaleString('es-AR')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors"
                      >
                        {item.quantity === 1 ? <Trash2 size={14} /> : <Minus size={14} />}
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => {
                          if (item.quantity < item.maxStock || item.maxStock === 0) {
                            updateQuantity(item.id, item.quantity + 1);
                          }
                        }}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:border-[#FF5A1F] hover:text-[#FF5A1F] transition-colors ${item.quantity >= item.maxStock && item.maxStock > 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && !confirmed && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Total</span>
                  <span className="text-xl font-bold text-gray-900">${totalPrice.toLocaleString('es-AR')}</span>
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button
                  onClick={handleConfirm}
                  disabled={confirming}
                  className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-4 py-3 rounded-lg text-sm hover:bg-green-700 transition-all disabled:opacity-60"
                >
                  {confirming ? <Loader size={18} className="animate-spin" /> : <CheckCircle size={18} />}
                  {confirming ? 'Confirmando...' : 'Confirmar Pedido'}
                </button>
                <div className="flex gap-3">
                  <button onClick={() => clearCart()}
                    className="flex-1 text-sm text-gray-400 hover:text-red-500 transition-colors py-2">Vaciar</button>
                  <a href={`https://wa.me/543424567890?text=Hola%20Tecnolight%2C%20quiero%20consultar%20por%3A%0A${whatsappMessage}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold px-4 py-3 rounded-lg text-sm hover:bg-[#1DA851] transition-all">
                    <MessageCircle size={18} /> Consultar
                  </a>
                  <Link href="/contact" onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FF5A1F] text-white font-semibold px-4 py-3 rounded-lg text-sm hover:bg-[#E04E1A] transition-all">
                    Cotizar <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
