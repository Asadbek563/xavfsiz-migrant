import { C } from '../../constants/colors.js';

export default function QrBlock({ seed, size = 7 }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells = [];
  for (let i = 0; i < size * size; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push(h % 5 === 0 || h % 7 === 0);
  }
  return (
    <div className="grid"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 120, height: 120, background: '#fff', padding: 8, borderRadius: 8 }}>
      {cells.map((on, i) => (
        <div key={i} style={{ background: on ? C.ink : 'transparent' }} />
      ))}
    </div>
  );
}
