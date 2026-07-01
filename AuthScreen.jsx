import { Shield } from 'lucide-react';
import { C, display } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';
import LoginView from './LoginView.jsx';
import RegisterInfoView from './RegisterInfoView.jsx';
import RegisterCredsView from './RegisterCredsView.jsx';
import ForgotPhoneView from './ForgotPhoneView.jsx';
import ForgotResetView from './ForgotResetView.jsx';

export default function AuthScreen() {
  const { authView } = useApp();
  return (
    <div className="px-5 pb-10">
      <div className="pt-2 pb-6">
        <div className="flex items-center gap-2 mb-2"><Shield size={26} color={C.teal} /></div>
        <h1 style={{ ...display, fontSize: 26, fontWeight: 800, color: C.teal, lineHeight: 1.15 }}>
          Xorijda ham,<br />nazoratda emas — xavfsizlikda.
        </h1>
        <p style={{ color: C.inkSoft, fontSize: 13, marginTop: 8 }}>
          Shaxsiy "Xavfsiz Migrant" kabinetingizga kiring yoki yangi hisob yarating.
        </p>
      </div>
      {authView === 'login'          && <LoginView />}
      {authView === 'registerInfo'   && <RegisterInfoView />}
      {authView === 'registerCreds'  && <RegisterCredsView />}
      {authView === 'forgotPhone'    && <ForgotPhoneView />}
      {authView === 'forgotReset'    && <ForgotResetView />}
      <p style={{ fontSize: 11, color: C.inkSoft, marginTop: 16, textAlign: 'center' }}>
        Bu — namoyish (MVP) versiyasi. Ma'lumotlar faqat shu sessiyada saqlanadi.
      </p>
    </div>
  );
}
