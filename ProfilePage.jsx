import { useMemo } from 'react';
import {
  LayoutDashboard, MapPin, FileText, Globe, Landmark, Receipt, History,
  FileSignature, Award, Star, Plus, X, Upload, Trash2, Phone, MessageCircle, ChevronRight,
} from 'lucide-react';
import { C, display, inputStyle } from '../constants/colors.js';
import { CONSULATES, INTL_ORGS, HOURS } from '../constants/data.js';
import { pensionInfoFor } from '../utils/helpers.js';
import { useApp } from '../context/AppContext.jsx';
import Field from '../components/ui/Field.jsx';
import Empty from '../components/ui/Empty.jsx';
import Row from '../components/ui/Row.jsx';
import QrBlock from '../components/ui/QrBlock.jsx';

function KabinetMini({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div className="rounded-xl p-3" style={{ background: bg, border: `1px solid ${color}33` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} color={color} />
        <span style={{ fontSize: 10, fontWeight: 700, color: C.inkSoft, letterSpacing: 0.3 }}>{label.toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</div>
      <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

export default function ProfilePage() {
  const {
    me, now, jobs, setTab,
    documents, docForm, setDocForm, showDocForm, setShowDocForm, addDocument, removeDocument,
    contracts, contractForm, setContractForm, showContractForm, setShowContractForm, addContract, removeContract,
  } = useApp();

  const consulate = CONSULATES[me.country];
  const pension   = useMemo(() => pensionInfoFor(me), [me.id]);
  const sosHistory = me.sosHistory || [];

  const employerRatings = useMemo(() => {
    const map = {};
    jobs.forEach((j) => {
      if (!map[j.postedBy]) map[j.postedBy] = { count: 0, verified: 0 };
      map[j.postedBy].count += 1;
      if (j.verified) map[j.postedBy].verified += 1;
    });
    return Object.entries(map)
      .map(([name, v]) => ({ name, count: v.count, rating: Math.max(1, Math.round((v.verified / v.count) * 5 * 10) / 10) }))
      .sort((a, b) => b.rating - a.rating || b.count - a.count);
  }, [jobs]);

  function handleFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setDocForm({ ...docForm, fileName: f.name, fileUrl: URL.createObjectURL(f) });
  }

  return (
    <div>
      <div className="flex items-center gap-2" style={{ margin: '8px 0 2px' }}>
        <LayoutDashboard size={20} color={C.teal} />
        <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal }}>Rasmiy Migrant Kabineti</h2>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 16 }}>
        Barcha rasmiy ma'lumotlaringiz bitta sahifada — yagona shaxsiy kabinet.
      </p>

      {/* ID + QR card */}
      <div className="rounded-2xl p-6 flex flex-col items-center mb-3" style={{ background: C.teal, color: '#fff' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, opacity: 0.8 }}>XAVFSIZ MIGRANT ID</div>
        <div style={{ ...display, fontSize: 26, fontWeight: 800, marginTop: 4 }}>{me.id}</div>
        <div style={{ fontSize: 14, marginTop: 2 }}>{me.name}</div>
        <div className="mt-4"><QrBlock seed={me.id} /></div>
        <div style={{ fontSize: 11, opacity: 0.75, marginTop: 8, textAlign: 'center' }}>Favqulodda holatda shu kodni konsullik xodimiga ko'rsating</div>
      </div>

      <div className="rounded-xl p-4 mb-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
        <Row icon={Phone} label="Telefon" value={me.phone} />
        <Row icon={MapPin} label="Joylashuv" value={`${me.city}, ${me.country}`} />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <button onClick={() => setTab('pension')} className="rounded-xl p-3 flex items-center gap-2" style={{ background: C.tealSoft, border: `1px solid ${C.teal}33`, textAlign: 'left' }}>
          <Landmark size={18} color={C.teal} />
          <div className="flex-1">
            <div style={{ fontSize: 12, fontWeight: 700, color: C.teal }}>Pensiya / Soliq</div>
          </div>
          <ChevronRight size={16} color={C.teal} />
        </button>
        <button onClick={() => setTab('chat')} className="rounded-xl p-3 flex items-center gap-2" style={{ background: C.goldSoft, border: `1px solid ${C.gold}33`, textAlign: 'left' }}>
          <MessageCircle size={18} color={C.gold} />
          <div className="flex-1">
            <div style={{ fontSize: 12, fontWeight: 700, color: C.gold }}>Yordamchi (Chat)</div>
          </div>
          <ChevronRight size={16} color={C.gold} />
        </button>
      </div>

      {/* Work documents + Consulate status */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <KabinetMini icon={FileText} label="Ish hujjatlari" value={`${documents.length} ta`} sub={documents.length > 0 ? 'Tekshirilmoqda' : 'Joylanmagan'} color={documents.length > 0 ? C.warn : C.inkSoft} bg={documents.length > 0 ? C.warnSoft : C.bg} />
        <KabinetMini icon={Globe} label="Konsullik holati" value="Bog'langan" sub={consulate ? (consulate.name.split('(')[1]?.replace(')', '') || me.country) : me.country} color={C.safe} bg={C.safeSoft} />
      </div>

      {/* Pension & tax */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <KabinetMini icon={Landmark} label="Pensiya va staj" value={`${pension.years} yil ${pension.months} oy`} sub={`Jamg'arma: ${pension.fundStatus}`} color={C.teal} bg={C.tealSoft} />
        <KabinetMini
          icon={Receipt}
          label="Soliq / ijtimoiy to'lov"
          value={pension.taxStatus}
          sub={`Oxirgi to'lov: ${pension.lastPayment}`}
          color={pension.taxStatus.startsWith("To'liq") ? C.safe : C.warn}
          bg={pension.taxStatus.startsWith("To'liq") ? C.safeSoft : C.warnSoft}
        />
      </div>

      {/* SOS history */}
      <div className="flex items-center gap-2 mb-2">
        <History size={16} color={C.teal} />
        <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: C.teal }}>SOS tarixi</h3>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        {sosHistory.length === 0 && <Empty text="SOS xabarlari hali yuborilmagan." />}
        {sosHistory.map((s, i) => (
          <div key={i} className="rounded-xl p-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between">
              <span style={{ fontWeight: 700, fontSize: 13, color: C.danger }}>{s.category || 'Favqulodda holat'}</span>
              <span style={{ fontSize: 11, color: C.inkSoft }}>{Math.floor((now - s.time) / HOURS)} soat oldin</span>
            </div>
            {s.note && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2, fontStyle: 'italic' }}>"{s.note}"</div>}
          </div>
        ))}
      </div>

      {/* Work contracts */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <FileSignature size={16} color={C.teal} />
          <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: C.teal }}>Ish shartnomalari</h3>
        </div>
        <button onClick={() => setShowContractForm((s) => !s)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: C.teal, color: '#fff', fontSize: 12, fontWeight: 600 }}>
          {showContractForm ? <><X size={14} /> Yopish</> : <><Plus size={14} /> Shartnoma</>}
        </button>
      </div>

      {showContractForm && (
        <div className="rounded-2xl p-4 mb-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
          <Field label="Ish beruvchi">
            <input value={contractForm.employer} onChange={(e) => setContractForm({ ...contractForm, employer: e.target.value })} style={inputStyle} placeholder="Korxona nomi" />
          </Field>
          <Field label="Lavozim">
            <input value={contractForm.position} onChange={(e) => setContractForm({ ...contractForm, position: e.target.value })} style={inputStyle} placeholder="Masalan: Qurilish ishchisi" />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Boshlanish sanasi">
              <input type="date" value={contractForm.startDate} onChange={(e) => setContractForm({ ...contractForm, startDate: e.target.value })} style={inputStyle} />
            </Field>
            <Field label="Tugash sanasi">
              <input type="date" value={contractForm.endDate} onChange={(e) => setContractForm({ ...contractForm, endDate: e.target.value })} style={inputStyle} />
            </Field>
          </div>
          <button onClick={addContract} className="w-full py-2.5 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 13 }}>
            Saqlash
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-5">
        {contracts.length === 0 && <Empty text="Hali shartnoma qo'shilmagan." />}
        {contracts.map((c) => {
          const active = c.endDate ? new Date(c.endDate) >= new Date(now) : true;
          return (
            <div key={c.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: C.tealSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FileSignature size={17} color={C.teal} />
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 700, fontSize: 13 }}>{c.position}</div>
                <div style={{ fontSize: 12, color: C.inkSoft }}>{c.employer}</div>
                {(c.startDate || c.endDate) && (
                  <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 1 }}>{c.startDate || '?'} – {c.endDate || 'hozirgacha'}</div>
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? C.safe : C.inkSoft, background: active ? C.safeSoft : C.sand, padding: '2px 8px', borderRadius: 99 }}>
                {active ? 'Faol' : 'Tugagan'}
              </span>
              <button onClick={() => removeContract(c.id)} style={{ color: C.inkSoft }}>
                <Trash2 size={15} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Employer ratings */}
      <div className="flex items-center gap-2 mb-2">
        <Award size={16} color={C.teal} />
        <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: C.teal }}>Ish beruvchi reytingi</h3>
      </div>
      <div className="flex flex-col gap-2 mb-5">
        {employerRatings.length === 0 && <Empty text="Hali ish beruvchilar ma'lumoti yo'q." />}
        {employerRatings.map((e) => (
          <div key={e.name} className="rounded-xl p-3 flex items-center justify-between" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{e.name}</div>
              <div style={{ fontSize: 11, color: C.inkSoft }}>{e.count} ta e'lon</div>
            </div>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={13} color={C.gold} fill={n <= Math.round(e.rating) ? C.gold : 'none'} />
              ))}
              <span style={{ fontSize: 11, color: C.inkSoft, marginLeft: 4 }}>{e.rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Work documents (upload) */}
      <div className="flex items-center justify-between mt-2 mb-2">
        <div className="flex items-center gap-2">
          <FileText size={16} color={C.teal} />
          <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: C.teal }}>Hujjatlar</h3>
        </div>
        <button onClick={() => setShowDocForm((s) => !s)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: C.teal, color: '#fff', fontSize: 12, fontWeight: 600 }}>
          {showDocForm ? <><X size={14} /> Yopish</> : <><Plus size={14} /> Ma'lumotnoma</>}
        </button>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginTop: -4, marginBottom: 12 }}>
        Norasmiy ish joyingizdan olingan ma'lumotnomani shu yerga joylang.
      </p>

      {showDocForm && (
        <div className="rounded-2xl p-4 mb-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
          <Field label="Ish beruvchi / korxona nomi">
            <input value={docForm.employer} onChange={(e) => setDocForm({ ...docForm, employer: e.target.value })} style={inputStyle} placeholder="Masalan: «Stroy-Plus» brigadasi" />
          </Field>
          <Field label="Ish turi">
            <input value={docForm.jobType} onChange={(e) => setDocForm({ ...docForm, jobType: e.target.value })} style={inputStyle} placeholder="Masalan: Qurilish ishchisi" />
          </Field>
          <Field label="Sana">
            <input type="date" value={docForm.date} onChange={(e) => setDocForm({ ...docForm, date: e.target.value })} style={inputStyle} />
          </Field>
          <Field label="Ma'lumotnoma fayli (rasm yoki skan)">
            <label className="flex items-center justify-center gap-2 w-full py-3 rounded-xl"
              style={{ border: `1.5px dashed ${C.line}`, background: '#FCFAF5', fontSize: 13, color: C.inkSoft, cursor: 'pointer' }}>
              <Upload size={16} />
              {docForm.fileName ? docForm.fileName : 'Fayl tanlash'}
              <input type="file" accept="image/*,.pdf" onChange={handleFile} style={{ display: 'none' }} />
            </label>
          </Field>
          <button onClick={addDocument} className="w-full py-2.5 rounded-xl mt-1" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 13 }}>
            Saqlash
          </button>
        </div>
      )}

      <div className="flex flex-col gap-2 mb-5">
        {documents.length === 0 && <Empty text="Hali hujjat joylanmagan." />}
        {documents.map((d) => (
          <div key={d.id} className="rounded-xl p-3 flex items-center gap-3" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            {d.fileUrl ? (
              <img src={d.fileUrl} alt={d.fileName} style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover', border: `1px solid ${C.line}` }} />
            ) : (
              <div style={{ width: 44, height: 44, borderRadius: 8, background: C.tealSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} color={C.teal} />
              </div>
            )}
            <div className="flex-1">
              <div style={{ fontWeight: 700, fontSize: 13 }}>{d.jobType}</div>
              <div style={{ fontSize: 12, color: C.inkSoft }}>{d.employer} · {d.date}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: C.warn, background: C.warnSoft, padding: '2px 8px', borderRadius: 99 }}>Tekshirilmoqda</span>
            <button onClick={() => removeDocument(d.id)} style={{ color: C.inkSoft }}>
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>

      {/* International organizations */}
      <div className="flex items-center gap-2 mb-2">
        <Globe size={16} color={C.teal} />
        <h3 style={{ ...display, fontSize: 17, fontWeight: 700, color: C.teal }}>Xalqaro tashkilotlarga murojaat</h3>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 12 }}>
        Mehnat huquqlari buzilgan yoki yordam kerak bo'lsa, quyidagi xalqaro tashkilotlarga murojaat qilishingiz mumkin.
      </p>
      <div className="flex flex-col gap-2">
        {INTL_ORGS.map((org, i) => (
          <div key={i} className="rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div className="flex items-start gap-2">
              <Globe size={16} color={C.teal} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>{org.name}</div>
                <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 1 }}>{org.desc}</div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-3">
              <a href={`tel:${org.phone.replace(/\s/g, '')}`} className="flex items-center gap-2" style={{ color: C.teal, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                <Phone size={13} /> {org.phone}
              </a>
              <a href={org.site} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" style={{ color: C.teal, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                <Globe size={13} /> {org.site.replace('https://', '')}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
