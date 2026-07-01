import { ArrowLeft } from 'lucide-react';
import { C, inputStyle } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import Field from '../../components/ui/Field.jsx';
import AuthMsg from '../../components/ui/AuthMsg.jsx';

export default function RegisterCredsView() {
  const { registerCreds, setRegisterCreds, authError, submitRegisterCreds, goAuth } = useApp();
  return (
    <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 10, letterSpacing: 0.4 }}>2-QADAM / 2 — LOGIN VA PAROL</div>
      <AuthMsg authError={authError} />
      <Field label="Login">
        <input value={registerCreds.login} onChange={(e) => setRegisterCreds({ ...registerCreds, login: e.target.value })} placeholder="Login o'ylab toping" style={inputStyle} />
      </Field>
      <Field label="Parol">
        <input type="password" value={registerCreds.password} onChange={(e) => setRegisterCreds({ ...registerCreds, password: e.target.value })} placeholder="Kamida 4 belgi" style={inputStyle} />
      </Field>
      <Field label="Parolni tasdiqlang">
        <input type="password" value={registerCreds.confirm} onChange={(e) => setRegisterCreds({ ...registerCreds, confirm: e.target.value })} placeholder="Parolni qayta kiriting" style={inputStyle} />
      </Field>
      <button onClick={submitRegisterCreds} className="w-full mt-2 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 15 }}>
        Ro'yxatdan o'tishni yakunlash
      </button>
      <button onClick={() => goAuth('registerInfo')} className="w-full mt-3 flex items-center justify-center gap-1" style={{ background: 'transparent', color: C.inkSoft, fontWeight: 600, fontSize: 13 }}>
        <ArrowLeft size={14} /> Orqaga
      </button>
    </div>
  );
}
