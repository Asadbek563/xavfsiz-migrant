import { MapPin, AlertTriangle, Phone, FileText, Clock, Globe } from 'lucide-react';
import { C, display, inputStyle } from '../constants/colors.js';
import { COUNTRIES, CONSULATES } from '../constants/data.js';
import { useApp } from '../context/AppContext.jsx';
import Field from '../components/ui/Field.jsx';

export default function LocationPage() {
  const { me, updateLocation } = useApp();
  const consulate = CONSULATES[me.country];

  return (
    <div>
      <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal, margin: '8px 0 4px' }}>Joylashuv</h2>
      <p style={{ fontSize: 13, color: C.inkSoft, marginBottom: 16 }}>Bu ma'lumot faqat favqulodda yordam ko'rsatish uchun ishlatiladi.</p>

      <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
        <Field label="Davlat">
          <select value={me.country} onChange={(e) => updateLocation(e.target.value, COUNTRIES[e.target.value][0])} style={inputStyle}>
            {Object.keys(COUNTRIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Shahar">
          <select value={me.city} onChange={(e) => updateLocation(me.country, e.target.value)} style={inputStyle}>
            {COUNTRIES[me.country].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
        <div className="flex items-center gap-2 mt-3 p-3 rounded-xl" style={{ background: C.tealSoft }}>
          <MapPin size={16} color={C.teal} />
          <span style={{ fontSize: 13, color: C.teal, fontWeight: 600 }}>{me.city}, {me.country}</span>
        </div>
      </div>

      {consulate && (
        <div className="mt-5">
          <h3 style={{ ...display, fontSize: 18, fontWeight: 700, color: C.teal, marginBottom: 10 }}>
            O'zbekiston konsulligi bilan bog'lanish
          </h3>
          <div className="rounded-2xl p-5" style={{ background: C.teal, color: '#fff' }}>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{consulate.name}</div>
            <div className="flex items-start gap-2 mb-3">
              <MapPin size={15} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontSize: 13, opacity: 0.9 }}>{consulate.address}</span>
            </div>
            <a href={`tel:${consulate.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 mb-2" style={{ color: '#fff', textDecoration: 'none' }}>
              <Phone size={15} /><span style={{ fontSize: 13 }}>Qabulxona: {consulate.phone}</span>
            </a>
            <a href={`tel:${consulate.emergencyPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 mb-2" style={{ color: '#fff', textDecoration: 'none' }}>
              <AlertTriangle size={15} /><span style={{ fontSize: 13, fontWeight: 700 }}>Favqulodda: {consulate.emergencyPhone}</span>
            </a>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={15} /><span style={{ fontSize: 13, opacity: 0.9 }}>{consulate.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} /><span style={{ fontSize: 13, opacity: 0.9 }}>{consulate.hours}</span>
            </div>
            <a href={`tel:${consulate.emergencyPhone.replace(/\s/g, '')}`}
              className="flex items-center justify-center gap-2 mt-4 py-3 rounded-xl"
              style={{ background: '#fff', color: C.teal, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              <Phone size={16} /> Hoziroq qo'ng'iroq qilish
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
