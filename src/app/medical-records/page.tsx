"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  AlertTriangle, 
  Heart, 
  ShieldCheck, 
  Phone, 
  Upload, 
  Printer, 
  Volume2, 
  Plus, 
  Download, 
  Eye, 
  CheckCircle2, 
  QrCode, 
  Calendar, 
  Activity, 
  User, 
  Sparkles,
  Stethoscope,
  X,
  FileCheck,
  Share2,
  Syringe,
  History,
  Building
} from "lucide-react";

interface Allergy {
  id: string;
  substance: string;
  reaction: string;
  severity: "Severe" | "Moderate" | "Mild";
}

interface Condition {
  id: string;
  name: string;
  diagnosedYear: string;
  status: string;
  doctor: string;
  notes: string;
}

interface Surgery {
  id: string;
  procedure: string;
  year: string;
  hospital: string;
  implants?: string;
}

interface Immunization {
  id: string;
  vaccine: string;
  date: string;
  status: "Up to Date" | "Due Soon" | "Recommended";
}

interface MedicalDocument {
  id: string;
  title: string;
  category: "Lab Results" | "Doctor Notes" | "Imaging & ECG" | "Prescriptions" | "Discharge Summary";
  date: string;
  doctorOrClinic: string;
  fileSize: string;
  previewUrl?: string;
}

