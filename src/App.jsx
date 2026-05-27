import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Frown,
  Activity,
  CheckCircle2,
  XCircle,
  ChevronDown,
  Shield,
  Megaphone,
  Compass,
  Info,
  Clock,
  Sparkles
} from 'lucide-react';

const CASES_DATA = {
  beasiswa: {
    id: "beasiswa",
    title: "Isu Beasiswa Negara dan Kepercayaan Publik",
    category: "Pendidikan & SDM",
    status: "Krisis Kepercayaan",
    statusColor: "text-red-700 bg-red-50 border-red-200",
    metrics: {
      riskScore: 87,
      negativeSentiment: 72,
      dominantEmotion: "Kecewa & Marah",
      dominantTopic: "LPDP, WNI, Kontribusi",
      viralPhase: "Puncak Isu"
    },
    sentimentData: [
      { day: 'Hari 1', Positif: 40, Netral: 45, Negatif: 15 },
      { day: 'Hari 2', Positif: 35, Netral: 40, Negatif: 25 },
      { day: 'Hari 3', Positif: 20, Netral: 30, Negatif: 50 },
      { day: 'Hari 4', Positif: 12, Netral: 16, Negatif: 72 },
      { day: 'Hari 5', Positif: 15, Netral: 20, Negatif: 65 },
      { day: 'Hari 6', Positif: 18, Netral: 22, Negatif: 60 },
      { day: 'Hari 7', Positif: 22, Netral: 25, Negatif: 53 }
    ],
    sentimentInsight: "Sentimen negatif meningkat tajam setelah pernyataan viral terkait penahanan kontribusi alumni tersebar di media sosial.",
    emotions: [
      { name: 'Marah', value: 34, color: '#EF4444' },
      { name: 'Kecewa', value: 28, color: '#F97316' },
      { name: 'Sinis', value: 20, color: '#EAB308' },
      { name: 'Membela', value: 11, color: '#10B981' },
      { name: 'Netral', value: 7, color: '#6B7280' }
    ],
    topics: [
      { text: "LPDP", weight: 32 },
      { text: "WNI", weight: 24 },
      { text: "status keluarga", weight: 16 },
      { text: "British citizenship", weight: 20 },
      { text: "uang negara", weight: 28 },
      { text: "kontribusi alumni", weight: 35 },
      { text: "pengabdian", weight: 14 },
      { text: "klarifikasi", weight: 18 }
    ],
    topicSummary: "Topik utama berkaitan erat dengan akuntabilitas penerima beasiswa dan tuntutan keadilan sosial terhadap pengelolaan dana publik.",
    timeline: [
      { day: 'Hari 1', title: 'Konten Pertama Muncul', desc: 'Unggahan dari tokoh berpengaruh mempertanyakan kewajiban kontribusi alumni penerima beasiswa.', type: 'info' },
      { day: 'Hari 2', title: 'Mulai Dibagikan Luas', desc: 'Akun agregator membagikan infografis terkait penggunaan dana beasiswa dan kewajiban kontribusi alumni.', type: 'warning' },
      { day: 'Hari 3', title: 'Lonjakan Sentimen Negatif', desc: 'Opini netizen bergeser dari kritik akademis menjadi tuduhan ketidakadilan sistemik.', type: 'danger' },
      { day: 'Hari 4', title: 'Puncak Isu Viral', desc: 'Hastag terkait menembus daftar trending topic nasional dengan jangkauan estimasi 3,2 juta akun.', type: 'critical' },
      { day: 'Hari 5', title: 'Pemberitaan Media Massa', desc: 'Portal berita online nasional mulai mengangkat isu sebagai komparasi efisiensi anggaran negara.', type: 'danger' },
      { day: 'Hari 6', title: 'Kebutuhan Respon Proporsional', desc: 'Sinyal menyarankan instansi merilis data konkret kepatuhan alumni guna meredam spekulasi.', type: 'success' }
    ],
    recommendations: [
      { text: "Melakukan klarifikasi publik secara proporsional dan tidak konfrontatif terhadap opini liar.", isDo: true },
      { text: "Merilis data agregat umum terkait kepatuhan dan kontribusi nyata dari mayoritas alumni beasiswa.", isDo: true },
      { text: "Menjelaskan mekanisme monitoring dan penegakan sanksi bagi penerima beasiswa secara transparan.", isDo: true },
      { text: "Membuka kanal komunikasi terbuka atau sesi tanya jawab interaktif untuk menjawab keraguan publik secara faktual.", isDo: true },
      { text: "Menghindari respon personal yang memojokkan atau menyerang balik pihak/individu yang memicu viralitas.", isDo: false },
      { text: "Fokus pada penguatan akuntabilitas kelembagaan dan keterbukaan informasi alih-alih pembelaan diri normatif.", isDo: true }
    ],
    updates: [
      { time: "10 menit yang lalu", platform: "Twitter/X", content: "Lembaga disarankan merilis dashboard alumni transparan untuk meredam kecurigaan." },
      { time: "42 menit yang lalu", platform: "Media Online", content: "Artikel opini 'Pelajaran Etika Publik dari Beasiswa Negara' dipublikasikan media arus utama." },
      { time: "2 jam yang lalu", platform: "TikTok", content: "Video reaksi netizen membandingkan fasilitas beasiswa dalam negeri vs luar negeri menembus 200rb tayangan." }
    ]
  },
  kewarganegaraan: {
    id: "kewarganegaraan",
    title: "Isu Kewarganegaraan Ganda Diaspora Berprestasi",
    category: "Hukum & Sosial",
    status: "Risiko Tinggi",
    statusColor: "text-amber-700 bg-amber-50 border-amber-200",
    metrics: {
      riskScore: 64,
      negativeSentiment: 49,
      dominantEmotion: "Sinis & Membela",
      dominantTopic: "Paspor, Diaspora, Aturan",
      viralPhase: "Perlu Dipantau"
    },
    sentimentData: [
      { day: 'Hari 1', Positif: 45, Netral: 35, Negatif: 20 },
      { day: 'Hari 2', Positif: 40, Netral: 32, Negatif: 28 },
      { day: 'Hari 3', Positif: 33, Netral: 27, Negatif: 40 },
      { day: 'Hari 4', Positif: 29, Netral: 22, Negatif: 49 },
      { day: 'Hari 5', Positif: 31, Netral: 25, Negatif: 44 },
      { day: 'Hari 6', Positif: 35, Netral: 28, Negatif: 37 },
      { day: 'Hari 7', Positif: 38, Netral: 30, Negatif: 32 }
    ],
    sentimentInsight: "Ada pembelahan opini publik yang cukup berimbang antara kepatuhan aturan hukum murni dengan apresiasi potensi kontribusi diaspora.",
    emotions: [
      { name: 'Membela', value: 32, color: '#10B981' },
      { name: 'Sinis', value: 25, color: '#EAB308' },
      { name: 'Kecewa', value: 18, color: '#F97316' },
      { name: 'Marah', value: 15, color: '#EF4444' },
      { name: 'Netral', value: 10, color: '#6B7280' }
    ],
    topics: [
      { text: "diaspora", weight: 30 },
      { text: "nasionalisme", weight: 26 },
      { text: "paspor ganda", weight: 28 },
      { text: "prestasi", weight: 22 },
      { text: "undang-undang", weight: 20 },
      { text: "kehilangan aset", weight: 18 },
      { text: "revisi aturan", weight: 15 }
    ],
    topicSummary: "Diskusi dominan berputar di sekitar kepastian hukum versus pentingnya merangkul talenta terbaik bangsa di kancah global.",
    timeline: [
      { day: 'Hari 1', title: 'Unggahan Kasus', desc: 'Identitas seorang peneliti berprestasi dengan status kewarganegaraan ganda mulai diekspos.', type: 'info' },
      { day: 'Hari 2', title: 'Diskusi Hukum', desc: 'Netizen akademisi membedah regulasi UU Kewarganegaraan Indonesia yang berlaku.', type: 'warning' },
      { day: 'Hari 3', title: 'Polarisasi Terjadi', desc: 'Kubu pro-kontribusi diaspora berdebat sengit dengan kubu kepatuhan hukum saklek.', type: 'danger' },
      { day: 'Hari 4', title: 'Intervensi Analis', desc: 'Media mulai meminta tanggapan ahli hukum tata negara mengenai celah regulasi.', type: 'danger' }
    ],
    recommendations: [
      { text: "Menjelaskan aturan hukum yang berlaku saat ini secara objektif, tenang, dan normatif.", isDo: true },
      { text: "Mengapresiasi prestasi yang bersangkutan tanpa melanggar atau menegasikan koridor hukum tertulis.", isDo: true },
      { text: "Menyampaikan upaya/program kolaboratif instansi dalam menjembatani potensi diaspora global.", isDo: true },
      { text: "Menghindari pernyataan politis yang diskriminatif terhadap pilihan diaspora.", isDo: false },
      { text: "Menyarankan forum diskusi lintas lembaga untuk merancang solusi jangka panjang regulasi talenta nasional.", isDo: true }
    ],
    updates: [
      { time: "25 menit yang lalu", platform: "Forum Hukum", content: "Diskusi ruang akademis mengusulkan revisi terbatas UU Kewarganegaraan untuk talenta khusus." },
      { time: "1 jam yang lalu", platform: "Twitter/X", content: "Sentimen membela menguat seiring disebarkannya daftar prestasi riset diaspora di luar negeri." }
    ]
  }
};

