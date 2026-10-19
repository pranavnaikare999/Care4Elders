"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  HeartHandshake, 
  ShieldCheck, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  KeyRound
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<"elder" | "caregiver">("elder");
  const [phone, setPhone] = useState("");
  const [elderName, setElderName] = useState("Arthur Pendelton (Age 78)");
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickLogin = (name: string) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
      {/* Role Selector Tabs */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => setRole("elder")}
          className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            role === "elder"
              ? "bg-white text-blue-700 shadow-md shadow-blue-500/10"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <HeartHandshake className="w-5 h-5 text-blue-600" />
          <span>I am a Senior</span>
        </button>
        <button
          type="button"
          onClick={() => setRole("caregiver")}
          className={`py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            role === "caregiver"
              ? "bg-white text-indigo-700 shadow-md shadow-indigo-500/10"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          <span>I am a Caregiver</span>
        </button>
      </div>

      {role === "elder" ? (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900">
              Welcome Back!
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Choose your profile to enter with 1 touch:
            </p>
          </div>

          <div className="space-y-3">
            {/* Quick Profiles */}
            <button
              onClick={() => handleQuickLogin("Arthur Pendelton")}
              disabled={isLoading}
              className="w-full p-4 rounded-2xl border-2 border-blue-200 hover:border-blue-500 bg-blue-50/50 hover:bg-blue-50 transition flex items-center gap-4 text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                AP
              </div>
              <div className="flex-1">
                <div className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700">
                  Arthur Pendelton
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Active Profile • Daily Pills Pending
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleQuickLogin("Mary Jenkins")}
              disabled={isLoading}
              className="w-full p-4 rounded-2xl border-2 border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/30 transition flex items-center gap-4 text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                MJ
              </div>
              <div className="flex-1">
                <div className="font-extrabold text-lg text-slate-900 group-hover:text-blue-700">
                  Mary Jenkins
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Active Profile • All Done Today
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-slate-400">
              Need help signing in? Speak to your family caregiver or call 1-800-CARE-NOW
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePhoneSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-slate-900">
              Caregiver Access
            </h2>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Monitor elder health, manage medications & GPS safety
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Caregiver Phone / Email
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="(555) 234-5678 or email"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Quick PIN / Password
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="4-digit PIN (e.g. 1234)"
                defaultValue="1234"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
          >
            {isLoading ? (
              <span>Connecting securely...</span>
            ) : (
              <>
                <span>Enter Caregiver Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs text-indigo-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Caregiver Sarah is linked to Arthur Pendelton</span>
          </div>
        </form>
      )}
    </div>
  );
}
export default LoginForm;
