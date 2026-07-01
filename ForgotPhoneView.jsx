import { ArrowLeft } from 'lucide-react';
import { C, inputStyle } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import Field from '../../components/ui/Field.jsx';
import AuthMsg from '../../components/ui/AuthMsg.jsx';

export default function ForgotPhoneView() {
  const { forgotForm, setForgotForm, authError, submitForgotPhone, goAuth } = useApp();
  return (
    <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 10, letterSpacing: 0.4 }}>PAROLNI TIKLASH</div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 12 }}>
        Ro'yxatdan o'tgan telefon raqamingiz va pasport seriyasini kiriting.
      </p>
      <AuthMsg authError={authError} />
      <Field label="Telefon raqam">
        <input value={forgotForm.phone} onChange={(e) => setForgotForm({ ...forgotForm, phone: e.target.value })} placeholder="+998 90 123 45 67" style={inputStyle} />
      </Field>
      <Field label="Pasport seriyasi">
        <input value={forgotForm.passport} onChange={(e) => setForgotForm({ ...forgotForm, passport: e.target.value })} placeholder="AB1234567" style={inputStyle} />
      </Field>
      <button onClick={submitForgotPhone} className="w-full mt-2 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 15 }}>
        Tasdiqlash
      </button>
      <button onClick={() => goAuth('login')} className="w-full mt-3 flex items-center justify-center gap-1" style={{ background: 'transparent', color: C.inkSoft, fontWeight: 600, fontSize: 13 }}>
        <ArrowLeft size={14} /> Kirishga qaytish
      </button>
    </div>
  );
}
