"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HeartHandshake, 
  AlertTriangle, 
  BatteryCharging, 
  Volume2, 
  User, 
  PhoneCall, 
  Settings,
  Sun,
  ShieldCheck
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>("");
  const [battery, setBattery] = useState<number>(88);
  const [isElderMode, setIsElderMode] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-100 bg-white/95 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link 
          href="/dashboard" 
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl p-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <HeartHandshake className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Care<span className="text-blue-600">4Elder</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                Safe
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Elderly Companion & Safety Assistant
            </p>
          </div>
        </Link>

        {/* Center: Live Time & Status info */}
        <div className="hidden md:flex items-center gap-4 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
          <div className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>{time || "10:30 AM"}</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
            <BatteryCharging className="w-4 h-4 text-emerald-600" />
            <span>{battery}% Charged</span>
          </div>
          <span className="text-slate-300">|</span>
          <div className="text-xs font-medium text-blue-700 flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Caregiver Sarah Connected</span>
          </div>
        </div>

        {/* Actions: Quick SOS & Mode switch */}
        <div className="flex items-center gap-2">
          {/* Medical Records Link */}
          <Link
            href="/medical-records"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              pathname === "/medical-records"
                ? "bg-blue-50 text-blue-700 border-blue-300 font-bold"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
            title="View Emergency Medical Records"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Medical Records</span>
          </Link>

          {/* Elder / Caregiver Mode Pill */}
          <button
            onClick={() => setIsElderMode(!isElderMode)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
            title="Switch View Mode"
          >
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>{isElderMode ? "Elder View" : "Caregiver View"}</span>
          </button>

          {/* Quick SOS Big Button */}
          <Link
            href="/sos"
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md shadow-red-500/25 transition transform active:scale-95"
            aria-label="Emergency SOS button"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span className="tracking-wide uppercase">SOS</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
