import { Shield, ArrowLeft, Users, LogOut } from 'lucide-react';
import { C, display } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';

export default function TopBar() {
  const { stage, setStage, logout } = useApp();
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3">
      <div className="flex items-center gap-2">
        <Shield size={22} color={C.teal} />
        <span style={{ ...display, fontSize: 19, fontWeight: 700, color: C.teal, letterSpacing: 0.3 }}>
          XAVFSIZ MIGRANT
        </span>
      </div>
      {stage !== 'auth' && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStage(stage === 'admin' ? 'app' : 'admin')}
            className="flex items-center gap-1 px-3 py-1 rounded-full"
            style={{ background: C.tealSoft, color: C.teal, fontSize: 12, fontWeight: 600 }}
          >
            {stage === 'admin' ? <><ArrowLeft size={14} /> Ilovaga</> : <><Users size={14} /> Admin</>}
          </button>
          {stage === 'app' && (
            <button
              onClick={logout}
              className="flex items-center gap-1 px-3 py-1 rounded-full"
              style={{ background: C.sand, color: C.ink, fontSize: 12, fontWeight: 600 }}
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
