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
  Volume2, 
  Check, 
  Droplet, 
  Activity, 
  Footprints, 
  Sun, 
  Smile, 
  Meh, 
  Frown, 
  Plus, 
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default function DashboardPage() {
  const [mood, setMood] = useState<string | null>("great");
  const [waterGlasses, setWaterGlasses] = useState<number>(5);
  const [morningPillTaken, setMorningPillTaken] = useState<boolean>(true);
  const [noonPillTaken, setNoonPillTaken] = useState<boolean>(false);
  const [eveningPillTaken, setEveningPillTaken] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [calledContact, setCalledContact] = useState<string | null>(null);

  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for elderly
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const readDashboardSummary = () => {
    const summary = `Good day, Arthur. You are at home in your safe zone. You have taken your morning medication. Your noon medication, Lisinopril, is due at 1:00 PM with lunch. You have had 5 glasses of water today. Your daughter Sarah and nurse Emily are on standby.`;
    speakText(summary);
  };

  const handleCall = (name: string, number: string) => {
    setCalledContact(name);
    speakText(`Calling ${name} now.`);
    setTimeout(() => {
      setCalledContact(null);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Greeting & Voice Assistance */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Sun className="w-4 h-4 text-amber-500" />
            <span>Today is Monday • October 19</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Good day, Arthur!
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Everything looks peaceful today. Caregiver Sarah is connected.
          </p>
        </div>

        {/* Read Screen Aloud Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={readDashboardSummary}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all border ${
              isSpeaking
                ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
            }`}
            title="Listen to summary"
          >
            <Volume2 className="w-5 h-5 stroke-[2.2]" />
            <span>{isSpeaking ? "Reading Aloud..." : "Read Aloud"}</span>
          </button>

          <Link
            href="/sos"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>SOS</span>
          </Link>
        </div>
      </section>

      {/* Wellness & Mood Check-In */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 mb-1">
          How are you feeling right now?
        </h2>
        <p className="text-xs text-slate-500 mb-4 font-medium">
          Tap an option to let your family know you are doing well:
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => {
              setMood("great");
              speakText("Glad to hear you are feeling great!");
            }}
            className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              mood === "great"
                ? "bg-white border-emerald-500 shadow-md text-emerald-700 scale-102"
                : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white"
            }`}
          >
            <Smile className="w-8 h-8 text-emerald-600" />
            <span className="font-bold text-sm sm:text-base">Feeling Great</span>
            {mood === "great" && (
              <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Logged to Sarah
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setMood("okay");
              speakText("Logged that you are feeling okay. Take some rest if needed.");
            }}
            className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              mood === "okay"
                ? "bg-white border-amber-500 shadow-md text-amber-700 scale-102"
                : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white"
            }`}
          >
            <Meh className="w-8 h-8 text-amber-500" />
            <span className="font-bold text-sm sm:text-base">Just Okay</span>
            {mood === "okay" && (
              <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                Logged to Sarah
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setMood("need_help");
              speakText("Caregiver notified. Please stay seated, help is being alerted.");
            }}
            className={`p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${
              mood === "need_help"
                ? "bg-white border-red-500 shadow-md text-red-700 scale-102"
                : "bg-white/70 border-slate-200 text-slate-700 hover:bg-white"
            }`}
          >
            <Frown className="w-8 h-8 text-red-500" />
            <span className="font-bold text-sm sm:text-base">Need Support</span>
            {mood === "need_help" && (
              <span className="text-[11px] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                Alert Sent
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Main Grid: Medicine Alert & Quick Family Call */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Next Medicine Card */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Pill className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-slate-900">
                    Next Pill Due
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Lunchtime Routine • 1:00 PM
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                In 25 Mins
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-base">
                  Lisinopril (Blood Pressure)
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                  10 mg
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Instruction: Take 1 round white tablet with a full glass of water after meal.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {!noonPillTaken ? (
              <button
                onClick={() => {
                  setNoonPillTaken(true);
                  speakText("Lisinopril marked as taken. Well done!");
                }}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-base rounded-2xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition"
              >
                <Check className="w-5 h-5 stroke-[3]" />
                <span>I have taken this pill</span>
              </button>
            ) : (
              <div className="w-full py-3 px-4 bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-sm rounded-2xl flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Marked as taken at 12:45 PM</span>
              </div>
            )}

            <Link
              href="/reminders"
              className="text-center block text-xs font-bold text-blue-600 hover:text-blue-800 pt-1"
            >
              View Full Pill Schedule (3 reminders today) →
            </Link>
          </div>
        </section>

        {/* 1-Tap Quick Call Family & Caregiver */}
        <section className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-slate-900">
                    1-Tap Family & Doctors
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Tap any person to call directly
                  </p>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {calledContact && (
              <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-800 flex items-center justify-between">
                <span>Connecting call to {calledContact}...</span>
                <span className="animate-spin text-blue-600">📞</span>
              </div>
            )}

            <div className="space-y-2.5">
              <button
                onClick={() => handleCall("Sarah (Daughter)", "555-0192")}
                className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 font-bold flex items-center justify-center">
                    SD
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 group-hover:text-blue-700 text-sm">
                      Sarah (Daughter)
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Primary Caregiver • Available</div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => handleCall("Nurse Emily (Home Care)", "555-0188")}
                className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center">
                    NE
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 group-hover:text-blue-700 text-sm">
                      Nurse Emily (Home Care)
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Visiting today at 4:00 PM</div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </button>

              <button
                onClick={() => handleCall("Dr. Robert Miller", "555-0144")}
                className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/50 flex items-center justify-between transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 font-bold flex items-center justify-center">
                    DR
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 group-hover:text-blue-700 text-sm">
                      Dr. Robert Miller
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Cardiology Clinic</div>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center shadow-sm transition">
                  <PhoneCall className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Health Vitals & Hydration Tracker */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Hydration Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-sky-600 uppercase">Hydration</span>
              <Droplet className="w-5 h-5 text-sky-500 fill-sky-200" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {waterGlasses} / 8 <span className="text-sm font-normal text-slate-500">Glasses</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Goal: 2.0 Liters daily</p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                setWaterGlasses((prev) => Math.min(prev + 1, 12));
                speakText("Good job drinking water!");
              }}
              className="flex-1 py-2 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Drank 1 Glass</span>
            </button>
          </div>
        </div>

        {/* Steps & Activity */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600 uppercase">Movement</span>
              <Footprints className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              3,420 <span className="text-sm font-normal text-slate-500">Steps</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Target: 4,000 steps today</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: "85%" }} />
            </div>
            <span className="text-[11px] font-semibold text-slate-500 mt-1 block">85% of daily goal</span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-600 uppercase">Blood Pressure</span>
              <Activity className="w-5 h-5 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              118 / 78 <span className="text-xs font-semibold text-emerald-600">Normal</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Measured 8:30 AM today</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
            <span>Next check due tonight</span>
          </div>
        </div>

        {/* Safe GPS Zone Status */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-purple-600 uppercase">Safe Zone</span>
              <MapPin className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-xl font-black text-slate-900">
              Inside Home Zone
            </div>
            <p className="text-xs text-slate-500 mt-1">742 Evergreen Terrace</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              href="/gps-tracker"
              className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center justify-between"
            >
              <span>Open Live GPS Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Medical Records & Emergency Health ID Card Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-blue-200 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Emergency Responders Profile Ready</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            Comprehensive Medical Records & Health ID
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Blood type O+, Penicillin allergy alert, Pacemaker serial numbers, doctor contacts, and uploaded clinical test PDFs.
          </p>
        </div>

        <Link
          href="/medical-records"
          className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-sm rounded-2xl shadow-lg flex items-center gap-2 transition self-start md:self-center"
        >
          <span>View Medical Records</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
