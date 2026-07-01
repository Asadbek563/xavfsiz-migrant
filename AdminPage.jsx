import { useMemo, useState } from 'react';
import {
  Users, Radio, AlertTriangle, Briefcase, Newspaper, Trash2, ShieldCheck, AlertCircle,
} from 'lucide-react';
import { C, display } from '../constants/colors.js';
import { HOURS, ARTICLE_TAGS } from '../constants/data.js';
import { getStatusInfo } from '../utils/helpers.js';
import { useApp } from '../context/AppContext.jsx';
import AdminUserRow from '../components/admin/AdminUserRow.jsx';
import Empty from '../components/ui/Empty.jsx';

function tagStyleFor(tag) {
  return ARTICLE_TAGS.find((t) => t.key === tag) || { color: C.inkSoft, bg: C.sand };
}

export default function AdminPage() {
  const {
    users, jobs, now, removeJob, toggleJobVerified,
    articles, approveArticle, rejectArticle,
  } = useApp();
  const [section, setSection] = useState('users');

  const enriched = useMemo(() => users.map((u) => {
    const hoursSince = (now - u.lastCheckIn) / HOURS;
    return { ...u, hoursSince, status: getStatusInfo(hoursSince) };
  }), [users, now]);

  const sosList = enriched.filter((u) => u.sosHistory && u.sosHistory.length > 0);
  const lostList = enriched.filter((u) => u.status.key === 'lost' || u.status.key === 'critical');
  const pendingArticles = (articles || []).filter((a) => a.status === 'pending');

  const sections = [
    { key: 'users',    label: 'Foydalanuvchilar',   icon: Users,        count: enriched.length },
    { key: 'sos',      label: 'SOS xabarlari',      icon: Radio,        count: sosList.length },
    { key: 'lost',     label: 'Aloqa uzilganlar',   icon: AlertTriangle,count: lostList.length },
    { key: 'jobs',     label: "Ish e'lonlari",      icon: Briefcase,    count: jobs.length },
    { key: 'articles', label: 'Maqolalar',          icon: Newspaper,    count: pendingArticles.length },
  ];

  return (
    <div className="px-5 pb-10">
      <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal, margin: '4px 0 14px' }}>Administrator paneli</h2>

      <div className="flex gap-2 mb-5 overflow-x-auto">
        {sections.map((s) => {
          const Icon = s.icon;
          const active = section === s.key;
          return (
            <button key={s.key} onClick={() => setSection(s.key)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full"
              style={{ background: active ? C.teal : C.panel, color: active ? '#fff' : C.ink, border: `1px solid ${active ? C.teal : C.line}`, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>
              <Icon size={13} /> {s.label}
              <span style={{ background: active ? 'rgba(255,255,255,0.25)' : C.sand, padding: '1px 6px', borderRadius: 99, fontSize: 11 }}>{s.count}</span>
            </button>
          );
        })}
      </div>

      {section === 'users' && (
        <div className="flex flex-col gap-2">
          {enriched.map((u) => <AdminUserRow key={u.id} u={u} />)}
        </div>
      )}

      {section === 'sos' && (
        <div className="flex flex-col gap-2">
          {sosList.length === 0 && <Empty text="Hozircha SOS xabarlari yo'q." />}
          {sosList.map((u) => {
            const latest = u.sosHistory[0];
            return (
              <div key={u.id} className="rounded-xl p-4" style={{ background: '#F0D8CF', border: `1px solid #8C2F1B55` }}>
                <div className="flex items-center justify-between">
                  <div style={{ fontWeight: 700 }}>{u.name}</div>
                  <span style={{ fontSize: 11, color: '#8C2F1B', fontWeight: 700 }}>{Math.floor((now - latest.time) / HOURS)} soat oldin</span>
                </div>
                <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{u.phone} · {u.id}</div>
                {latest.category && <div style={{ fontSize: 12, color: '#8C2F1B', marginTop: 4, fontWeight: 700 }}>{latest.category}</div>}
                {latest.note && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2, fontStyle: 'italic' }}>"{latest.note}"</div>}
                <div style={{ fontSize: 12, color: '#8C2F1B', marginTop: 4, fontWeight: 600 }}>GPS: {latest.lat}, {latest.lng} ({u.city}, {u.country})</div>
                {u.sosHistory.length > 1 && <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 4 }}>+{u.sosHistory.length - 1} oldingi SOS xabari</div>}
              </div>
            );
          })}
        </div>
      )}

      {section === 'lost' && (
        <div className="flex flex-col gap-2">
          {lostList.length === 0 && <Empty text="Barcha foydalanuvchilar aloqada." />}
          {lostList.map((u) => <AdminUserRow key={u.id} u={u} />)}
        </div>
      )}

      {section === 'jobs' && (
        <div className="flex flex-col gap-2">
          {jobs.map((j) => (
            <div key={j.id} className="rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="flex items-start justify-between">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{j.title}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{j.location} · {j.postedBy}</div>
                </div>
                <button onClick={() => removeJob(j.id)} style={{ color: C.danger }}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                {j.verified ? (
                  <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 700, color: C.safe, background: C.safeSoft, padding: '3px 8px', borderRadius: 99 }}>
                    <ShieldCheck size={12} /> Tasdiqlangan
                  </span>
                ) : (
                  <span className="flex items-center gap-1" style={{ fontSize: 11, fontWeight: 700, color: C.warn, background: C.warnSoft, padding: '3px 8px', borderRadius: 99 }}>
                    <AlertCircle size={12} /> Tasdiqlanmagan
                  </span>
                )}
                <button onClick={() => toggleJobVerified(j.id)} className="px-3 py-1.5 rounded-full"
                  style={{ background: j.verified ? C.dangerSoft : C.safeSoft, color: j.verified ? C.danger : C.safe, fontSize: 11, fontWeight: 700 }}>
                  {j.verified ? 'Tasdiqni bekor qilish' : 'Tasdiqlash'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {section === 'articles' && (
        <div className="flex flex-col gap-2">
          {(articles || []).length === 0 && <Empty text="Hali maqolalar topshirilmagan." />}
          {(articles || []).map((a) => {
            const ts = tagStyleFor(a.tag);
            const statusLabel = a.status === 'approved' ? 'Tasdiqlangan' : a.status === 'rejected' ? 'Rad etilgan' : 'Kutilmoqda';
            const statusColor = a.status === 'approved' ? C.safe : a.status === 'rejected' ? C.danger : C.warn;
            const statusBg    = a.status === 'approved' ? C.safeSoft : a.status === 'rejected' ? C.dangerSoft : C.warnSoft;
            return (
              <div key={a.id} className="rounded-xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 10, fontWeight: 700, color: ts.color, background: ts.bg, padding: '2px 9px', borderRadius: 99 }}>{a.tag.toUpperCase()}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: statusColor, background: statusBg, padding: '2px 9px', borderRadius: 99 }}>{statusLabel}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 4, lineHeight: 1.4 }}>{a.content}</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 6 }}>{a.author} · {a.city}, {a.country} · {a.date}</div>
                {a.status === 'pending' && (
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => approveArticle(a.id)} className="flex-1 py-2 rounded-xl" style={{ background: C.safe, color: '#fff', fontSize: 12, fontWeight: 700 }}>
                      Tasdiqlash
                    </button>
                    <button onClick={() => rejectArticle(a.id)} className="flex-1 py-2 rounded-xl" style={{ background: C.dangerSoft, color: C.danger, fontSize: 12, fontWeight: 700 }}>
                      Rad etish
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
