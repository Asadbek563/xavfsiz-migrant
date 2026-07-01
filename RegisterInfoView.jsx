import { ArrowLeft } from 'lucide-react';
import { C, inputStyle } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import Field from '../../components/ui/Field.jsx';
import AuthMsg from '../../components/ui/AuthMsg.jsx';

export default function RegisterInfoView() {
  const { registerInfo, setRegisterInfo, authError, submitRegisterInfo, goAuth } = useApp();
  return (
    <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 10, letterSpacing: 0.4 }}>1-QADAM / 2 — SHAXSIY MA'LUMOT</div>
      <AuthMsg authError={authError} />
      <Field label="To'liq ism">
        <input value={registerInfo.name} onChange={(e) => setRegisterInfo({ ...registerInfo, name: e.target.value })} placeholder="Ism Familiya" style={inputStyle} />
      </Field>
      <Field label="Pasport seriyasi">
        <input value={registerInfo.passport} onChange={(e) => setRegisterInfo({ ...registerInfo, passport: e.target.value })} placeholder="AB1234567" style={inputStyle} />
      </Field>
      <Field label="Telefon raqam">
        <input value={registerInfo.phone} onChange={(e) => setRegisterInfo({ ...registerInfo, phone: e.target.value })} placeholder="+998 90 123 45 67" style={inputStyle} />
      </Field>
      <button onClick={submitRegisterInfo} className="w-full mt-2 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 15 }}>
        Davom etish
      </button>
      <button onClick={() => goAuth('login')} className="w-full mt-3 flex items-center justify-center gap-1" style={{ background: 'transparent', color: C.inkSoft, fontWeight: 600, fontSize: 13 }}>
        <ArrowLeft size={14} /> Kirishga qaytish
      </button>
    </div>
  );
}
