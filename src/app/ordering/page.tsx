"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Pill, 
  Truck, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  AlertCircle,
  CreditCard,
  Heart
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "Prescription" | "Health Devices" | "Comfort & Safety" | "Nutrition";
  price: number;
  description: string;
  icon: string;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: "p1",
    name: "Lisinopril 10mg (30-day Refill)",
    category: "Prescription",
    price: 12.00,
    description: "Prescribed by Dr. Robert Miller. Doctor's active refill authorized.",
    icon: "💊",
    inStock: true,
  },
  {
    id: "p2",
    name: "Metformin 500mg (60-day Refill)",
    category: "Prescription",
    price: 15.50,
    description: "Standard daily blood glucose support. Auto-refill ready.",
    icon: "💊",
    inStock: true,
  },
  {
    id: "p3",
    name: "One-Touch Digital Blood Pressure Cuff",
    category: "Health Devices",
    price: 34.99,
    description: "Extra large LED display, voice readout, senior-friendly cuff.",
    icon: "🩺",
    inStock: true,
  },
  {
    id: "p4",
    name: "7-Day Easy-Open Pill Organizer (AM/PM)",
    category: "Comfort & Safety",
    price: 9.50,
    description: "Push-button pop-open compartments with bold tactile day lettering.",
    icon: "📅",
    inStock: true,
  },
  {
    id: "p5",
    name: "Non-Slip Suction Bath & Shower Mat",
    category: "Comfort & Safety",
    price: 18.00,
    description: "Anti-slip textured surface with over 200 high-grip suction cups.",
    icon: "🛁",
    inStock: true,
  },
  {
    id: "p6",
    name: "Senior Electrolyte Hydration Mix (30 pk)",
    category: "Nutrition",
    price: 16.00,
    description: "Low-sugar citrus hydration boost with magnesium and potassium.",
    icon: "🍋",
    inStock: true,
  },
];

export default function OrderingPage() {
  const [cart, setCart] = useState<{ [id: string]: number }>({ p1: 1 });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const addToCart = (id: string) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (updated[id] > 1) {
        updated[id] -= 1;
      } else {
        delete updated[id];
      }
      return updated;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = products.find((p) => p.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart({});
    }, 1500);
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <ShoppingBag className="w-4 h-4" />
            <span>Prescription Refill & Home Essentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Care Supplies & Medicine
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Quick 1-touch ordering with direct caregiver approval
          </p>
        </div>

        {/* Active Delivery Status Badge */}
        <div className="bg-amber-50 border border-amber-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <Truck className="w-5 h-5 text-amber-600 animate-pulse" />
          <div className="text-xs">
            <div className="font-extrabold text-amber-900">Order #C4E-782 Out for Delivery</div>
            <div className="text-amber-700">Arriving today by 3:30 PM</div>
          </div>
        </div>
      </div>

      {orderPlaced && (
        <div className="bg-emerald-50 border-2 border-emerald-500 p-5 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            <div>
              <h2 className="font-black text-emerald-950 text-base">
                Refill Order Confirmed!
              </h2>
              <p className="text-xs text-emerald-700 mt-0.5">
                Caregiver Sarah has approved the charge. CareRx Pharmacy will deliver within 4 hours.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOrderPlaced(false)}
            className="text-xs font-bold px-3 py-1.5 bg-emerald-600 text-white rounded-xl"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Cart Summary Banner if items present */}
      {totalItems > 0 && (
        <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-900 font-black flex items-center justify-center">
              {totalItems}
            </div>
            <div>
              <div className="font-bold text-sm">
                {totalItems} item{totalItems > 1 ? "s" : ""} in cart • Total: ${subtotal.toFixed(2)}
              </div>
              <div className="text-xs text-slate-400">
                Caregiver Sarah will be notified upon 1-tap confirmation
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black rounded-2xl text-sm shadow-md transition"
          >
            Confirm & Order Now
          </button>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Prescription", "Health Devices", "Comfort & Safety", "Nutrition"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredProducts.map((product) => {
          const qty = cart[product.id] || 0;
          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-amber-300 shadow-sm flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{product.icon}</span>
                  <span className="text-xs font-extrabold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                    {product.category}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-amber-800 transition">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-lg font-black text-slate-900">
                  ${product.price.toFixed(2)}
                </div>

                {qty > 0 ? (
                  <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl p-1">
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-7 h-7 rounded-lg bg-white text-slate-700 flex items-center justify-center font-bold text-xs shadow-sm hover:bg-slate-100"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-extrabold text-xs text-amber-900 px-1">{qty}</span>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-sm hover:bg-amber-400"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product.id)}
                    className="px-4 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Order</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
