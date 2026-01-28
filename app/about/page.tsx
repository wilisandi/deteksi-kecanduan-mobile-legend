"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function About() {
  const [activeFact, setActiveFact] = useState<string | null>(null);
  const [tableMode, setTableMode] = useState<"reduced" | "complete">("reduced");

  const INPUTS = [
    "Durasi", // 0
    "TopUp", // 1
    "Emosi", // 2
    "Bohong", // 3
    "Tugas", // 4
    "Isolasi", // 5
    "Sakit", // 6
    "Tidur", // 7
  ];

  // Mapping dependencies: Fact Code -> Index of Inputs
  const DEPENDENCIES: Record<string, number[]> = {
    F1: [0], // Durasi
    F2: [2, 3], // Emosi, Bohong
    F3: [4, 5], // Tugas, Isolasi
    F4: [6, 7], // Sakit, Tidur
  };

  const toggleFact = (code: string) => {
    if (activeFact === code) {
      setActiveFact(null);
    } else {
      setActiveFact(code);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🔙</span>
            <span className="font-bold text-gray-700 dark:text-gray-200">
              Kembali ke Diagnosa
            </span>
          </Link>
          <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Tentang Sistem
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Intro Section */}
        <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-4">
            Metode & Logika Sistem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            Sistem ini adalah <strong>Sistem Pakar (Expert System)</strong> yang
            menggunakan metode
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              {" "}
              Forward Chaining
            </span>
            . Metode ini bekerja dengan mengumpulkan fakta-fakta (data input
            user) terlebih dahulu, kemudian mencocokkannya dengan aturan-aturan
            (rules) yang ada untuk menarik kesimpulan (diagnosa).
          </p>
        </section>

        {/* Knowledge Base Section */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Input Variables */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <span>📥</span> 8 Variabel Input
            </h2>
            <ul className="space-y-3">
              {[
                "Durasi Main (> 8 Jam)",
                "Top Up Rutin (Microtransaction)",
                "Emosi Labil (Toxic/Marah)",
                "Gangguan Tidur (Insomnia)",
                "Abaikan Tugas (Sekolah/Kerja)",
                "Sakit Fisik (CTS/Punggung)",
                "Isolasi Sosial (Nolep)",
                "Kebohongan (Soal Durasi)",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold dark:bg-blue-900/30 dark:text-blue-400">
                    {idx + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Intermediate Facts */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400 flex items-center gap-2">
              <span>🧠</span> 4 Fakta Antara
            </h2>
            <div className="space-y-4">
              <FactSummaryCard
                code="F1"
                title="Penggunaan Ekstrem"
                desc="Jika Durasi > 8 Jam"
              />
              <FactSummaryCard
                code="F2"
                title="Ketergantungan Mental"
                desc="Emosi Labil OR Kebohongan"
              />
              <FactSummaryCard
                code="F3"
                title="Disfungsi Hidup"
                desc="Abaikan Tugas OR Isolasi Sosial"
              />
              <FactSummaryCard
                code="F4"
                title="Dampak Fisik"
                desc="Sakit Fisik OR Gangguan Tidur"
              />
            </div>
          </div>
        </section>

        {/* Logic Flow Diagram */}
        <section className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
            📊 Dependency Diagram
          </h2>
          <p className="text-center text-gray-500 mb-8 text-sm">
            Klik pada kotak{" "}
            <strong className="text-purple-600">Ungu (F1-F4)</strong> di bawah
            untuk melihat input yang mempengaruhinya.
          </p>

          <div className="relative flex flex-col items-center gap-12">
            {/* Layer 1: Inputs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full transition-all">
              {INPUTS.map((label, i) => {
                const isHighlighted = activeFact
                  ? DEPENDENCIES[activeFact]?.includes(i)
                  : false;
                return (
                  <div
                    key={i}
                    className={`
                      p-3 rounded-lg text-center text-xs font-semibold border transition-all duration-300
                      ${
                        isHighlighted
                          ? "bg-blue-500 text-white border-blue-600 scale-105 shadow-md shadow-blue-500/30"
                          : "bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                      }
                    `}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {/* Arrow Down */}
            <div className="text-gray-300 dark:text-gray-600 text-2xl animate-bounce">
              ⬇️
            </div>

            {/* Layer 2: Intermediates (Clickable) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
              <InteractiveFactNode
                code="F1"
                title="Penggunaan Ekstrem"
                sub="Durasi > 8 Jam"
                active={activeFact === "F1"}
                onClick={() => toggleFact("F1")}
              />
              <InteractiveFactNode
                code="F2"
                title="Ketergantungan Mental"
                sub="Emosi / Bohong"
                active={activeFact === "F2"}
                onClick={() => toggleFact("F2")}
              />
              <InteractiveFactNode
                code="F3"
                title="Disfungsi Hidup"
                sub="Tugas / Isolasi"
                active={activeFact === "F3"}
                onClick={() => toggleFact("F3")}
              />
              <InteractiveFactNode
                code="F4"
                title="Dampak Fisik"
                sub="Sakit / Tidur"
                active={activeFact === "F4"}
                onClick={() => toggleFact("F4")}
              />
            </div>

            {/* Arrow Down */}
            <div className="text-gray-300 dark:text-gray-600 text-2xl">⬇️</div>

            {/* Layer 3: Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center">
              <DiagnosisBadge color="bg-red-500" label="Kecanduan Akut (R1)" />
              <DiagnosisBadge color="bg-orange-500" label="Escapism (R2)" />
              <DiagnosisBadge
                color="bg-yellow-500"
                label="Physical Burnout (R3)"
              />
              <DiagnosisBadge
                color="bg-purple-500"
                label="Toxic Spender (R4)"
              />
              <DiagnosisBadge color="bg-blue-500" label="Hardcore Gamer (R5)" />
              <DiagnosisBadge
                color="bg-green-500"
                label="Normal / Casual (R6)"
              />
            </div>
          </div>
        </section>

        {/* Decision Tables Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              📜 Tabel Keputusan (Decision Table)
            </h2>

            {/* Toggle Button */}
            <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-lg flex items-center">
              <button
                onClick={() => setTableMode("reduced")}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  tableMode === "reduced"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Tabel Reduksi (Simplified)
              </button>
              <button
                onClick={() => setTableMode("complete")}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                  tableMode === "complete"
                    ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                Tabel Lengkap (Extended)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {tableMode === "reduced" ? (
              <table className="w-full text-left border-collapse animate-in fade-in duration-300">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">
                    <th className="p-4 font-semibold border-b dark:border-gray-700">
                      Kode Rule
                    </th>
                    <th className="p-4 font-semibold border-b dark:border-gray-700">
                      Kondisi (IF)
                    </th>
                    <th className="p-4 font-semibold border-b dark:border-gray-700">
                      Hasil Diagnosa (THEN)
                    </th>
                    <th className="p-4 font-semibold border-b dark:border-gray-700">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  <RuleRow
                    code="R1"
                    condition="F1 AND F2 AND F3 AND F4"
                    result="Kecanduan Akut 🚨"
                    desc="Semua indikator terpenuhi"
                  />
                  <RuleRow
                    code="R2"
                    condition="F3 AND F2"
                    result="Escapism 🏃♂️"
                    desc="Disfungsi Hidup, Mental bermasalah, Fisik/Durasi bisa bervariasi"
                  />
                  <RuleRow
                    code="R3"
                    condition="F1 AND F4"
                    result="Physical Burnout 🏥"
                    desc="Durasi tinggi menyebabkan sakit fisik"
                  />
                  <RuleRow
                    code="R4"
                    condition="TopUp AND Emosi"
                    result="Toxic Spender 💸"
                    desc="Input spesifik: Boros + Emosional"
                  />
                  <RuleRow
                    code="R5"
                    condition="F1 AND (NOT F3)"
                    result="Hardcore Gamer 🕹️"
                    desc="Fungsional meskipun durasi tinggi"
                  />
                  <RuleRow
                    code="R6"
                    condition="ELSE"
                    result="Normal / Casual ✅"
                    desc="Tidak memenuhi pola berbahaya lainnya"
                  />
                </tbody>
              </table>
            ) : (
              <table className="w-full text-center border-collapse animate-in fade-in duration-300">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                    <th className="p-3 border-b dark:border-gray-700 w-16">
                      Rule
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 min-w-[30px]">
                      F1
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 min-w-[30px]">
                      F2
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 min-w-[30px]">
                      F3
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-purple-50 dark:bg-purple-900/20 text-purple-700 min-w-[30px]">
                      F4
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-gray-100 dark:bg-gray-700">
                      TopUp
                    </th>
                    <th className="p-3 border-b border-r dark:border-gray-700 dark:border-r-gray-700 bg-gray-100 dark:bg-gray-700">
                      Emosi
                    </th>
                    <th className="p-3 border-b dark:border-gray-700 text-left">
                      Hasil Diagnosa
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                  {/* R1 */}
                  <DecisionRow
                    r="R1"
                    f1="Y"
                    f2="Y"
                    f3="Y"
                    f4="Y"
                    res="Kecanduan Akut"
                    color="text-red-600"
                  />

                  {/* R2 - Variants because R2 ignores F1 and F4 if F2&F3 are true */}
                  <DecisionRow
                    r="R2"
                    f1="-"
                    f2="Y"
                    f3="Y"
                    f4="-"
                    res="Escapism"
                    color="text-orange-500"
                  />

                  {/* R3 */}
                  <DecisionRow
                    r="R3"
                    f1="Y"
                    f2="-"
                    f3="-"
                    f4="Y"
                    res="Physical Burnout"
                    color="text-yellow-600"
                  />

                  {/* R4 - Specific Inputs */}
                  <DecisionRow
                    r="R4"
                    f1="-"
                    f2="-"
                    f3="-"
                    f4="-"
                    tu="Y"
                    em="Y"
                    res="Toxic Spender"
                    color="text-purple-600"
                  />

                  {/* R5 */}
                  <DecisionRow
                    r="R5"
                    f1="Y"
                    f2="-"
                    f3="N"
                    f4="-"
                    res="Hardcore Gamer"
                    color="text-blue-600"
                  />

                  {/* R6 */}
                  <DecisionRow
                    r="R6"
                    f1="N"
                    f2="N"
                    f3="N"
                    f4="N"
                    res="Normal / Casual"
                    color="text-green-600"
                  />
                </tbody>
                <tfoot className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <td colSpan={8} className="p-3 text-center italic">
                      Y = Ya/True, N = Tidak/False, - = Tidak Relevan/Don't Care
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function FactSummaryCard({
  code,
  title,
  desc,
}: {
  code: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold p-2 rounded-lg text-sm w-10 text-center shrink-0">
        {code}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function InteractiveFactNode({
  code,
  title,
  sub,
  active,
  onClick,
}: {
  code: string;
  title: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        p-4 rounded-xl text-center border-2 transition-all duration-300 hover:scale-[1.02] cursor-pointer
        ${
          active
            ? "bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30"
            : "bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 hover:border-purple-300"
        }
      `}
    >
      <div
        className={`font-bold mb-1 ${active ? "text-white" : "text-purple-700 dark:text-purple-300"}`}
      >
        {code}
      </div>
      <div
        className={`text-xs font-semibold ${active ? "text-purple-100" : "text-purple-900 dark:text-purple-200"}`}
      >
        {title}
      </div>
      <div
        className={`text-[10px] mt-1 ${active ? "text-purple-200" : "text-purple-500 dark:text-purple-400"}`}
      >
        {sub}
      </div>
    </button>
  );
}

function DiagnosisBadge({ color, label }: { color: string; label: string }) {
  return (
    <div
      className={`${color} text-white py-3 px-4 rounded-xl font-bold shadow-sm text-sm truncate opacity-90`}
    >
      {label}
    </div>
  );
}

function DecisionRow({
  r,
  f1,
  f2,
  f3,
  f4,
  tu = "-",
  em = "-",
  res,
  color,
}: {
  r: string;
  f1?: string;
  f2?: string;
  f3?: string;
  f4?: string;
  tu?: string;
  em?: string;
  res: string;
  color: string;
}) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      <td className="p-3 font-bold text-gray-400">{r}</td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${f1 === "Y" ? "font-bold text-purple-700 bg-purple-50 dark:bg-purple-900/30" : ""}`}
      >
        {f1}
      </td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${f2 === "Y" ? "font-bold text-purple-700 bg-purple-50 dark:bg-purple-900/30" : ""}`}
      >
        {f2}
      </td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${f3 === "Y" ? "font-bold text-purple-700 bg-purple-50 dark:bg-purple-900/30" : ""}`}
      >
        {f3}
      </td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${f4 === "Y" ? "font-bold text-purple-700 bg-purple-50 dark:bg-purple-900/30" : ""}`}
      >
        {f4}
      </td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${tu === "Y" ? "font-bold text-gray-700 bg-gray-100 dark:bg-gray-700" : ""}`}
      >
        {tu}
      </td>
      <td
        className={`p-3 border-r dark:border-gray-700 ${em === "Y" ? "font-bold text-gray-700 bg-gray-100 dark:bg-gray-700" : ""}`}
      >
        {em}
      </td>
      <td className={`p-3 font-bold text-left ${color}`}>{res}</td>
    </tr>
  );
}

function RuleRow({
  code,
  condition,
  result,
  desc,
}: {
  code: string;
  condition: string;
  result: string;
  desc: string;
}) {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
      <td className="p-4 font-bold text-gray-400 dark:text-gray-500">{code}</td>
      <td className="p-4">
        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded inline-block text-gray-700 dark:text-gray-300">
          {condition}
        </div>
      </td>
      <td className="p-4">
        <div className="font-bold text-gray-800 dark:text-gray-200">
          {result}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {desc}
        </div>
      </td>
    </tr>
  );
}
