import { C, inputStyle } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import Field from '../../components/ui/Field.jsx';
import AuthMsg from '../../components/ui/AuthMsg.jsx';

export default function LoginView() {
  const { loginForm, setLoginForm, authError, authNotice, doLogin, goAuth } = useApp();
  return (
    <div className="rounded-2xl p-5" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <AuthMsg authError={authError} authNotice={authNotice} />
      <Field label="Login">
        <input value={loginForm.login} onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })} placeholder="Login" style={inputStyle} />
      </Field>
      <Field label="Parol">
        <input type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" style={inputStyle} />
      </Field>
      <button onClick={doLogin} className="w-full mt-2 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 15 }}>
        Kirish
      </button>
      <button onClick={() => goAuth('forgotPhone')} className="w-full mt-3" style={{ background: 'transparent', color: C.teal, fontWeight: 600, fontSize: 13, textAlign: 'center' }}>
        Parolni unutdingizmi?
      </button>
      <div className="mt-2 pt-3 flex items-center justify-center gap-1" style={{ borderTop: `1px solid ${C.line}`, fontSize: 13 }}>
        <span style={{ color: C.inkSoft }}>Hisobingiz yo'qmi?</span>
        <button onClick={() => goAuth('registerInfo')} style={{ background: 'transparent', color: C.teal, fontWeight: 700 }}>
          Ro'yxatdan o'tish
        </button>
      </div>
      <div className="mt-3 p-3 rounded-xl" style={{ background: C.tealSoft }}>
        <div style={{ fontSize: 11, color: C.teal, fontWeight: 600 }}>
          Namoyish uchun: login <b>dilshod90</b>, parol <b>demo123</b>
        </div>
      </div>
    </div>
  );
}
