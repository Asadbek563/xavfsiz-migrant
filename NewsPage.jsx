import { useState } from 'react';
import { Newspaper, Clock, Edit3, ArrowLeft, Sparkles, Send, Loader2, User } from 'lucide-react';
import { C, display, inputStyle } from '../constants/colors.js';
import { NEWS_ITEMS, ARTICLE_TAGS } from '../constants/data.js';
import { useApp } from '../context/AppContext.jsx';
import Field from '../components/ui/Field.jsx';
import { generateArticle } from '../services/aiService.js';

function tagStyleFor(tag) {
  return ARTICLE_TAGS.find((t) => t.key === tag) || { color: C.inkSoft, bg: C.sand };
}

function ArticleComposer({ onClose }) {
  const { me, articleForm, setArticleForm, submitArticle } = useApp();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError]     = useState('');

  async function handleAI() {
    if (!articleForm.title.trim()) { setAiError("Avval sarlavha yozing"); return; }
    setAiError(''); setAiLoading(true);
    try {
      const text = await generateArticle({ title: articleForm.title, city: me.city, country: me.country, tag: articleForm.tag, keywords: articleForm.keywords });
      setArticleForm((f) => ({ ...f, content: text }));
    } catch {
      setAiError("AI xizmatiga ulanib bo'lmadi, qo'lda yozing");
    }
    setAiLoading(false);
  }

  return (
    <div>
      <button onClick={onClose} className="flex items-center gap-1 mb-4" style={{ color: C.inkSoft, fontSize: 13, fontWeight: 600 }}>
        <ArrowLeft size={16} /> Bekor qilish
      </button>
      <div className="flex items-center gap-2 mb-2">
        <Edit3 size={20} color={C.teal} />
        <h2 style={{ ...display, fontSize: 20, fontWeight: 700, color: C.teal }}>Maqola qo'shish</h2>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 14 }}>
        {me.city}, {me.country} hududidagi yangilikni ulashing. Admin tekshirib, tasdiqlagach chop etiladi.
      </p>
      <div className="rounded-2xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
        <Field label="Sarlavha">
          <input value={articleForm.title} onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })} style={inputStyle} placeholder="Masalan: Shaharda yangi ish ruxsatnomasi tartibi" />
        </Field>
        <Field label="Toifa">
          <select value={articleForm.tag} onChange={(e) => setArticleForm({ ...articleForm, tag: e.target.value })} style={inputStyle}>
            {ARTICLE_TAGS.map((t) => <option key={t.key} value={t.key}>{t.key}</option>)}
          </select>
        </Field>
        <Field label="Kalit so'zlar / qisqa izoh (AI uchun, ixtiyoriy)">
          <input value={articleForm.keywords} onChange={(e) => setArticleForm({ ...articleForm, keywords: e.target.value })} style={inputStyle} placeholder="Masalan: yangi tartib, 1-iyuldan kuchga kiradi" />
        </Field>
        <button onClick={handleAI} disabled={aiLoading}
          className="w-full mb-3 py-2.5 rounded-xl flex items-center justify-center gap-2"
          style={{ background: C.tealSoft, color: C.teal, fontWeight: 600, fontSize: 13 }}>
          {aiLoading ? <><Loader2 size={15} className="animate-spin" /> Yozilmoqda...</> : <><Sparkles size={15} /> Sun'iy intellekt yordamida matn tuzish</>}
        </button>
        {aiError && <div style={{ fontSize: 12, color: C.danger, marginBottom: 10 }}>{aiError}</div>}
        <Field label="Maqola matni">
          <textarea value={articleForm.content} onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })} rows={6}
            style={{ ...inputStyle, resize: 'none' }} placeholder="AI yordamida tuzing yoki o'zingiz yozing..." />
        </Field>
        <button onClick={() => { submitArticle(); onClose(); }}
          className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
          style={{ background: C.teal, color: '#fff', fontWeight: 600, fontSize: 14 }}>
          <Send size={15} /> Ko'rib chiqishga yuborish
        </button>
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { me, articles, showArticleForm, setShowArticleForm } = useApp();
  const approved  = (articles || []).filter((a) => a.status === 'approved');
  const myPending = (articles || []).filter((a) => a.status === 'pending' && a.author === me.name);

  if (showArticleForm) {
    return <ArticleComposer onClose={() => setShowArticleForm(false)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between" style={{ margin: '8px 0 2px' }}>
        <div className="flex items-center gap-2">
          <Newspaper size={20} color={C.teal} />
          <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal }}>Yangiliklar</h2>
        </div>
        <button onClick={() => setShowArticleForm(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: C.teal, color: '#fff', fontSize: 12, fontWeight: 600 }}>
          <Edit3 size={13} /> Maqola qo'shish
        </button>
      </div>
      <p style={{ fontSize: 12, color: C.inkSoft, marginBottom: 16 }}>
        Migratsiya qonunchiligi, xavfsizlik va konsullik xizmatlari bo'yicha so'nggi yangiliklar.
      </p>

      {myPending.length > 0 && (
        <div className="rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2" style={{ background: C.warnSoft, color: C.warn }}>
          <Clock size={15} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{myPending.length} ta maqolangiz admin tasdig'ini kutmoqda.</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {approved.map((a) => {
          const ts = tagStyleFor(a.tag);
          return (
            <div key={a.id} className="rounded-2xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
              <div className="flex items-center justify-between mb-2">
                <span style={{ fontSize: 10, fontWeight: 700, color: ts.color, background: ts.bg, padding: '2px 9px', borderRadius: 99, letterSpacing: 0.3 }}>{a.tag.toUpperCase()}</span>
                <span style={{ fontSize: 11, color: C.inkSoft }}>{a.date}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 6, lineHeight: 1.4 }}>{a.content}</div>
              <div className="flex items-center gap-1 mt-3" style={{ color: C.inkSoft, fontSize: 11 }}>
                <User size={11} /> {a.author} · {a.city}, {a.country}
              </div>
            </div>
          );
        })}
        {NEWS_ITEMS.map((n, i) => (
          <div key={i} className="rounded-2xl p-4" style={{ background: C.panel, border: `1px solid ${C.line}` }}>
            <div className="flex items-center justify-between mb-2">
              <span style={{ fontSize: 10, fontWeight: 700, color: n.color, background: n.bg, padding: '2px 9px', borderRadius: 99, letterSpacing: 0.3 }}>{n.tag.toUpperCase()}</span>
              <span style={{ fontSize: 11, color: C.inkSoft }}>{n.date}</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.ink, lineHeight: 1.3 }}>{n.title}</div>
            <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 6, lineHeight: 1.4 }}>{n.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
