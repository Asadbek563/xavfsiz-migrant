// Standalone Register page — combines the two-step registration flow
// (registerInfo -> registerCreds) used inside AuthScreen.
import RegisterInfoView from './auth/RegisterInfoView.jsx';
import RegisterCredsView from './auth/RegisterCredsView.jsx';
import { useApp } from '../context/AppContext.jsx';

export default function RegisterPage() {
  const { authView } = useApp();
  return authView === 'registerCreds' ? <RegisterCredsView /> : <RegisterInfoView />;
}
