import { AppProvider, useApp } from './context/AppContext.jsx';
import { C, body } from './constants/colors.js';
import TopBar from './components/layout/TopBar.jsx';
import AuthScreen from './pages/auth/AuthScreen.jsx';
import UserAppShell from './pages/UserAppShell.jsx';
import AdminPage from './pages/AdminPage.jsx';

function AppInner() {
  const { stage, me } = useApp();

  return (
    <div style={{ ...body, background: C.bg, minHeight: '100vh', color: C.ink }}>
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <TopBar />

        {stage === 'auth' && <AuthScreen />}
        {stage === 'app' && me && <UserAppShell />}
        {stage === 'admin' && <AdminPage />}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
