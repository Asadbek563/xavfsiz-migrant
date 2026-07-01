import { Shield, MapPin, Briefcase, LayoutDashboard, Newspaper, MessageCircle, Landmark } from 'lucide-react';
import { C } from '../../constants/colors.js';
import { useApp } from '../../context/AppContext.jsx';

const ITEMS = [
  { key: 'home',     label: "Bosh sahifa", icon: Shield          },
  { key: 'location', label: "Joylashuv",   icon: MapPin          },
  { key: 'jobs',     label: "Ish",         icon: Briefcase       },
  { key: 'kabinet',  label: "Kabinet",     icon: LayoutDashboard },
  { key: 'news',     label: "Yangilik",    icon: Newspaper       },
];

export default function BottomNav() {
  const { tab, setTab } = useApp();
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center">
      <div className="flex justify-between mx-auto mb-4 px-2 py-2 rounded-2xl"
        style={{ width: 'calc(100% - 40px)', maxWidth: 460, background: C.panel, border: `1px solid ${C.line}`, boxShadow: '0 8px 24px rgba(15,61,62,0.08)' }}>
        {ITEMS.map(({ key, label, icon: Icon }) => {
          const active = tab === key;
          return (
            <button key={key} onClick={() => setTab(key)}
              className="flex-1 flex flex-col items-center gap-1 py-1 rounded-xl"
              style={{ background: active ? C.tealSoft : 'transparent' }}>
              <Icon size={18} color={active ? C.teal : C.inkSoft} />
              <span style={{ fontSize: 10, fontWeight: 600, color: active ? C.teal : C.inkSoft }}>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
