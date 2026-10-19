"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  AlertTriangle, 
  BatteryCharging, 
  Share2, 
  Compass, 
  Home, 
  Trees, 
  Building2, 
  CheckCircle2,
  Clock,
  Send,
  Volume2
} from "lucide-react";

interface SafeZone {
  id: string;
  name: string;
  address: string;
  radius: string;
  icon: any;
  status: "active" | "inside" | "outside";
}

const safeZones: SafeZone[] = [
  {
    id: "zone-1",
    name: "Home Residence",
    address: "742 Evergreen Terrace",
    radius: "150 meters",
    icon: Home,
    status: "inside",
  },
  {
    id: "zone-2",
    name: "Sunset Community Park",
    address: "120 Park Lane (Walking trail)",
    radius: "300 meters",
    icon: Trees,
    status: "active",
  },
  {
    id: "zone-3",
    name: "Central Health Clinic & Pharmacy",
    address: "450 Medical Arts Plaza",
    radius: "200 meters",
    icon: Building2,
    status: "active",
  },
];

export default function GPSTrackerPage() {
  const [isInsideGeofence, setIsInsideGeofence] = useState<boolean>(true);
  const [locationSent, setLocationSent] = useState<boolean>(false);
  const [navigatingHome, setNavigatingHome] = useState<boolean>(false);

  const handleShareLocation = () => {
    setLocationSent(true);
    setTimeout(() => setLocationSent(false), 4000);
  };

  const handleNavigateHome = () => {
    setNavigatingHome(true);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance("You are 120 steps from your front door. Turn right at the oak tree.");
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <MapPin className="w-4 h-4" />
            <span>Real-Time GPS & Safe Boundaries</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Live Location & Geofencing
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Monitoring Arthur Pendelton • High Accuracy GPS (±4m)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInsideGeofence(!isInsideGeofence)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition flex items-center gap-2 ${
              isInsideGeofence
                ? "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                : "bg-red-600 text-white border-red-700 animate-pulse"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{isInsideGeofence ? "Test Wandering Alert" : "Simulating Alert: Outside Zone!"}</span>
          </button>
        </div>
      </div>

      {/* Geofence Status Alert Banner */}
      {!isInsideGeofence ? (
        <div className="bg-red-50 border-2 border-red-500 p-5 rounded-3xl flex items-start gap-4 animate-bounce">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-lg">
            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex-1">
            <h2 className="font-black text-red-900 text-lg">
              Safety Boundary Warning: Arthur has moved outside Home Safe Zone!
            </h2>
            <p className="text-xs text-red-700 font-medium mt-1">
              Current distance: 480 meters away towards Elm St. Caregiver Sarah and emergency dispatch have received the coordinates.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleNavigateHome}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow"
              >
                Guide Arthur Home with Voice
              </button>
              <button
                onClick={() => setIsInsideGeofence(true)}
                className="px-4 py-2 bg-white text-slate-700 rounded-xl text-xs font-bold border border-slate-200"
              >
                Reset to Safe
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-3xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-emerald-950 text-sm sm:text-base">
                Arthur is inside Home Safe Zone
              </h2>
              <p className="text-xs text-emerald-700">
                742 Evergreen Terrace • Device Battery 88% • Signal: Strong LTE
              </p>
            </div>
          </div>
          <span className="text-xs font-black px-3 py-1 bg-emerald-200 text-emerald-900 rounded-full">
            PROTECTED
          </span>
        </div>
      )}

      {/* Simulated Map Visualizer */}
      <div className="relative w-full h-80 sm:h-96 bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl flex items-center justify-center">
        {/* Map Grid Background pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Roads and zone circles */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Roads */}
          <path d="M 0 160 Q 200 140 400 180 T 800 150" stroke="#334155" strokeWidth="12" fill="none" />
          <path d="M 280 0 L 320 400" stroke="#334155" strokeWidth="10" fill="none" />
          <path d="M 520 0 L 480 400" stroke="#334155" strokeWidth="8" fill="none" />

          {/* Safe Zone 1: Home (Green Circle) */}
          <circle cx="340" cy="180" r="110" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" />

          {/* Safe Zone 2: Park (Purple Circle) */}
          <circle cx="620" cy="120" r="80" fill="rgba(168, 85, 247, 0.12)" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 4" />

          {/* Breadcrumb path */}
          <path d="M 310 240 L 330 210 L 340 180" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" fill="none" />
        </svg>

        {/* Map Labels */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] font-bold text-slate-300">
          📍 Springfield Metro Area • Satellite Hybrid
        </div>

        {/* Elder Marker on Map */}
        <div 
          className={`absolute flex flex-col items-center transition-all duration-700 ${
            isInsideGeofence ? "top-[40%] left-[45%]" : "top-[20%] left-[80%]"
          }`}
        >
          <div className="relative">
            <span className="absolute -inset-2 rounded-full bg-blue-500/40 animate-ping" />
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xl border-2 border-white relative z-10">
              👴 AP
            </div>
          </div>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white text-slate-900 text-xs font-black shadow-md border border-slate-200">
            Arthur
          </span>
        </div>

        {/* Safe Zone Labels */}
        <div className="absolute top-[35%] left-[32%] text-emerald-400 text-xs font-bold flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-md">
          <Home className="w-3.5 h-3.5" /> Home Safe Zone (150m)
        </div>

        <div className="absolute top-[18%] left-[70%] text-purple-400 text-xs font-bold flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded-md">
          <Trees className="w-3.5 h-3.5" /> Sunset Park (300m)
        </div>

        {/* Floating Quick Action Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 justify-between">
          <button
            onClick={handleShareLocation}
            className="px-4 py-2 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 transition"
          >
            <Send className="w-4 h-4 text-blue-600" />
            <span>{locationSent ? "Location Sent to Sarah!" : "Share Location with Family"}</span>
          </button>

          <button
            onClick={handleNavigateHome}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2 transition"
          >
            <Navigation className="w-4 h-4" />
            <span>{navigatingHome ? "Guiding Home..." : "Find My Way Home"}</span>
          </button>
        </div>
      </div>

      {/* Defined Safe Zones List */}
      <div className="space-y-3">
        <h2 className="text-lg font-black text-slate-900">
          Pre-approved Safe Zones
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {safeZones.map((zone) => {
            const Icon = zone.icon;
            const isInside = zone.status === "inside";
            return (
              <div
                key={zone.id}
                className={`p-4 rounded-2xl border-2 transition ${
                  isInside
                    ? "bg-emerald-50 border-emerald-400 shadow-sm"
                    : "bg-white border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  {isInside ? (
                    <span className="text-[11px] font-black px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">
                      Currently Here
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Safe Perimeter
                    </span>
                  )}
                </div>

                <div className="font-bold text-slate-900 text-sm">{zone.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{zone.address}</div>
                <div className="text-[11px] font-semibold text-purple-600 mt-2">
                  Boundary: {zone.radius}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Location History Breadcrumb Log */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <span>Today's Movement Log</span>
        </h2>
        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span>12:45 PM • Dining Room (Lunch time)</span>
            <span className="text-emerald-600 font-semibold">Safe</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span>10:30 AM • Back Garden Patio (Morning sunshine)</span>
            <span className="text-emerald-600 font-semibold">Safe</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
            <span>08:15 AM • Kitchen (Breakfast & Morning Pills)</span>
            <span className="text-emerald-600 font-semibold">Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
