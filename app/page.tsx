"use client";

import { useState } from "react";
import Link from "next/link";
import Questionnaire from "@/components/Questionnaire";
import DiagnosisResultCard from "@/components/DiagnosisResult";
import {
  diagnose,
  DiagnosisResult,
  InputData,
  IntermediateFacts,
} from "@/lib/expert-system/engine";

const INITIAL_INPUTS: InputData = {
  durasiMain: 0,
  topUpRutin: false,
  emosiLabil: false,
  gangguanTidur: false,
  abaikanTugas: false,
  sakitFisik: false,
  isolasiSosial: false,
  kebohongan: false,
};

export default function Home() {
  const [inputs, setInputs] = useState<InputData>(INITIAL_INPUTS);
  const [result, setResult] = useState<{
    diagnosis: DiagnosisResult;
    intermediates: IntermediateFacts;
  } | null>(null);

  const handleInputChange = (key: keyof InputData, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDiagnose = () => {
    const diagnosis = diagnose(inputs);
    setResult(diagnosis);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setInputs(INITIAL_INPUTS);
    setResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 font-sans">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎮</span>
            <div>
              <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                MLBB Addiction Detector
              </h1>
              <p className="text-xs text-gray-500 font-medium">
                Sistem Pakar Forward Chaining v2.0
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="text-sm font-semibold text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
          >
            Tentang Sistem ℹ️
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!result ? (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3 dark:text-gray-100">
                Sehat atau Toxic? 🧐
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Cek tingkat kecanduan Mobile Legends kamu menggunakan metode
                sistem pakar. Jawab jujur untuk hasil yang akurat!
              </p>
            </div>
            <Questionnaire
              inputs={inputs}
              onChange={handleInputChange}
              onSubmit={handleDiagnose}
            />
          </div>
        ) : (
          <DiagnosisResultCard
            result={result.diagnosis}
            intermediates={result.intermediates}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2024 MLBB Expert System. Not affiliated with Moonton.</p>
      </footer>
    </div>
  );
}
