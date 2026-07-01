import { MapPin, Plus, ShieldCheck, AlertCircle, Award, Star } from 'lucide-react';
import { useMemo } from 'react';
import { C, display, inputStyle } from '../constants/colors.js';
import { useApp } from '../context/AppContext.jsx';
import Field from '../components/ui/Field.jsx';
import Empty from '../components/ui/Empty.jsx';

export default function JobsPage() {
  const { jobs, jobForm, setJobForm, showJobForm, setShowJobForm, addJob } = useApp();

  const topPosters = useMemo(() => {
    const map = {};
    jobs.forEach((j) => {
      if (!map[j.postedBy]) map[j.postedBy] = { count: 0, verified: 0 };
      map[j.postedBy].count += 1;
      if (j.verified) map[j.postedBy].verified += 1;
    });
    return Object.entries(map)
      .sort((a, b) => b[1].verified - a[1].verified || b[1].count - a[1].count)
      .slice(0, 1)
      .map(([name]) => name);
  }, [jobs]);

  return (
    <div>
      <div className="flex items-center justify-between" style={{ margin: '8px 0 4px' }}>
        <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal }}>Ish e'lonlari</h2>
        <button onClick={() => setShowJobForm((s) => !s)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: C.teal, color: '#fff', fontSize: 12, fontWeight: 600 }}>
          <Plus size={14} /> E'lon
        </button>
      </div>
      <p style={{ fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>Migrantlar tomonidan joylashtirilgan e'lonlar — vositachilarsiz, to'g'ridan-to'g'ri.</p>

      {showJobForm && (
        <div className="rounded-2xl p-4 mb-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
          <Field label="Lavozim">
            <input value={jobForm.title} onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })} style={inputStyle} placeholder="Masalan: Qurilish ishchisi" />
          </Field>
          <Field label="Manzil">
            <input value={jobForm.location} onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })} style={inputStyle} placeholder="Shahar, davlat" />
          </Field>
          <Field label="Aloqa">
            <input value={jobForm.contact} onChange={(e) => setJobForm({ ...jobForm, contact: e.target.value })} style={inputStyle} placeholder="Telefon raqam" />
          </Field>
          <button onClick={addJob} className="w-full py-2.5 rounded-xl" style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 13 }}>
            Joylashtirish
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {jobs.length === 0 && <Empty text="Hali ish e'lonlari yo'q." />}
        {jobs.map((j) => {
          const isTop = topPosters.includes(j.postedBy);
          return (
            <div key={j.id} className="rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="flex items-start justify-between">
                <div style={{ fontWeight: 700, fontSize: 15, color: C.ink }}>{j.title}</div>
                <span style={{ fontSize: 11, color: C.inkSoft }}>{j.days === 0 ? 'hozir' : `${j.days} kun oldin`}</span>
              </div>
              <div className="flex items-center gap-1 mt-1" style={{ color: C.inkSoft, fontSize: 12 }}>
                <MapPin size={12} /> {j.location}
              </div>
              <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 12, color: C.inkSoft }}>E'lon: {j.postedBy}</span>
                  {isTop && (
                    <span className="flex items-center gap-0.5" style={{ fontSize: 10, fontWeight: 700, color: C.gold, background: C.goldSoft, padding: '1px 6px', borderRadius: 99 }}>
                      <Award size={10} /> Eng faol
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {j.verified ? (
                    <span className="flex items-center gap-1" style={{ fontSize: 10, fontWeight: 700, color: C.safe, background: C.safeSoft, padding: '2px 8px', borderRadius: 99 }}>
                      <ShieldCheck size={11} /> Tasdiqlangan
                    </span>
                  ) : (
                    <span className="flex items-center gap-1" style={{ fontSize: 10, fontWeight: 700, color: C.warn, background: C.warnSoft, padding: '2px 8px', borderRadius: 99 }}>
                      <AlertCircle size={11} /> Tasdiqlanmagan
                    </span>
                  )}
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>{j.contact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
