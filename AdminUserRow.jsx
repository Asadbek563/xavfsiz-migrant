import { C } from '../../constants/colors.js';

export default function AdminUserRow({ u }) {
  const Icon = u.status.icon;
  return (
    <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
      <div>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
        <div style={{ fontSize: 12, color: C.inkSoft }}>{u.id} · {u.city}, {u.country}</div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: u.status.soft, color: u.status.color }}>
        <Icon size={13} />
        <span style={{ fontSize: 11, fontWeight: 700 }}>{Math.floor(u.hoursSince)}s</span>
      </div>
    </div>
  );
}
