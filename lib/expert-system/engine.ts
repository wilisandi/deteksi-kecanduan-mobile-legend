export type InputData = {
  durasiMain: number; // Jam per hari
  topUpRutin: boolean;
  emosiLabil: boolean;
  gangguanTidur: boolean;
  abaikanTugas: boolean;
  sakitFisik: boolean;
  isolasiSosial: boolean;
  kebohongan: boolean;
};

export type IntermediateFacts = {
  f1_penggunaanEkstrem: boolean; // Durasi > 8 Jam
  f2_ketergantunganMental: boolean; // Emosi OR Kebohongan
  f3_disfungsiHidup: boolean; // Abaikan Tugas OR Isolasi Sosial
  f4_dampakFisik: boolean; // Sakit Fisik OR Gangguan Tidur
};

export enum DiagnosisCode {
  ACUTE_ADDICTION = "KECANDUAN_AKUT",
  ESCAPISM = "ESCAPISM",
  PHYSICAL_BURNOUT = "PHYSICAL_BURNOUT",
  TOXIC_SPENDER = "TOXIC_SPENDER",
  HARDCORE_GAMER = "HARDCORE_GAMER",
  NORMAL = "NORMAL",
}

export type DiagnosisResult = {
  code: DiagnosisCode;
  title: string;
  description: string;
  advice: string;
  color: string; // Tailwind color class for UI
};

export const DIAGNOSES: Record<DiagnosisCode, DiagnosisResult> = {
  [DiagnosisCode.ACUTE_ADDICTION]: {
    code: DiagnosisCode.ACUTE_ADDICTION,
    title: "Kecanduan Akut 🚨",
    description:
      "Semua indikator terpenuhi. Tingkat kecanduan sangat berbahaya dan memerlukan intervensi segera.",
    advice:
      "Segera kurangi waktu bermain secara drastis. Cari bantuan profesional jika perlu. Fokus pada pemulihan fisik dan mental.",
    color: "bg-red-600",
  },
  [DiagnosisCode.ESCAPISM]: {
    code: DiagnosisCode.ESCAPISM,
    title: "Escapism (Pelarian) 🏃‍♂️",
    description:
      "Menggunakan game untuk lari dari realitas atau masalah hidup (depresi terselubung).",
    advice:
      "Identifikasi masalah di dunia nyata yang dihindari. Cari hobi lain yang lebih konstruktif. Bicara dengan teman atau keluarga.",
    color: "bg-orange-500",
  },
  [DiagnosisCode.PHYSICAL_BURNOUT]: {
    code: DiagnosisCode.PHYSICAL_BURNOUT,
    title: "Physical Burnout 🏥",
    description:
      "Tubuh mulai rusak karena durasi main yang berlebihan, meskipun mental masih relatif stabil.",
    advice:
      "Istirahatkan tubuh. Perbaiki pola tidur dan ergonomi saat bermain. Olahraga rutin sangat disarankan.",
    color: "bg-yellow-500",
  },
  [DiagnosisCode.TOXIC_SPENDER]: {
    code: DiagnosisCode.TOXIC_SPENDER,
    title: "Toxic Spender 💸",
    description:
      "Boros dalam pengeluaran game dan emosional, tetapi fungsi hidup sehari-hari masih terjaga.",
    advice:
      "Batasi pengeluaran bulanan untuk game. Belajar manajemen emosi saat kalah atau bertemu tim yang buruk.",
    color: "bg-purple-500",
  },
  [DiagnosisCode.HARDCORE_GAMER]: {
    code: DiagnosisCode.HARDCORE_GAMER,
    title: "Hardcore Gamer 🕹️",
    description:
      "Main sangat lama tapi tugas dan kehidupan sosial tetap berjalan (Potensi Pro Player atau Addict Fungsional).",
    advice:
      "Pastikan fisik tetap terjaga. Pertimbangkan untuk serius di esports jika skill mumpuni, tapi jangan abaikan kesehatan.",
    color: "bg-blue-500",
  },
  [DiagnosisCode.NORMAL]: {
    code: DiagnosisCode.NORMAL,
    title: "Normal / Casual ✅",
    description:
      "Bermain dalam batas wajar dan tidak mengganggu aspek kehidupan lainnya.",
    advice:
      "Pertahankan keseimbangan hidup ini. Game hanya sebagai hiburan, bukan prioritas utama.",
    color: "bg-green-500",
  },
};

export function evaluateIntermediates(inputs: InputData): IntermediateFacts {
  return {
    f1_penggunaanEkstrem: inputs.durasiMain > 8,
    f2_ketergantunganMental: inputs.emosiLabil || inputs.kebohongan,
    f3_disfungsiHidup: inputs.abaikanTugas || inputs.isolasiSosial,
    f4_dampakFisik: inputs.sakitFisik || inputs.gangguanTidur,
  };
}

export function diagnose(inputs: InputData): {
  diagnosis: DiagnosisResult;
  intermediates: IntermediateFacts;
} {
  const f = evaluateIntermediates(inputs);

  let code: DiagnosisCode;

  // Rule 1: F1 + F2 + F3 + F4 -> Kecanduan Akut
  if (
    f.f1_penggunaanEkstrem &&
    f.f2_ketergantunganMental &&
    f.f3_disfungsiHidup &&
    f.f4_dampakFisik
  ) {
    code = DiagnosisCode.ACUTE_ADDICTION;
  }
  // Rule 2: F3 + F2 -> Escapism
  else if (f.f3_disfungsiHidup && f.f2_ketergantunganMental) {
    code = DiagnosisCode.ESCAPISM;
  }
  // Rule 3: F1 + F4 -> Physical Burnout
  else if (f.f1_penggunaanEkstrem && f.f4_dampakFisik) {
    code = DiagnosisCode.PHYSICAL_BURNOUT;
  }
  // Rule 4: TopUp + Emosi -> Toxic Spender
  else if (inputs.topUpRutin && inputs.emosiLabil) {
    code = DiagnosisCode.TOXIC_SPENDER;
  }
  // Rule 5: F1 + (Not F3) -> Hardcore Gamer
  else if (f.f1_penggunaanEkstrem && !f.f3_disfungsiHidup) {
    code = DiagnosisCode.HARDCORE_GAMER;
  }
  // Rule 6: Else -> Normal
  else {
    code = DiagnosisCode.NORMAL;
  }

  return {
    diagnosis: DIAGNOSES[code],
    intermediates: f,
  };
}
