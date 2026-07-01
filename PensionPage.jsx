import { Landmark, Receipt, ArrowLeft } from 'lucide-react';
import { C, display } from '../constants/colors.js';
import { useApp } from '../context/AppContext.jsx';
import { pensionInfoFor } from '../utils/helpers.js';
import { useMemo } from 'react';

function MiniCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div className="rounded-xl p-3" style={{ background: bg, border: `1px solid ${color}33` }}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={13} color={color} />
        <span style={{ fontSize: 10, fontWeight: 700, color: C.inkSoft, letterSpacing: 0.3 }}>{label.toUpperCase()}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{value}</div>
      <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 1 }}>{sub}</div>
    </div>
  );
}

export default function PensionPage() {
  const { me, setTab } = useApp();
  const pension = useMemo(() => pensionInfoFor(me), [me.id]);

  return (
    <div>
      <button onClick={() => setTab('kabinet')} className="flex items-center gap-1 mb-3" style={{ color: C.inkSoft, fontSize: 13, fontWeight: 600 }}>
        <ArrowLeft size={16} /> Kabinetga qaytish
      </button>
      <div className="flex items-center gap-2" style={{ margin: '8px 0 2px' }}>
        <Landmark size={20} color={C.teal} />
        <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal }}>Pensiya va soliq</h2>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 16 }}>
        Rasmiy pensiya jamg'armasi va soliq/ijtimoiy to'lovlar holati.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <MiniCard icon={Landmark} label="Pensiya va staj" value={`${pension.years} yil ${pension.months} oy`} sub={`Jamg'arma: ${pension.fundStatus}`} color={C.teal} bg={C.tealSoft} />
        <MiniCard
          icon={Receipt}
          label="Soliq / ijtimoiy to'lov"
          value={pension.taxStatus}
          sub={`Oxirgi to'lov: ${pension.lastPayment}`}
          color={pension.taxStatus.startsWith("To'liq") ? C.safe : C.warn}
          bg={pension.taxStatus.startsWith("To'liq") ? C.safeSoft : C.warnSoft}
        />
      </div>

      <div className="rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
        <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.5 }}>
          Bu ma'lumotlar hozircha namoyish (demo) maqsadida hisoblangan. Kelajakda davlat soliq va pensiya
          fondi tizimlari bilan integratsiya qilinishi rejalashtirilgan.
        </div>
      </div>
    </div>
  );
}
