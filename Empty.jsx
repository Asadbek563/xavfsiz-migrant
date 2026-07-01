import { C } from '../../constants/colors.js';

export default function Empty({ text }) {
  return (
    <div className="rounded-xl p-6 text-center" style={{ background: C.panel, border: `1px dashed ${C.line}`, color: C.inkSoft, fontSize: 13 }}>
      {text}
    </div>
  );
}
