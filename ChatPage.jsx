import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import { C, display, inputStyle } from '../constants/colors.js';
import { useApp } from '../context/AppContext.jsx';

const API_URL = 'https://api.anthropic.com/v1/messages';

export default function ChatPage() {
  const { me, setTab } = useApp();
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Assalomu alaykum, ${me.name}! Men Xavfsiz Migrant yordamchisiman. Xavfsizlik, hujjatlar, mehnat huquqlari yoki boshqa savollaringiz bo'lsa, so'rang.` },
  ]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setError('');
    const nextMessages = [...messages, { role: 'user', text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Sen "Xavfsiz Migrant" ilovasining yordamchisisan. Chet elda ishlayotgan O'zbekiston fuqarolariga xavfsizlik, hujjatlar, mehnat huquqlari va konsullik xizmatlari bo'yicha o'zbek tilida qisqa va aniq maslahat ber.
Foydalanuvchi: ${me.name}, hozir ${me.city}, ${me.country}da.
Suhbat tarixi:
${nextMessages.map((m) => `${m.role === 'user' ? 'Foydalanuvchi' : 'Yordamchi'}: ${m.text}`).join('\n')}
Faqat yordamchining navbatdagi javobini yoz, boshqa hech narsa qo'shma.`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text2 = (data.content || []).map((b) => b.text || '').join('\n').trim();
      setMessages((prev) => [...prev, { role: 'assistant', text: text2 || "Kechirasiz, javob bera olmadim." }]);
    } catch {
      setError("AI xizmatiga ulanib bo'lmadi. Birozdan so'ng qayta urinib ko'ring.");
    }
    setLoading(false);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 180px)' }}>
      <div className="flex items-center gap-2" style={{ margin: '8px 0 12px' }}>
        <MessageCircle size={20} color={C.teal} />
        <h2 style={{ ...display, fontSize: 22, fontWeight: 700, color: C.teal }}>Yordamchi</h2>
      </div>
      <button onClick={() => setTab('kabinet')} className="flex items-center gap-1 mb-2" style={{ color: C.inkSoft, fontSize: 12, fontWeight: 600 }}>
        <ArrowLeft size={14} /> Kabinetga qaytish
      </button>

      <div className="flex-1" style={{ overflowY: 'auto' }}>
        <div className="flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className="flex" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                className="rounded-2xl px-4 py-2.5"
                style={{
                  maxWidth: '80%',
                  background: m.role === 'user' ? C.teal : C.panel,
                  color: m.role === 'user' ? '#fff' : C.ink,
                  border: m.role === 'user' ? 'none' : `1px solid ${C.line}`,
                  fontSize: 13,
                  lineHeight: 1.4,
                }}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2" style={{ color: C.inkSoft, fontSize: 12 }}>
              <Loader2 size={14} className="animate-spin" /> Yozilmoqda...
            </div>
          )}
          {error && <div style={{ fontSize: 12, color: C.danger }}>{error}</div>}
          <div ref={bottomRef} />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Savolingizni yozing..."
          style={{ ...inputStyle, flex: 1 }}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}
          className="flex items-center justify-center"
          style={{ width: 44, height: 44, borderRadius: 12, background: C.teal, color: '#fff', flexShrink: 0 }}>
          <Send size={18} />
        </button>
      </div>
      <div className="flex items-center gap-1 mt-2" style={{ color: C.inkSoft, fontSize: 10 }}>
        <Sparkles size={11} /> Javoblar sun'iy intellekt yordamida tuziladi, muhim qarorlar uchun rasmiy manbalarni tekshiring.
      </div>
    </div>
  );
}
