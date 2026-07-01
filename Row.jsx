import { C } from '../../constants/colors.js';

export default function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.line}` }}>
      <div className="flex items-center gap-2" style={{ color: C.inkSoft, fontSize: 13 }}>
        <Icon size={14} /> {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
