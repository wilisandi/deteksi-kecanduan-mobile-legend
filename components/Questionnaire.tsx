import { InputData } from "@/lib/expert-system/engine";
import React from "react";

type Props = {
  inputs: InputData;
  onChange: (key: keyof InputData, value: any) => void;
  onSubmit: () => void;
};

export default function Questionnaire({ inputs, onChange, onSubmit }: Props) {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        📝 Asesmen Kecanduan Mobile Legends
      </h2>

      <div className="space-y-6">
        {/* Durasi Main */}
        <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-700/50">
          <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Berapa jam kamu main Mobile Legends dalam sehari?
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="24"
              value={inputs.durasiMain}
              onChange={(e) => onChange("durasiMain", parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="text-xl font-bold w-16 text-center text-blue-600 dark:text-blue-400">
              {inputs.durasiMain} Jam
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Toggle
            label="Top Up Rutin / Belanja Skin"
            description="Sering beli diamond/skin walau uang pas-pasan?"
            checked={inputs.topUpRutin}
            onChange={(v) => onChange("topUpRutin", v)}
          />
          <Toggle
            label="Emosi Labil / Toxic"
            description="Mudah marah, memaki, atau mood hancur karena kalah?"
            checked={inputs.emosiLabil}
            onChange={(v) => onChange("emosiLabil", v)}
          />
          <Toggle
            label="Gangguan Tidur"
            description="Begadang main game sampai pagi atau insomnia?"
            checked={inputs.gangguanTidur}
            onChange={(v) => onChange("gangguanTidur", v)}
          />
          <Toggle
            label="Abaikan Tugas"
            description="Mangkir kerja/sekolah atau nilai turun drastis?"
            checked={inputs.abaikanTugas}
            onChange={(v) => onChange("abaikanTugas", v)}
          />
          <Toggle
            label="Sakit Fisik"
            description="Sakit punggung, jari kaku (CTS), atau mata lelah?"
            checked={inputs.sakitFisik}
            onChange={(v) => onChange("sakitFisik", v)}
          />
          <Toggle
            label="Isolasi Sosial"
            description="Males nongkrong atau ketemu teman di dunia nyata?"
            checked={inputs.isolasiSosial}
            onChange={(v) => onChange("isolasiSosial", v)}
          />
          <Toggle
            label="Berbohong"
            description="Suka bohong soal berapa lama main game?"
            checked={inputs.kebohongan}
            onChange={(v) => onChange("kebohongan", v)}
          />
        </div>

        <button
          onClick={onSubmit}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-blue-500/30 text-lg mt-8"
        >
          🔍 Analisa Kecanduan Saya
        </button>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
        checked
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-gray-800 dark:text-gray-100">
          {label}
        </span>
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border ${
            checked
              ? "bg-blue-500 border-blue-500 text-white"
              : "border-gray-300"
          }`}
        >
          {checked && (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}
