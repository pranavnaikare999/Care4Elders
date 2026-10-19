"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Pill, 
  FileText,
  MapPin, 
  ShoppingBag, 
  AlertOctagon 
} from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      icon: Home,
      activeColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      label: "Reminders",
      href: "/reminders",
      icon: Pill,
      activeColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      label: "Records",
      href: "/medical-records",
      icon: FileText,
      activeColor: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      label: "GPS Safe",
      href: "/gps-tracker",
      icon: MapPin,
      activeColor: "text-purple-600 bg-purple-50 border-purple-200",
    },
    {
      label: "Supplies",
      href: "/ordering",
      icon: ShoppingBag,
      activeColor: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      label: "SOS",
      href: "/sos",
      icon: AlertOctagon,
      activeColor: "text-red-600 bg-red-50 border-red-200",
      highlight: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 shadow-lg px-2 py-1.5 md:py-2">
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 min-w-[64px] min-h-[56px] ${
                item.highlight && !isActive
                  ? "text-red-600 hover:bg-red-50"
                  : ""
              } ${
                isActive
                  ? `${item.activeColor} border font-bold shadow-sm scale-105`
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 stroke-[2.2] ${item.highlight ? "text-red-600" : ""}`} />
                {item.label === "Reminders" && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
              <span className={`text-[12px] mt-1 tracking-tight leading-none ${isActive ? "font-bold" : "font-medium"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
export default BottomNav;
