import { C } from '../../constants/colors.js';

export default function Field({ label, children }) {
  return (
    <div className="mb-3">
      <div style={{ fontSize: 12, fontWeight: 600, color: C.inkSoft, marginBottom: 4 }}>{label}</div>
      {children}
    </div>
  );
}