export default function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState<"passport" | "history" | "documents">("passport");

  // State for Allergies
  const [allergies, setAllergies] = useState<Allergy[]>([
    { id: "a1", substance: "Penicillin", reaction: "Anaphylaxis / Severe Bronchospasm", severity: "Severe" },
    { id: "a2", substance: "Sulfa Antibiotics", reaction: "Generalized Hives & Facial Swelling", severity: "Moderate" },
    { id: "a3", substance: "Iodine Radiocontrast", reaction: "Mild Nausea & Skin Flushing", severity: "Mild" },
  ]);

  // State for Chronic Conditions
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "c1", name: "Essential Hypertension", diagnosedYear: "2012", status: "Controlled on Lisinopril 10mg", doctor: "Dr. Robert Miller", notes: "Target BP < 125/80 mmHg" },
    { id: "c2", name: "Type 2 Diabetes Mellitus", diagnosedYear: "2016", status: "Managed on Metformin 500mg (A1C 6.7%)", doctor: "Dr. Patricia Chen", notes: "Daily fasting blood sugar check" },
    { id: "c3", name: "Mild Bilateral Knee Osteoarthritis", diagnosedYear: "2019", status: "Stable with low-impact physical therapy", doctor: "Dr. Robert Miller", notes: "Prefers walking with cane outdoors" },
    { id: "c4", name: "Cardiac Pacemaker Implantation", diagnosedYear: "2021", status: "Dual-Chamber pacemaker functioning normally", doctor: "Dr. Robert Miller", notes: "Interrogated Oct 2026 - 88% battery life" },
  ]);

  // State for Surgeries
  const [surgeries, setSurgeries] = useState<Surgery[]>([
    { id: "s1", procedure: "Dual-Chamber Cardiac Pacemaker", year: "2021", hospital: "Springfield Memorial Heart Institute", implants: "St. Jude Medical Micra Leadless Pacemaker" },
    { id: "s2", procedure: "Right Total Hip Replacement (Arthroplasty)", year: "2018", hospital: "Springfield Orthopedic Center", implants: "Titanium Ceramic Bearing Joint" },
    { id: "s3", procedure: "Bilateral Cataract Extraction with IOL", year: "2016", hospital: "Eye Surgery Center of Springfield" },
  ]);

  // State for Immunizations
  const [immunizations] = useState<Immunization[]>([
    { id: "i1", vaccine: "Influenza Vaccine (High-Dose Senior)", date: "Sep 2026", status: "Up to Date" },
    { id: "i2", vaccine: "COVID-19 mRNA Updated Booster", date: "Oct 2025", status: "Up to Date" },
    { id: "i3", vaccine: "Shingrix (Shingles 2-Dose Series)", date: "Completed 2023", status: "Up to Date" },
    { id: "i4", vaccine: "Pneumococcal Conjugate (PCV20)", date: "Nov 2024", status: "Up to Date" },
  ]);

  // State for Uploaded Documents
  const [documents, setDocuments] = useState<MedicalDocument[]>([
    { id: "d1", title: "Cardiology Annual Review & 12-Lead ECG", category: "Imaging & ECG", date: "Oct 12, 2026", doctorOrClinic: "Dr. Robert Miller (Cardiology)", fileSize: "2.4 MB" },
    { id: "d2", title: "Comprehensive Blood & Metabolic Panel (A1C, Lipids)", category: "Lab Results", date: "Sep 28, 2026", doctorOrClinic: "Quest Diagnostics Springfield", fileSize: "1.1 MB" },
    { id: "d3", title: "Orthopedic Hip Function & Mobility Assessment", category: "Doctor Notes", date: "Aug 15, 2026", doctorOrClinic: "Springfield Orthopedics", fileSize: "840 KB" },
    { id: "d4", title: "Active Prescription Certificate & Care Plan", category: "Prescriptions", date: "Sep 10, 2026", doctorOrClinic: "Dr. Patricia Chen & CareRx", fileSize: "520 KB" },
  ]);

  // Modals & UI States
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [showAddAllergyModal, setShowAddAllergyModal] = useState<boolean>(false);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<MedicalDocument | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Form states for Upload
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState<MedicalDocument["category"]>("Lab Results");
  const [uploadClinic, setUploadClinic] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // Form states for Adding Allergy
  const [newSubstance, setNewSubstance] = useState("");
  const [newReaction, setNewReaction] = useState("");
  const [newSeverity, setNewSeverity] = useState<"Severe" | "Moderate" | "Mild">("Severe");

  // Speech synthesis for elderly
  const speakSummary = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const text = `Emergency Medical Summary for Arthur Pendelton. Age 78. Blood type O positive. Warning: Severe Penicillin allergy causes anaphylaxis. Patient has a dual chamber pacemaker and right titanium hip implant. Primary emergency contact is daughter Sarah Pendelton at 555-019-2834. Attending cardiologist is Dr. Robert Miller.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle) return;

    const newDoc: MedicalDocument = {
      id: `doc-${Date.now()}`,
      title: uploadTitle,
      category: uploadCategory,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      doctorOrClinic: uploadClinic || "Springfield Health",
      fileSize: selectedFileName ? "1.8 MB" : "950 KB",
    };

    setDocuments([newDoc, ...documents]);
    setUploadTitle("");
    setUploadClinic("");
    setSelectedFileName("");
    setShowUploadModal(false);
  };

  const handleAddAllergySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubstance) return;

    const newAllergy: Allergy = {
      id: `allergy-${Date.now()}`,
      substance: newSubstance,
      reaction: newReaction || "Adverse allergic response",
      severity: newSeverity,
    };

    setAllergies([...allergies, newAllergy]);
    setNewSubstance("");
    setNewReaction("");
    setShowAddAllergyModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            <Stethoscope className="w-4 h-4 text-blue-600" />
            <span>Official Emergency Health Record</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Medical Records & Health ID
          </h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium">
            Verified health profile for emergency responders, hospital visits & personal records.
          </p>
        </div>

        {/* Quick Responders Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={speakSummary}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition border ${
              isSpeaking
                ? "bg-amber-500 text-white border-amber-600 animate-pulse"
                : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            }`}
            title="Read summary aloud for first responders or elder"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isSpeaking ? "Reading..." : "Read Aloud"}</span>
          </button>

          <button
            onClick={() => setShowQRModal(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 shadow-sm transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Emergency QR</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print ID Card</span>
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white flex items-center gap-2 shadow-sm transition"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Record</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab("passport")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "passport"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Emergency First Responder Card</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "history"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <History className="w-4 h-4" />
          <span>Medical History & Conditions</span>
        </button>

        <button
          onClick={() => setActiveTab("documents")}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            activeTab === "documents"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Document Locker ({documents.length})</span>
        </button>
      </div>

      {/* TAB 1: EMERGENCY FIRST RESPONDER PASSPORT */}
      {activeTab === "passport" && (
        <div className="space-y-6">
          {/* Critical Emergency Banner Card */}
          <section className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Paramedic & Emergency Notice
                </div>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  Arthur Pendelton • Age 78
                </h2>
                <p className="text-red-100 text-sm font-medium">
                  DOB: March 14, 1948 • Gender: Male • Resides: 742 Evergreen Terrace
                </p>
              </div>

              {/* Critical Vitals Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center">
                  <span className="text-[11px] font-bold text-red-200 block uppercase">Blood Type</span>
                  <span className="text-2xl font-black text-white">O Positive</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center">
                  <span className="text-[11px] font-bold text-red-200 block uppercase">Organ Donor</span>
                  <span className="text-xl font-black text-white">Yes (Registered)</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-center col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-bold text-red-200 block uppercase">Advance Directive</span>
                  <span className="text-xl font-black text-white">Full DNR on File</span>
                </div>
              </div>
            </div>
          </section>

          {/* Critical Allergies & Medical Implants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Allergies Card */}
            <section className="bg-white rounded-3xl p-6 border-2 border-red-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Known Allergies
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      High Alert for Emergency Responders
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowAddAllergyModal(true)}
                  className="text-xs font-bold px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl border border-red-200 transition"
                >
                  + Add Allergy
                </button>
              </div>

              <div className="space-y-3">
                {allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className={`p-3.5 rounded-2xl border-2 flex items-start justify-between gap-3 ${
                      allergy.severity === "Severe"
                        ? "bg-red-50/70 border-red-300"
                        : allergy.severity === "Moderate"
                        ? "bg-amber-50/70 border-amber-300"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-base text-slate-900">
                          {allergy.substance}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                            allergy.severity === "Severe"
                              ? "bg-red-600 text-white"
                              : allergy.severity === "Moderate"
                              ? "bg-amber-500 text-white"
                              : "bg-slate-200 text-slate-800"
                          }`}
                        >
                          {allergy.severity} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Reaction: {allergy.reaction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Implants & Medical Devices Card */}
            <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Activity className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Implants & Medical Devices
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Critical for MRI, Defibrillator & Surgery
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-blue-950">
                      Cardiac Pacemaker (Dual-Chamber)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-200 text-blue-900 rounded-md">
                      MRI Conditional
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Manufacturer: St. Jude Medical / Abbott (Micra). Implanted July 2021. Rate set at 60-120 bpm.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">
                      Right Hip Joint Replacement
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">
                      Titanium Alloy
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Total Hip Arthroplasty (2018). Springfield Orthopedic Center.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-slate-900">
                      Digital Hearing Aid (Right Ear)
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-800 rounded-md">
                      External
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Phonak Rechargeable. Remove during cranial imaging.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Emergency Responders & Healthcare Team Contacts */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  <span>First Responder Emergency Contacts</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Authorized decision makers & primary physicians
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Contact 1 */}
              <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-md">
                      Primary Power of Attorney
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Sarah Pendelton
                  </h4>
                  <p className="text-xs text-slate-600">Relationship: Daughter</p>
                  <p className="text-sm font-bold text-slate-900 mt-2">
                    (555) 019-2834
                  </p>
                  <p className="text-xs text-slate-500">Live Location: 10 mins away</p>
                </div>
                <a
                  href="tel:5550192834"
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Sarah Now</span>
                </a>
              </div>

              {/* Contact 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                      Attending Cardiologist
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Dr. Robert Miller, MD
                  </h4>
                  <p className="text-xs text-slate-600">Springfield Heart Clinic</p>
                  <p className="text-sm font-bold text-slate-900 mt-2">
                    (555) 014-4411
                  </p>
                  <p className="text-xs text-slate-500">Pacemaker Serial #StJ-98214</p>
                </div>
                <a
                  href="tel:5550144411"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Dr. Miller</span>
                </a>
              </div>

              {/* Contact 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase text-slate-600 bg-slate-200 px-2 py-0.5 rounded-md">
                      Preferred Emergency Hospital
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900">
                    Springfield Memorial ER
                  </h4>
                  <p className="text-xs text-slate-600">Level 1 Trauma & Cardiac Care</p>
                  <p className="text-sm font-bold text-slate-900 mt-2">
                    (555) 011-9000
                  </p>
                  <p className="text-xs text-slate-500">Address: 500 Hospital Blvd</p>
                </div>
                <a
                  href="tel:5550119000"
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow"
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Call Hospital ER</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: COMPREHENSIVE MEDICAL HISTORY */}
      {activeTab === "history" && (
        <div className="space-y-6">
          {/* Active Diagnoses / Conditions */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Chronic Medical Conditions</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Active diagnoses currently under management
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {conditions.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-slate-900">{item.name}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md">
                        Since {item.diagnosedYear}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      Supervising: {item.doctor}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold mt-2">
                    Current Status: <span className="font-normal text-slate-600">{item.status}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Clinical Notes: {item.notes}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Past Surgeries & Procedures */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-indigo-600" />
                <span>Surgical History & Major Procedures</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Verified hospital procedures and surgical interventions
              </p>
            </div>

            <div className="space-y-3">
              {surgeries.map((surg) => (
                <div key={surg.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">{surg.procedure}</span>
                      <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                        {surg.year}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{surg.hospital}</p>
                    {surg.implants && (
                      <p className="text-xs font-bold text-blue-700 mt-1">
                        Implant Details: {surg.implants}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-center">
                    Successful Recovery
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Immunizations & Vaccinations */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <Syringe className="w-5 h-5 text-emerald-600" />
                <span>Immunization & Vaccine Record</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Preventative immunizations recommended for seniors
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {immunizations.map((imm) => (
                <div key={imm.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">{imm.vaccine}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">Administered: {imm.date}</p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {imm.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: DOCUMENT LOCKER & UPLOAD SYSTEM */}
      {activeTab === "documents" && (
        <div className="space-y-6">
          {/* Upload Dropzone Banner */}
          <section 
            onClick={() => setShowUploadModal(true)}
            className="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 hover:bg-blue-50 rounded-3xl p-8 text-center cursor-pointer transition group"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md group-hover:scale-105 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Upload New Medical Document
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 font-medium">
              Click to browse or drop doctor notes, blood test results, ECG tracings, MRI scans, or prescription orders (PDF, JPG, PNG up to 25MB)
            </p>
            <button className="mt-4 px-5 py-2.5 bg-blue-600 group-hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition">
              Select Medical File from Device
            </button>
          </section>

          {/* Uploaded Documents List */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Secure Document Archive</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {documents.length} verified clinical records stored securely
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-black text-base text-slate-900 group-hover:text-blue-700 transition">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-slate-200 text-slate-800">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium mt-1">
                        Clinic / Doctor: {doc.doctorOrClinic}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Uploaded {doc.date} • Size: {doc.fileSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => setSelectedDocForPreview(doc)}
                      className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>

                    <button
                      onClick={() => alert(`Downloading "${doc.title}" to your device.`)}
                      className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* MODAL 1: EMERGENCY QR CODE MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-extrabold text-red-600 uppercase tracking-wider">First Responder Scan</span>
              <button onClick={() => setShowQRModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl w-48 h-48 mx-auto flex items-center justify-center">
              {/* High Contrast QR Code graphic */}
              <div className="bg-white p-2 rounded-xl">
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer markers */}
                  <rect x="10" y="10" width="24" height="24" fill="black" />
                  <rect x="14" y="14" width="16" height="16" fill="white" />
                  <rect x="18" y="18" width="8" height="8" fill="black" />

                  <rect x="66" y="10" width="24" height="24" fill="black" />
                  <rect x="70" y="14" width="16" height="16" fill="white" />
                  <rect x="74" y="18" width="8" height="8" fill="black" />

                  <rect x="10" y="66" width="24" height="24" fill="black" />
                  <rect x="14" y="70" width="16" height="16" fill="white" />
                  <rect x="18" y="74" width="8" height="8" fill="black" />

                  {/* QR Data Matrix dots */}
                  <rect x="42" y="14" width="6" height="6" fill="black" />
                  <rect x="52" y="18" width="6" height="6" fill="black" />
                  <rect x="42" y="32" width="6" height="6" fill="black" />
                  <rect x="50" y="42" width="10" height="10" fill="black" />
                  <rect x="68" y="46" width="6" height="6" fill="black" />
                  <rect x="22" y="44" width="6" height="6" fill="black" />
                  <rect x="76" y="76" width="10" height="10" fill="black" />
                  <rect x="44" y="68" width="6" height="6" fill="black" />
                  <rect x="58" y="78" width="6" height="6" fill="black" />
                </svg>
              </div>
            </div>

            <div>
              <h3 className="font-black text-lg text-slate-900">
                Arthur Pendelton ID #8921
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Scanning this QR grants EMTs & Emergency Personnel instant read access to Blood Type, Allergies & Pacemaker info.
              </p>
            </div>

            <button
              onClick={() => setShowQRModal(false)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow"
            >
              Close QR Passport
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: UPLOAD DOCUMENT MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900">
                Upload Medical Record
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title / Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Echocardiogram Report"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Record Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Lab Results">Lab Results (Blood / Urine)</option>
                  <option value="Doctor Notes">Doctor Consultation Notes</option>
                  <option value="Imaging & ECG">Imaging, X-Ray & ECG</option>
                  <option value="Prescriptions">Prescription / Medication List</option>
                  <option value="Discharge Summary">Hospital Discharge Summary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Physician or Clinic Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Robert Miller (Cardiology)"
                  value={uploadClinic}
                  onChange={(e) => setUploadClinic(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Attach File (PDF, Image, Scan)
                </label>
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setSelectedFileName(e.target.files[0].name);
                      if (!uploadTitle) {
                        setUploadTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ""));
                      }
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
                {selectedFileName && (
                  <p className="text-xs text-emerald-600 font-bold mt-1">
                    ✓ Attached: {selectedFileName}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD ALLERGY MODAL */}
      {showAddAllergyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-900">
                Add Critical Allergy
              </h3>
              <button onClick={() => setShowAddAllergyModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAllergySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Allergen / Substance
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Latex or Aspirin"
                  value={newSubstance}
                  onChange={(e) => setNewSubstance(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Typical Reaction Symptoms
                </label>
                <input
                  type="text"
                  placeholder="e.g. Severe swelling, anaphylaxis, hives"
                  value={newReaction}
                  onChange={(e) => setNewReaction(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Severity Level
                </label>
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="Severe">Severe (Life-threatening / Anaphylaxis)</option>
                  <option value="Moderate">Moderate (Hives, Swelling, Vomiting)</option>
                  <option value="Mild">Mild (Rash, Minor Itching)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAllergyModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow transition"
                >
                  Save to Health ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: DOCUMENT PREVIEW MODAL */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                  {selectedDocForPreview.category}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedDocForPreview.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Issued by {selectedDocForPreview.doctorOrClinic} on {selectedDocForPreview.date}
                </p>
              </div>
              <button onClick={() => setSelectedDocForPreview(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document simulated content preview */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 font-mono text-xs text-slate-700">
              <div className="border-b border-slate-200 pb-3 flex justify-between">
                <div>
                  <div className="font-bold text-slate-900">SPRINGFIELD CLINICAL DIAGNOSTICS</div>
                  <div>PATIENT: PENDELTON, ARTHUR (AGE 78)</div>
                  <div>RECORD ID: {selectedDocForPreview.id.toUpperCase()}</div>
                </div>
                <div className="text-right">
                  <div>DATE: {selectedDocForPreview.date}</div>
                  <div className="text-emerald-700 font-bold">VERIFIED SIGNATURE ON FILE</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-900 uppercase">Summary Findings:</div>
                <p>
                  1. Clinical status reviewed by {selectedDocForPreview.doctorOrClinic}.
                </p>
                <p>
                  2. Patient exhibits stable cardiac rhythm with pacemaker operating in demand mode. No syncopal episodes recorded.
                </p>
                <p>
                  3. Blood pressure well managed on Lisinopril. A1C within acceptable senior target range (6.7%).
                </p>
                <p>
                  4. Patient is cleared for routine low-impact physical activity.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => alert(`Document "${selectedDocForPreview.title}" shared with Dr. Miller.`)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share with Doctor</span>
              </button>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition"
              >
                Done Viewing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
