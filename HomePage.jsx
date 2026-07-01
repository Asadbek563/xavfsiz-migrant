import { AlertTriangle, CheckCircle2, Clock, Radio } from 'lucide-react';
import { C, display } from '../constants/colors.js';
import { COUNTRIES, CITY_INFO, HOURS } from '../constants/data.js';
import { getStatusInfo } from '../utils/helpers.js';
import { useApp } from '../context/AppContext.jsx';

export default function HomePage() {
  const { me, now, checkIn, setSosScreen, sosBanner } = useApp();
  const hoursSince = (now - me.lastCheckIn) / HOURS;
  const status = getStatusInfo(hoursSince);
  const StatusIcon = status.icon;
  const pulsing = status.key === 'lost' || status.key === 'critical';

  return (
    <div>
      {sosBanner && (
        <div className="rounded-xl px-4 py-3 mb-4 flex items-center gap-2" style={{ background: '#F0D8CF', color: '#8C2F1B', border: '1px solid #8C2F1B' }}>
          <Radio size={18} />
          <div style={{ fontSize: 13, fontWeight: 600 }}>SOS yuborildi. Joylashuvingiz va xabar administratorga jo'natildi.</div>
        </div>
      )}

      <p style={{ fontSize: 13, color: C.inkSoft, marginTop: 4 }}>Xush kelibsiz,</p>
      <h2 style={{ ...display, fontSize: 24, fontWeight: 700, color: C.teal, marginBottom: 18 }}>{me.name}</h2>

      <div className="rounded-2xl p-6 flex flex-col items-center" style={{ background: status.soft, border: `1px solid ${status.color}33` }}>
        <div className={pulsing ? 'pulse' : ''} style={{ width: 96, height: 96, borderRadius: '50%', border: `4px solid ${status.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
          <StatusIcon size={36} color={status.color} />
        </div>
        <div style={{ ...display, fontSize: 19, fontWeight: 700, color: status.color, marginTop: 14 }}>{status.label}</div>
        <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>Oxirgi tasdiq: {Math.floor(hoursSince)} soat oldin</div>
        <button onClick={checkIn} className="w-full mt-5 py-3 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 14 }}>
          Ha, hammasi joyida
        </button>
      </div>

      <button onClick={() => setSosScreen(true)} className="w-full mt-4 py-4 rounded-2xl flex items-center justify-center gap-2"
        style={{ background: C.danger, color: '#fff', fontWeight: 700, fontSize: 16 }}>
        <AlertTriangle size={20} /> SOS — Yordam kerak
      </button>

      <h3 style={{ ...display, fontSize: 18, fontWeight: 700, color: C.teal, margin: '20px 0 10px' }}>
        Xavfsiz shaharlar — {me.country}
      </h3>
      <p style={{ fontSize: 12, color: C.inkSoft, marginTop: -6, marginBottom: 12 }}>
        Bugungi holat: ish uchun xavfsizmi, favqulodda vaziyat va ob-havo
      </p>
      <div className="flex flex-col gap-2">
        {COUNTRIES[me.country].map((city) => {
          const info = CITY_INFO[city];
          if (!info) return null;
          const WIcon = info.icon;
          const isMine = city === me.city;
          return (
            <div key={city} className="rounded-xl p-3" style={{ background: info.safe ? C.panel : C.dangerSoft, border: `1px solid ${isMine ? C.teal : C.line}` }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>{city}</span>
                  {isMine && <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: C.teal, padding: '1px 6px', borderRadius: 99 }}>Siz shu yerda</span>}
                </div>
                <div className="flex items-center gap-1" style={{ color: C.inkSoft, fontSize: 12 }}>
                  <WIcon size={14} /> {info.temp}°C · {info.condition}
                </div>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                {info.safe ? (
                  <><CheckCircle2 size={14} color={C.safe} /><span style={{ fontSize: 12, color: C.safe, fontWeight: 600 }}>Bugun ishlash mumkin, favqulodda holat yo'q</span></>
                ) : (
                  <><AlertTriangle size={14} color={C.danger} /><span style={{ fontSize: 12, color: C.danger, fontWeight: 600 }}>{info.emergency}</span></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
