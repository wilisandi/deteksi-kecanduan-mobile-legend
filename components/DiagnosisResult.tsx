import { DiagnosisResult, IntermediateFacts } from "@/lib/expert-system/engine";
import React from "react";

type Props = {
  result: DiagnosisResult;
  intermediates: IntermediateFacts;
  onReset: () => void;
};

export default function DiagnosisResultCard({
  result,
  intermediates,
  onReset,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl border border-gray-100 dark:bg-gray-800 dark:border-gray-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className={`text-center p-6 rounded-xl ${result.color} text-white mb-8 shadow-lg`}
      >
        <div className="text-sm uppercase tracking-widest font-bold opacity-80 mb-2">
          Hasil Diagnosa
        </div>
        <h2 className="text-4xl font-black mb-2">{result.title}</h2>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="font-bold text-gray-900 border-b pb-2 mb-2 dark:text-white">
            📋 Deskripsi
          </h3>
          <p className="text-gray-700 leading-relaxed dark:text-gray-300">
            {result.description}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 border-b pb-2 mb-2 dark:text-white">
            💡 Saran Pakar
          </h3>
          <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 italic dark:bg-gray-700 dark:text-gray-300">
            "{result.advice}"
          </p>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 border-b pb-2 mb-4 dark:text-white">
            🔍 Faktor Kunci Terdeteksi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FactIndicator
              active={intermediates.f1_penggunaanEkstrem}
              label="F1: Penggunaan Ekstrem (>8 Jam)"
            />
            <FactIndicator
              active={intermediates.f2_ketergantunganMental}
              label="F2: Ketergantungan Mental (Emosi/Bohong)"
            />
            <FactIndicator
              active={intermediates.f3_disfungsiHidup}
              label="F3: Disfungsi Hidup (Cuti/Isolasi)"
            />
            <FactIndicator
              active={intermediates.f4_dampakFisik}
              label="F4: Dampak Fisik (Sakit/Tidur)"
            />
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-all border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
      >
        🔄 Cek Ulang
      </button>
    </div>
  );
}

function FactIndicator({ active, label }: { active: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg text-sm font-medium ${
        active
          ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300"
          : "bg-gray-50 text-gray-400 border border-transparent dark:bg-gray-800 dark:text-gray-600"
      }`}
    >
      <span className={active ? "text-xl" : "text-gray-300"}>
        {active ? "⚠️" : "⚪"}
      </span>
      {label}
    </div>
  );
}
