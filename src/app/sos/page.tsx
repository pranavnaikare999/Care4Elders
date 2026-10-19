"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  X, 
  Radio, 
  Sun, 
  FileText, 
  HeartHandshake,
  User
} from "lucide-react";

export default function SOSPage() {
  const [isTriggered, setIsTriggered] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const [sirenActive, setSirenActive] = useState<boolean>(false);
  const [beaconActive, setBeaconActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  // Siren audio via Web Audio API
  const startSiren = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      
      // Siren pitch oscillation
      const now = ctx.currentTime;
      for (let i = 0; i < 30; i++) {
        osc.frequency.linearRampToValueAtTime(950, now + (i * 0.8) + 0.4);
        osc.frequency.linearRampToValueAtTime(650, now + (i * 0.8) + 0.8);
      }

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscRef.current = osc;
      setSirenActive(true);
    } catch (e) {
      console.log("Audio not allowed");
    }
  };

  const stopSiren = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) {}
      oscRef.current = null;
    }
    setSirenActive(false);
  };

  const handleStartCountdown = () => {
    setCountdownActive(true);
    setCountdown(3);
  };

  const handleCancelCountdown = () => {
    setCountdownActive(false);
    setCountdown(3);
  };

  const handleImmediateTrigger = () => {
    setCountdownActive(false);
    setIsTriggered(true);
    startSiren();
  };

  useEffect(() => {
    let timer: any;
    if (countdownActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    } else if (countdownActive && countdown === 0) {
      setCountdownActive(false);
      setIsTriggered(true);
      startSiren();
    }
    return () => clearTimeout(timer);
  }, [countdownActive, countdown]);

  useEffect(() => {
    return () => {
      stopSiren();
    };
  }, []);

  return (
    <div className={`min-h-full max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 ${beaconActive ? "bg-red-600 text-white" : ""}`}>
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-600 mb-1">
            <Radio className="w-4 h-4 animate-ping" />
            <span>Emergency Assistance System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Emergency SOS Center
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            Instant dispatch to emergency services & family caregivers
          </p>
        </div>

        <div className="flex items-center gap-2">
          {sirenActive ? (
            <button
              onClick={stopSiren}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-2xl text-xs font-bold flex items-center gap-2 shadow"
            >
              <VolumeX className="w-4 h-4" />
              <span>Silence Siren</span>
            </button>
          ) : (
            <button
              onClick={startSiren}
              className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-2xl text-xs font-bold border border-red-200 flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Sound Loud Siren</span>
            </button>
          )}

          <button
            onClick={() => setBeaconActive(!beaconActive)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold border flex items-center gap-2 ${
              beaconActive
                ? "bg-amber-400 text-slate-950 border-amber-500 animate-pulse"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>{beaconActive ? "Turn Off Beacon" : "Screen Flashlight"}</span>
          </button>
        </div>
      </div>

      {/* Main Panic Button Area */}
      <section className="bg-gradient-to-b from-red-50 to-rose-50 border-2 border-red-300 rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
        {countdownActive ? (
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-red-700">
              DISPATCHING EMERGENCY ALERT IN:
            </h2>
            <div className="w-32 h-32 mx-auto rounded-full bg-red-600 text-white font-black text-6xl flex items-center justify-center shadow-2xl animate-pulse">
              {countdown}
            </div>
            <p className="text-xs text-red-800 font-bold">
              Sending your GPS coordinates & calling emergency contacts...
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancelCountdown}
                className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm rounded-2xl border-2 border-slate-300 shadow-md flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel Alert</span>
              </button>
              <button
                onClick={handleImmediateTrigger}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-2xl shadow-md"
              >
                Send NOW
              </button>
            </div>
          </div>
        ) : isTriggered ? (
          <div className="max-w-lg mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center shadow-2xl animate-bounce">
              <ShieldAlert className="w-10 h-10 stroke-[2.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-red-900">
              EMERGENCY SOS ACTIVE!
            </h2>

            <div className="bg-white p-5 rounded-2xl border border-red-300 text-left space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>GPS Location Dispatched to Sarah (Daughter)</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Emergency Broadcast Sent to 911 Dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Medical ID Transmitted (Blood O+, Penicillin Allergy)</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:911"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-base rounded-2xl shadow-xl flex items-center gap-2"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Call 911 Now</span>
              </a>

              <button
                onClick={() => {
                  stopSiren();
                  setIsTriggered(false);
                }}
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-base rounded-2xl shadow"
              >
                I Am Safe • Dismiss SOS
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
                Need Immediate Help?
              </h2>
              <p className="text-slate-600 font-medium text-sm sm:text-base mt-1 max-w-lg mx-auto">
                Press and hold the button below to alert your family, caregiver, and emergency services with your exact location.
              </p>
            </div>

            {/* Giant Red Button */}
            <div className="py-4">
              <button
                onClick={handleStartCountdown}
                className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white font-black text-3xl sm:text-4xl shadow-2xl shadow-red-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center gap-2 border-8 border-white ring-8 ring-red-200"
                aria-label="Activate Emergency SOS"
              >
                <AlertTriangle className="w-12 h-12 stroke-[2.5]" />
                <span className="tracking-widest">SOS</span>
                <span className="text-[11px] font-bold tracking-normal uppercase text-red-100">
                  PRESS FOR HELP
                </span>
              </button>
            </div>

            <p className="text-xs text-slate-400 font-semibold">
              Includes 3-second safety window to prevent accidental taps
            </p>
          </div>
        )}
      </section>

      {/* Emergency Contacts & Medical ID Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contacts to be notified */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-red-600" />
            <span>Emergency Contacts</span>
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm text-slate-900">
                  Sarah Pendelton (Daughter)
                </div>
                <div className="text-xs text-slate-500">Primary Contact • (555) 019-2834</div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                Priority 1
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm text-slate-900">
                  Mark Pendelton (Son)
                </div>
                <div className="text-xs text-slate-500">Secondary Contact • (555) 018-9921</div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                Priority 2
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-sm text-slate-900">
                  Nurse Emily Vance (Home Health)
                </div>
                <div className="text-xs text-slate-500">Registered Nurse • (555) 014-3322</div>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                Care Team
              </span>
            </div>
          </div>
        </div>

        {/* First Responder Medical ID Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>First Responder Medical ID</span>
          </h2>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Patient Name:</span>
              <span className="font-bold text-slate-900">Arthur Pendelton (Age 78)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Blood Type:</span>
              <span className="font-extrabold text-red-600">O Positive (O+)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Known Allergies:</span>
              <span className="font-bold text-red-700">Penicillin (Severe Anaphylaxis)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Implants:</span>
              <span className="font-bold text-slate-900">Cardiac Pacemaker (St. Jude Medical)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Conditions:</span>
              <span className="font-medium text-slate-900">Hypertension, Mild Type 2 Diabetes</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Attending Doctor:</span>
              <span className="font-bold text-slate-900">Dr. Robert Miller (555-0144)</span>
            </div>

            <div className="pt-2">
              <Link
                href="/medical-records"
                className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-blue-200 transition"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Open Full Medical Records & Lab Documents →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
