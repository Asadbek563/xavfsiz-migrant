import { C, inputStyle } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import Field from '../../components/ui/Field.jsx';
import AuthMsg from '../../components/ui/AuthMsg.jsx';

export default function ForgotResetView() {
  const { resetForm, setResetForm, authError, submitReset } = useApp();
  return (
    <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: C.gold, marginBottom: 10, letterSpacing: 0.4 }}>YANGI PAROL O'RNATISH</div>
      <AuthMsg authError={authError} />
      <Field label="Yangi parol">
        <input type="password" value={resetForm.password} onChange={(e) => setResetForm({ ...resetForm, password: e.target.value })} placeholder="Kamida 4 belgi" style={inputStyle} />
      </Field>
      <Field label="Yangi parolni tasdiqlang">
        <input type="password" value={resetForm.confirm} onChange={(e) => setResetForm({ ...resetForm, confirm: e.target.value })} placeholder="Parolni qayta kiriting" style={inputStyle} />
      </Field>
      <button onClick={submitReset} className="w-full mt-2 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 15 }}>
        Parolni yangilash
      </button>
    </div>
  );
}
