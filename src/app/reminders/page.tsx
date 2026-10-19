"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Pill, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  Plus, 
  AlertCircle, 
  Calendar, 
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
  Bell
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  shape: string;
  color: string;
  timeSlot: "Morning" | "Afternoon" | "Evening" | "Bedtime";
  time: string;
  instruction: string;
  taken: boolean;
  takenAt?: string;
  pillsLeft: number;
}

const initialMeds: Medication[] = [
  {
    id: "med-1",
    name: "Metformin",
    dosage: "500 mg",
    shape: "Oval",
    color: "White",
    timeSlot: "Morning",
    time: "8:00 AM",
    instruction: "Take 1 tablet with breakfast for blood sugar management.",
    taken: true,
    takenAt: "8:12 AM",
    pillsLeft: 24,
  },
  {
    id: "med-2",
    name: "Vitamin D3 + Calcium",
    dosage: "1000 IU",
    shape: "Softgel",
    color: "Amber Gold",
    timeSlot: "Morning",
    time: "8:00 AM",
    instruction: "Take 1 softgel daily after food.",
    taken: true,
    takenAt: "8:15 AM",
    pillsLeft: 42,
  },
  {
    id: "med-3",
    name: "Lisinopril",
    dosage: "10 mg",
    shape: "Round",
    color: "Light Pink",
    timeSlot: "Afternoon",
    time: "1:00 PM",
    instruction: "Take 1 tablet with lunch for blood pressure.",
    taken: false,
    pillsLeft: 8,
  },
  {
    id: "med-4",
    name: "Omega-3 Fish Oil",
    dosage: "1200 mg",
    shape: "Large Oval",
    color: "Clear Gold",
    timeSlot: "Afternoon",
    time: "1:00 PM",
    instruction: "Take with lunch meal.",
    taken: false,
    pillsLeft: 30,
  },
  {
    id: "med-5",
    name: "Atorvastatin",
    dosage: "20 mg",
    shape: "Oval",
    color: "White",
    timeSlot: "Bedtime",
    time: "9:00 PM",
    instruction: "Take 1 tablet before sleeping for cholesterol.",
    taken: false,
    pillsLeft: 18,
  },
  {
    id: "med-6",
    name: "Melatonin Gentle Sleep",
    dosage: "3 mg",
    shape: "Small Round",
    color: "Lavender",
    timeSlot: "Bedtime",
    time: "9:30 PM",
    instruction: "Take 30 minutes before bed with half glass of water.",
    taken: false,
    pillsLeft: 14,
  },
];

export default function RemindersPage() {
  const [meds, setMeds] = useState<Medication[]>(initialMeds);
  const [selectedSlot, setSelectedSlot] = useState<string>("All");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newMedName, setNewMedName] = useState("");
  const [newMedDosage, setNewMedDosage] = useState("");
  const [newMedTime, setNewMedTime] = useState("Afternoon");

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      console.log("Audio not supported or permitted");
    }
  };

  const toggleTaken = (id: string) => {
    playChime();
    setMeds((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextTaken = !m.taken;
          return {
            ...m,
            taken: nextTaken,
            takenAt: nextTaken ? new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : undefined,
          };
        }
        return m;
      })
    );
  };

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: newMedName,
      dosage: newMedDosage || "1 dose",
      shape: "Tablet",
      color: "White",
      timeSlot: newMedTime as any,
      time: newMedTime === "Morning" ? "8:00 AM" : newMedTime === "Afternoon" ? "1:00 PM" : "8:00 PM",
      instruction: "Take as directed by doctor with water.",
      taken: false,
      pillsLeft: 30,
    };

    setMeds([newMed, ...meds]);
    setNewMedName("");
    setNewMedDosage("");
    setShowAddModal(false);
  };

  const filteredMeds = selectedSlot === "All" 
    ? meds 
    : meds.filter((m) => m.timeSlot === selectedSlot);

  const totalToday = meds.length;
  const takenCount = meds.filter((m) => m.taken).length;
  const percentDone = Math.round((takenCount / totalToday) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>Medication & Pill Assistant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Today's Pill Schedule
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            {takenCount} of {totalToday} taken ({percentDone}% complete)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={playChime}
            className="px-4 py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-2 transition"
            title="Test reminder chime"
          >
            <Volume2 className="w-4 h-4" />
            <span>Test Chime</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span>Adherence Progress</span>
          <span className="text-emerald-600 font-extrabold">{percentDone}% Completed</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${percentDone}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {["All", "Morning", "Afternoon", "Evening", "Bedtime"].map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedSlot === slot
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Medication List */}
      <div className="space-y-3">
        {filteredMeds.map((med) => (
          <div
            key={med.id}
            className={`p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              med.taken
                ? "bg-emerald-50/40 border-emerald-200"
                : "bg-white border-slate-200 hover:border-blue-300 shadow-sm"
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Checkbox circle with big touch target */}
              <button
                onClick={() => toggleTaken(med.id)}
                className={`mt-1 w-10 h-10 rounded-2xl flex items-center justify-center transition shrink-0 ${
                  med.taken
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "border-2 border-slate-300 bg-white hover:border-emerald-500 text-transparent"
                }`}
                aria-label={`Mark ${med.name} as ${med.taken ? "not taken" : "taken"}`}
              >
                <Check className={`w-6 h-6 stroke-[3] ${med.taken ? "block" : "hidden"}`} />
              </button>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-black text-lg ${med.taken ? "line-through text-slate-500" : "text-slate-900"}`}>
                    {med.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-xs font-extrabold bg-blue-100 text-blue-800">
                    {med.dosage}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                    {med.shape} • {med.color}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  {med.instruction}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    {med.time} ({med.timeSlot})
                  </span>

                  {med.pillsLeft <= 10 && (
                    <span className="text-amber-600 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Only {med.pillsLeft} left
                    </span>
                  )}

                  {med.taken && med.takenAt && (
                    <span className="text-emerald-700 font-bold">
                      ✓ Taken at {med.takenAt}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action button */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              {med.pillsLeft <= 10 && (
                <Link
                  href="/ordering"
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 transition"
                >
                  Refill
                </Link>
              )}

              <button
                onClick={() => toggleTaken(med.id)}
                className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition ${
                  med.taken
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20"
                }`}
              >
                {med.taken ? "Undo" : "Mark as Taken"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Medication Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <h2 className="text-xl font-black text-slate-900">
              Add New Medicine
            </h2>
            <form onSubmit={handleAddMedication} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Medicine Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amlodipine"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dosage / Strength
                </label>
                <input
                  type="text"
                  placeholder="e.g. 5 mg"
                  value={newMedDosage}
                  onChange={(e) => setNewMedDosage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  When to take?
                </label>
                <select
                  value={newMedTime}
                  onChange={(e) => setNewMedTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Morning">Morning (8:00 AM)</option>
                  <option value="Afternoon">Afternoon (1:00 PM)</option>
                  <option value="Evening">Evening (6:00 PM)</option>
                  <option value="Bedtime">Bedtime (9:00 PM)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition"
                >
                  Save Medicine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
