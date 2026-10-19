"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HeartHandshake, 
  Pill, 
  MapPin, 
  AlertTriangle, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ArrowRight,
  Smile,
  Activity,
  Droplet
} from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Hero Banner for Senior Citizens */}
      <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-bold tracking-wide uppercase text-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            Designed Specially for Seniors & Families
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Your Smart Companion for Elderly Care & Safety
          </h1>

          <p className="text-base sm:text-lg text-blue-100 font-medium leading-relaxed">
            Simple, high-contrast, large-button assistance for medication reminders, live GPS safe-zones, instant emergency SOS alerts, and prescription refills.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 active:bg-blue-100 px-6 py-3.5 rounded-2xl font-black text-base shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Open Elder Dashboard</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </Link>

            <Link
              href="/sos"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-2xl font-black text-base shadow-lg shadow-red-900/30 transition-transform hover:-translate-y-0.5"
            >
              <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
              <span>Emergency SOS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Big-Touch Action Cards for Seniors */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Reminders Card */}
        <Link
          href="/reminders"
          className="bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 rounded-3xl p-5 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Pill className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Pill & Health Reminders
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 font-medium">
              Audio & visual alerts for morning, afternoon, and bedtime medication.
            </p>
          </div>
          <div className="mt-4 flex items-center text-emerald-700 font-bold text-sm">
            <span>Check Schedule</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* GPS Tracker Card */}
        <Link
          href="/gps-tracker"
          className="bg-purple-50 border-2 border-purple-200 hover:border-purple-500 rounded-3xl p-5 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <MapPin className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              GPS Safe Tracking
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 font-medium">
              Geofence safe boundaries, real-time location sharing with family.
            </p>
          </div>
          <div className="mt-4 flex items-center text-purple-700 font-bold text-sm">
            <span>View Map</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Prescription & Supplies Ordering */}
        <Link
          href="/ordering"
          className="bg-amber-50 border-2 border-amber-200 hover:border-amber-500 rounded-3xl p-5 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Medicine Refill & Groceries
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 font-medium">
              1-touch prescription reorder, medical supplies, and grocery delivery.
            </p>
          </div>
          <div className="mt-4 flex items-center text-amber-700 font-bold text-sm">
            <span>Order Supplies</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* SOS Emergency Card */}
        <Link
          href="/sos"
          className="bg-red-50 border-2 border-red-300 hover:border-red-600 rounded-3xl p-5 transition-all shadow-sm hover:shadow-md group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform animate-pulse">
              <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              Emergency SOS Help
            </h2>
            <p className="text-xs text-slate-600 mt-1.5 font-medium">
              Instant 911 siren alert, family contact dispatch & medical ID card.
            </p>
          </div>
          <div className="mt-4 flex items-center text-red-700 font-bold text-sm">
            <span>SOS Center</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </section>

      {/* Login / Profile Selection Section */}
      <section className="pt-2">
        <LoginForm />
      </section>
    </div>
  );
}