export default function App() {
  const [activeCaseId, setActiveCaseId] = useState('beasiswa');
  const currentCase = CASES_DATA[activeCaseId];

  const getRiskColor = (score) => {
    if (score <= 40) return { label: "Aman", bg: "bg-emerald-500", text: "text-emerald-500", bgLight: "bg-emerald-50/70", border: "border-emerald-200" };
    if (score <= 60) return { label: "Perlu Dipantau", bg: "bg-amber-400", text: "text-amber-500", bgLight: "bg-amber-50/70", border: "border-amber-200" };
    if (score <= 80) return { label: "Risiko Tinggi", bg: "bg-orange-500", text: "text-orange-500", bgLight: "bg-orange-50/70", border: "border-orange-200" };
    return { label: "Krisis Kepercayaan", bg: "bg-red-600", text: "text-red-600", bgLight: "bg-red-50/70", border: "border-red-200" };
  };

  const riskMeta = getRiskColor(currentCase.metrics.riskScore);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* ================= HEADER PART ================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Logo & Title */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-blue-900 text-white rounded-xl shadow-inner mt-1">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    TrustGov Watch
                  </h1>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100">
                    Beta v1.2
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Public Trust Early Warning System &bull; Dasbor Sinyal Sosial Instansi
                </p>
              </div>
            </div>

            {/* Selector & Badge */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Simulation Select Dropdown */}
              <div className="relative">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Pilih Simulasi Kasus
                </label>
                <div className="relative">
                  <select
                    value={activeCaseId}
                    onChange={(e) => setActiveCaseId(e.target.value)}
                    className="appearance-none w-full sm:w-80 pl-3 pr-10 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition-all cursor-pointer"
                  >
                    <option value="beasiswa">Isu Beasiswa Negara dan Kepercayaan Publik</option>
                    <option value="kewarganegaraan">Isu Kewarganegaraan Diaspora Berprestasi</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex flex-col justify-end">
                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                  Status Sinyal Kasus
                </label>
                <div className={`px-4 py-1.5 rounded-lg border font-semibold text-xs flex items-center justify-center gap-1.5 ${riskMeta.bgLight} ${riskMeta.border} ${riskMeta.text}`}>
                  <span className={`w-2 h-2 rounded-full ${riskMeta.bg} animate-pulse`}></span>
                  {currentCase.status}
                </div>
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* Warning/Disclaimer bar */}
      <div className="bg-blue-950 text-white py-2 px-4 text-center text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Sistem ini mendeteksi sentimen sosial untuk memitigasi krisis persepsi publik secara terukur dan akademis.</span>
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Live Stream Alert Bar & Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live Stream Alerts */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-xs font-bold text-red-600 uppercase tracking-widest">Sinyal Real-Time</span>
              <div className="h-4 w-px bg-slate-200 hidden md:block"></div>
              <p className="text-xs text-slate-600 line-clamp-1">
                <span className="font-semibold text-slate-900">[{currentCase.updates[0].platform}]</span> "{currentCase.updates[0].content}"
              </p>
            </div>
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 self-end md:self-auto shrink-0">
              <Clock className="w-3.5 h-3.5" /> Diperbarui {currentCase.updates[0].time}
            </span>
          </div>

          {/* IndoBERTweet Methodology Info Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex flex-col justify-center shadow-xs">
            <div className="flex items-center gap-1.5 mb-1.5 text-blue-900 font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
              <span className="text-slate-850 font-bold">Metode Analisis (IndoBERTweet)</span>
            </div>
            <p className="leading-relaxed">
              Data teks media sosial diproses melalui tahapan preprocessing, kemudian dianalisis menggunakan <strong>IndoBERTweet</strong> untuk mengklasifikasikan sentimen dan emosi publik secara akurat. Hasil klasifikasi digunakan sebagai dasar perhitungan Public Trust Risk Score.
            </p>
          </div>

        </div>

        {/* 2. RINGKASAN METRIK UTAMA (5 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Risk Score */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Public Trust Risk Score</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold tracking-tight ${riskMeta.text}`}>
                {currentCase.metrics.riskScore}
              </span>
              <span className="text-slate-400 text-sm font-medium">/100</span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5">
              <span className={`text-[11px] px-2 py-0.5 font-bold rounded-md ${riskMeta.bgLight} ${riskMeta.text}`}>
                {riskMeta.label}
              </span>
            </div>
          </div>

          {/* Card 2: Sentimen Negatif */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <TrendingUp className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sentimen Negatif</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold tracking-tight text-red-600">
                {currentCase.metrics.negativeSentiment}%
              </span>
              <span className="text-slate-400 text-sm font-medium">dari total opini</span>
            </div>
            <div className="mt-2.5 text-xs text-red-600 flex items-center gap-1 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Lonjakan di atas ambang aman
            </div>
          </div>

          {/* Card 3: Emosi Dominan */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <Frown className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Emosi Dominan</p>
            <div className="mt-3">
              <span className="text-xl font-bold tracking-tight text-slate-800 line-clamp-1 block leading-tight">
                {currentCase.metrics.dominantEmotion}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">Tercatat di percakapan viral</span>
            </div>
            <div className="mt-2.5 text-xs text-amber-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Indikasi frustrasi digital
            </div>
          </div>

          {/* Card 4: Topik Dominan */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topik Utama</p>
            <div className="mt-3">
              <span className="text-base font-bold tracking-tight text-slate-800 line-clamp-2 leading-snug">
                {currentCase.metrics.dominantTopic}
              </span>
            </div>
            <div className="mt-1 text-xs text-slate-400">Paling banyak disebut</div>
          </div>

          {/* Card 5: Fase Viral */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-16 h-16 bg-slate-50 rounded-bl-full flex items-center justify-center text-slate-400 group-hover:bg-slate-100 transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fase Viralitas</p>
            <div className="mt-3">
              <span className="text-2xl font-black text-blue-950 block">
                {currentCase.metrics.viralPhase}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">Berdasarkan volume kurva</span>
            </div>
            <div className="mt-1 text-xs text-slate-500 font-medium">Perlu mitigasi segera</div>
          </div>

        </div>

        {/* ================= CHARTS SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 3. SENTIMENT MONITOR */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-900" />
                    Sentimen Monitor (7 Hari Terakhir)
                  </h3>
                  <p className="text-xs text-slate-500">Pergerakan persentase jenis opini publik di platform sosial</p>
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-cyan-600 animate-pulse"></span> Analisis Real-Time
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-64 sm:h-72 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentCase.sentimentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" />
                    <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#E2E8F0" domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="Positif" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Netral" stroke="#94A3B8" strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="Negatif" stroke="#EF4444" strokeWidth={3.5} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight Area */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-150 rounded-lg flex items-start gap-3">
              <div className="p-1.5 bg-blue-100 text-blue-900 rounded-md shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase text-blue-900 tracking-wider">Insight Sistem</span>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed">
                  {currentCase.sentimentInsight}
                </p>
              </div>
            </div>

          </div>

          {/* 4. EMOTION MAP */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Frown className="w-5 h-5 text-amber-500" />
                  Peta Emosi Publik
                </h3>
                <p className="text-xs text-slate-500">Klusterisasi psikologis pesan dalam diskusi</p>
              </div>

              {/* Chart Visual & Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-2">
                
                {/* Donut Chart Visual */}
                <div className="sm:col-span-6 flex justify-center relative">
                  <div className="w-44 h-44 sm:w-40 sm:h-40 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={currentCase.emotions}
                          cx="50%"
                          cy="50%"
                          innerRadius="65%"
                          outerRadius="90%"
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {currentCase.emotions.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {/* Inner Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-black text-slate-800">{currentCase.emotions[0].value}%</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">{currentCase.emotions[0].name}</span>
                    </div>
                  </div>
                </div>

                {/* Legend List */}
                <div className="sm:col-span-6 space-y-2">
                  {currentCase.emotions.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs p-1.5 hover:bg-slate-50 rounded transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                        <span className="font-medium text-slate-600">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-950 bg-slate-100 px-1.5 py-0.5 rounded-md text-[10px]">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* Explanations block */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <p className="flex items-start gap-1.5 bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-200/50 leading-relaxed">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Deteksi Emosi:</strong> Emosi dominan menunjukkan isu ini rentan berubah menjadi krisis legitimasi sosial jika tidak ditangani dengan klarifikasi berorientasi solusi.
                </span>
              </p>
            </div>

          </div>

        </div>

        {/* ================= TOPICS & TIMELINE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 5. TOPIC CLUSTER */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-900" />
                  Kluster Topik Dominan
                </h3>
                <p className="text-xs text-slate-500">Intensitas kata kunci paling sering dikaitkan dalam narasi negatif</p>
              </div>

              {/* Tag Cloud Simulation */}
              <div className="flex flex-wrap gap-2.5 py-4 min-h-36 items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200 p-4">
                {currentCase.topics.map((topic, index) => {
                  let fontStyle = "text-xs px-2.5 py-1 bg-white text-slate-600 border border-slate-200";
                  if (topic.weight >= 30) {
                    fontStyle = "text-lg font-bold px-4 py-2 bg-blue-900 text-white shadow-xs";
                  } else if (topic.weight >= 25) {
                    fontStyle = "text-base font-semibold px-3 py-1.5 bg-cyan-100 text-blue-950 border border-cyan-200";
                  } else if (topic.weight >= 20) {
                    fontStyle = "text-sm font-medium px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200";
                  }

                  return (
                    <span
                      key={index}
                      className={`rounded-full transition-all hover:scale-105 cursor-default select-none ${fontStyle}`}
                    >
                      {topic.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Summarized block */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Kesimpulan Narasi</span>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {currentCase.topicSummary}
              </p>
            </div>

          </div>

          {/* 6. VIRAL TIMELINE */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-600" />
                Lini Masa Perkembangan Isu (Viral Timeline)
              </h3>
              <p className="text-xs text-slate-500">Tahapan pelipatgandaan respon sosial dari kemunculan pertama</p>
            </div>

            {/* Timeline Vertical */}
            <div className="relative pl-6 border-l-2 border-slate-200 space-y-6 py-2 ml-2">
              {currentCase.timeline.map((step, index) => {
                let bulletBg = "bg-slate-300 ring-slate-100";
                if (step.type === 'critical') bulletBg = "bg-red-600 ring-red-100";
                else if (step.type === 'danger') bulletBg = "bg-orange-500 ring-orange-100";
                else if (step.type === 'warning') bulletBg = "bg-amber-400 ring-amber-100";
                else if (step.type === 'info') bulletBg = "bg-blue-600 ring-blue-100";
                else if (step.type === 'success') bulletBg = "bg-emerald-500 ring-emerald-100";

                return (
                  <div key={index} className="relative group">
                    {/* Bullet */}
                    <span className={`absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full ring-4 ${bulletBg}`}></span>
                    
                    {/* Content */}
                    <div className="text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-extrabold uppercase text-[10px] text-slate-400 tracking-wider">
                          {step.day}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-slate-500 leading-relaxed text-xs">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* ================= RISK SCORE CARD & METRICS BREAKDOWN ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 7. PUBLIC TRUST RISK SCORE CARD */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-4 mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  Kalkulasi Trust Risk Score
                </h3>
                <p className="text-xs text-slate-500">Metodologi pengukuran indeks risiko kepercayaan publik</p>
              </div>

              {/* Central Meter Widget */}
              <div className="py-6 flex flex-col items-center justify-center text-center">
                <div className="text-xs text-slate-400 font-semibold mb-1">SKOR INDEKS</div>
                <div className="text-6xl font-black tracking-tight text-slate-900 flex items-baseline">
                  {currentCase.metrics.riskScore}
                  <span className="text-lg text-slate-400 font-normal">/100</span>
                </div>
                
                {/* Horizontal Progress Meter segmented */}
                <div className="w-full max-w-xs mt-6 space-y-2">
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500" style={{ width: '40%' }}></div>
                    <div className="h-full bg-amber-400" style={{ width: '20%' }}></div>
                    <div className="h-full bg-orange-500" style={{ width: '20%' }}></div>
                    <div className="h-full bg-red-600" style={{ width: '20%' }}></div>
                  </div>
                  
                  {/* Gauge marker indicator */}
                  <div className="relative h-6 w-full text-xs">
                    <div 
                      className="absolute -translate-x-1/2 flex flex-col items-center"
                      style={{ left: `${currentCase.metrics.riskScore}%` }}
                    >
                      <span className="border-solid border-b-slate-800 border-b-8 border-x-transparent border-x-8 w-0 h-0"></span>
                      <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mt-0.5 whitespace-nowrap animate-bounce">
                        Kasus Ini ({currentCase.metrics.riskScore})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Range Levels Legend */}
                <div className="w-full grid grid-cols-4 gap-1 text-[10px] font-semibold text-slate-500 mt-4 text-center">
                  <div className="bg-emerald-50 text-emerald-800 p-1.5 rounded border border-emerald-100">
                    <div>0-40</div>
                    <div>Aman</div>
                  </div>
                  <div className="bg-amber-50 text-amber-800 p-1.5 rounded border border-amber-100">
                    <div>41-60</div>
                    <div>Pantau</div>
                  </div>
                  <div className="bg-orange-50 text-orange-800 p-1.5 rounded border border-orange-100">
                    <div>61-80</div>
                    <div>Tinggi</div>
                  </div>
                  <div className="bg-red-50 text-red-800 p-1.5 rounded border border-red-100">
                    <div>81-100</div>
                    <div>Krisis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metodologi Info */}
            <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-3.5 rounded-lg text-xs text-slate-500 space-y-1">
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">Sumber Bobot Kalkulasi:</span>
              <p className="leading-relaxed">
                Diperoleh secara otomatis dari akumulasi: sentimen negatif (35%), intensitas emosional kemarahan publik (25%), volume total percakapan per jam (20%), serta kecepatan penyebaran konten di media arus utama (20%).
              </p>
            </div>

          </div>

          {/* 8. RESPONSE RECOMMENDATION CARD */}
          <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-xs lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-900" />
                    Rekomendasi Tindakan Strategis
                  </h3>
                  <p className="text-xs text-slate-500">Tindakan proporsional berbasis analisis mitigasi dampak publik</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Berbasis Data
                </span>
              </div>

              {/* Recommendation Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 py-2">
                {currentCase.recommendations.map((rec, index) => (
                  <div 
                    key={index} 
                    className={`p-3.5 rounded-xl border flex gap-3 transition-colors ${
                      rec.isDo 
                        ? 'bg-emerald-50/40 border-emerald-100 hover:bg-emerald-50' 
                        : 'bg-red-50/40 border-red-100 hover:bg-red-50'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {rec.isDo ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="text-xs">
                      <span className={`font-bold uppercase text-[9px] tracking-wider block mb-0.5 ${rec.isDo ? 'text-emerald-700' : 'text-red-700'}`}>
                        {rec.isDo ? 'REKOMENDASI DO' : 'HINDARI DON\'T'}
                      </span>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {rec.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Compass className="w-4 h-4 text-blue-900 shrink-0" />
              <span>Sistem menyarankan agar klarifikasi dilakukan paling lambat <strong>12 jam</strong> sejak terdeteksinya status risiko krisis.</span>
            </div>

          </div>

        </div>

      </main>

      {/* ================= FOOTER PART ================= */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-900 text-white rounded-md">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-semibold text-slate-700">TrustGov Watch &copy; 2026</span>
            </div>
            <p className="text-center md:text-left leading-relaxed max-w-xl">
              <strong>Pernyataan Batasan Penggunaan:</strong> TrustGov Watch dirancang khusus untuk membantu institusi negara dan lembaga publik membaca sinyal sosial secara cepat, proporsional, dan obyektif. Sistem ini berfokus pada perbaikan kebijakan internal dan kualitas komunikasi massa, <strong>bukan untuk menghukum, memantau secara intimidatif, atau mendiskreditkan individu yang menjadi pemicu viralitas.</strong>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
