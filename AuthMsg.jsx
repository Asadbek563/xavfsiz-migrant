import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { C } from '../../constants/colors.js';

export default function AuthMsg({ authError, authNotice }) {
  if (!authError && !authNotice) return null;
  const isError = !!authError;
  return (
    <div className="rounded-xl px-3 py-2.5 mb-3 flex items-center gap-2"
      style={{ background: isError ? C.dangerSoft : C.safeSoft, color: isError ? C.danger : C.safe }}>
      {isError ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
      <span style={{ fontSize: 12, fontWeight: 600 }}>{authError || authNotice}</span>
    </div>
  );
}
