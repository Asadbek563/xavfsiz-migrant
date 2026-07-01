import { useState } from 'react';
import { AlertTriangle, ArrowLeft, CheckCircle2, Navigation, Phone, Loader2, ChevronRight } from 'lucide-react';
import { ShieldAlert } from 'lucide-react';
import { C, display } from '../constants/colors.js';
import { SOS_CATEGORIES, CONSULATES, HOST_AUTHORITIES, HOURS } from '../constants/data.js';
import { useApp } from '../context/AppContext.jsx';
import Field from '../components/ui/Field.jsx';
import { inputStyle } from '../constants/colors.js';

export default function SOSPage() {
  const { me, setSosScreen, triggerSos, finishSos, sendExactLocation, exactLocation, now } = useApp();
  const [category, setCategory] = useState(null);
  const [note, setNote]         = useState('');
  const [step, setStep]         = useState('select'); // select | sent

  const consulate  = CONSULATES[me.country];
  const authority  = HOST_AUTHORITIES[me.country];

  if (step === 'sent') {
    return (
      <div className="px-5 pb-10">
        <div className="flex flex-col items-center text-center mt-4 mb-6">
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#E1EFE6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={30} color={C.safe} />
          </div>
          <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: C.teal, marginTop: 12 }}>SOS yuborildi</h2>
          <p style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>
            Vaziyat va joylashuvingiz administratorga jo'natildi. Endi qo'shimcha yordam so'rashingiz mumkin.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {consulate && (
            <a href={`tel:${consulate.emergencyPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: C.teal, color: '#fff', textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: 14 }}>O'zbekiston konsulligiga qo'ng'iroq</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{consulate.emergencyPhone}</div>
              </div>
              <ChevronRight size={18} />
            </a>
          )}
          {authority && (
            <a href={`tel:${authority.phone}`}
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: C.danger, color: '#fff', textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={18} />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: 14 }}>{authority.name}ga qo'ng'iroq</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{authority.phone}</div>
              </div>
              <ChevronRight size={18} />
            </a>
          )}

          <div className="p-4 rounded-2xl" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div className="flex items-center gap-2 mb-2">
              <Navigation size={16} color={C.teal} />
              <span style={{ fontWeight: 700, fontSize: 14, color: C.teal }}>Aniq joylashuvni yuborish</span>
            </div>
            <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 10 }}>
              GPS orqali real koordinatangizni yuborib, yordamning tezroq yetib kelishini ta'minlang.
            </p>
            <button onClick={sendExactLocation} className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
              style={{ background: C.tealSoft, color: C.teal, fontWeight: 600, fontSize: 13 }}>
              {exactLocation?.loading
                ? <><Loader2 size={15} className="animate-spin" /> Aniqlanmoqda...</>
                : <><Navigation size={15} /> Joylashuvni yuborish</>}
            </button>
            {exactLocation && !exactLocation.loading && !exactLocation.error && (
              <div className="flex items-center gap-2 mt-3 p-2.5 rounded-xl" style={{ background: '#E1EFE6' }}>
                <CheckCircle2 size={14} color={C.safe} />
                <span style={{ fontSize: 11, color: C.safe, fontWeight: 600 }}>
                  Yuborildi: {exactLocation.lat.toFixed(5)}, {exactLocation.lng.toFixed(5)} (~{Math.round(exactLocation.accuracy)} m)
                </span>
              </div>
            )}
            {exactLocation?.error && (
              <div className="flex items-center gap-2 mt-3 p-2.5 rounded-xl" style={{ background: C.dangerSoft }}>
                <AlertTriangle size={14} color={C.danger} />
                <span style={{ fontSize: 11, color: C.danger }}>{exactLocation.error}</span>
              </div>
            )}
          </div>
        </div>

        <button onClick={finishSos} className="w-full mt-6 py-3 rounded-xl"
          style={{ background: C.sand, color: C.ink, fontWeight: 600, fontSize: 14 }}>
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pb-10">
      <button onClick={() => setSosScreen(false)} className="flex items-center gap-1 mb-4" style={{ color: C.inkSoft, fontSize: 13, fontWeight: 600 }}>
        <ArrowLeft size={16} /> Bekor qilish
      </button>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={22} color={C.danger} />
        <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.danger }}>SOS — vaziyatni tanlang</h2>
      </div>
      <p style={{ fontSize: 13, color: C.inkSoft, marginBottom: 16 }}>
        Yordam tezroq yetib borishi uchun favqulodda holat turini ko'rsating.
      </p>
      <div className="flex flex-col gap-2">
        {SOS_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const active = category === cat.key;
          return (
            <button key={cat.key} onClick={() => setCategory(cat.key)}
              className="flex items-center gap-3 p-3 rounded-xl text-left"
              style={{ background: active ? C.dangerSoft : C.panel, border: `1.5px solid ${active ? C.danger : C.line}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: active ? C.danger : C.tealSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color={active ? '#fff' : C.teal} />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>{cat.desc}</div>
              </div>
              {active && <CheckCircle2 size={18} color={C.danger} />}
            </button>
          );
        })}
      </div>
      <div className="mt-4">
        <Field label="Qo'shimcha izoh (ixtiyoriy)">
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Qisqacha tushuntiring..." rows={3}
            style={{ ...inputStyle, resize: 'none' }} />
        </Field>
      </div>
      <button disabled={!category}
        onClick={() => { const cat = SOS_CATEGORIES.find((c) => c.key === category); triggerSos(cat.label, note); setStep('sent'); }}
        className="w-full mt-2 py-4 rounded-2xl flex items-center justify-center gap-2"
        style={{ background: category ? C.danger : C.sand, color: category ? '#fff' : C.inkSoft, fontWeight: 700, fontSize: 16 }}>
        <AlertTriangle size={20} /> SOS yuborish
      </button>
    </div>
  );
}
