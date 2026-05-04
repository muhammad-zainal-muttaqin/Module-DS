import { Link } from "react-router-dom";
import EmailHero from "../components/EmailHero";
import LadderProgress from "../components/LadderProgress";
import AttitudeCard from "../components/AttitudeCard";
import CompetencyGrid from "../components/CompetencyGrid";
import type { Sikap } from "../lib/chapters";

const SIKAP_LIST: Sikap[] = ["curiosity", "rigor", "skepticism", "ownership"];

export default function Home() {
  return (
    <div>
      <EmailHero />

      <section className="page">
        <div className="page-header">
          <div className="eyebrow">Empat sikap riset</div>
          <h2 className="section-title">
            Kompetensi teknis cepat tumpul kalau tidak dibiasakan bersama sikap riset yang tepat.
          </h2>
          <p className="page-lead">
            Empat sikap berikut mengalir di seluruh modul - sering tanpa disebut eksplisit - melalui pilihan contoh, pitfall, dan pertanyaan refleksi.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIKAP_LIST.map((s) => (
            <AttitudeCard key={s} sikap={s} />
          ))}
        </div>
      </section>

      <section className="bg-parchment/40 dark:bg-white/[0.02] border-y border-black/5 dark:border-white/5">
        <div className="page">
          <div className="page-header">
            <div className="eyebrow">Peta 14 minggu</div>
            <h2 className="section-title">
              Satu semester sebagai tangga, bukan daftar tugas.
            </h2>
            <p className="page-lead">
              Setiap anak tangga mewakili satu minggu. Anak tangga lebih tinggi ke kanan: beban konsep menumpuk, tetapi kebiasaan yang di-bangun di minggu sebelumnya menopang.
            </p>
          </div>
          <LadderProgress />
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-ink/70 dark:text-parchment/70">
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-curiosity" aria-hidden="true" /> Curiosity</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-rigor" aria-hidden="true" /> Rigor</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-skepticism" aria-hidden="true" /> Skepticism</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-ownership" aria-hidden="true" /> Ownership</span>
          </div>
          <div className="mt-8">
            <Link to="/progres" className="btn-secondary">
              Lacak progres saya
            </Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="page-header">
          <div className="eyebrow">Sepuluh kompetensi</div>
          <h2 className="section-title">
            Dari memahami sistem sampai berkembang mandiri.
          </h2>
          <p className="page-lead">
            Setiap kompetensi dilatih di beberapa minggu. Klik untuk memilih bab yang ingin dibuka.
          </p>
        </div>
        <CompetencyGrid />
      </section>

      <section className="bg-rigor text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <h2 className="font-serif text-heading-1 font-semibold mb-4">
            Hari Kamis akan datang.
          </h2>
          <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Bukan dengan panik, tetapi dengan protokol, baseline, dan seed yang terkunci. Modul ini mempersiapkan Anda untuk momen itu.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/modul/00" className="btn bg-curiosity text-ink hover:bg-curiosity-deep hover:text-white">
              Mulai dari Bab 00
            </Link>
            <Link to="/alat/protokol" className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20">
              Buka Generator Protokol
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
