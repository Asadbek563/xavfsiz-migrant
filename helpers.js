import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { C } from '../constants/colors.js';
import { HOURS } from '../constants/data.js';

export function genId() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `XM-${n}`;
}

export function getStatusInfo(hoursSince) {
  if (hoursSince < 24) return { key: 'safe',     label: 'Xavfsiz',                       color: C.safe,     soft: C.safeSoft,     icon: CheckCircle2  };
  if (hoursSince < 48) return { key: 'wait',     label: 'Javob kutilmoqda',               color: C.warn,     soft: C.warnSoft,     icon: Clock         };
  if (hoursSince < 72) return { key: 'lost',     label: 'Aloqa uzilgan',                  color: C.danger,   soft: C.dangerSoft,   icon: AlertTriangle };
  return                       { key: 'critical', label: 'Favqulodda — konsullik xabardor', color: C.critical, soft: C.criticalSoft, icon: AlertTriangle };
}

export function tagStyleFor(tag, ARTICLE_TAGS) {
  return ARTICLE_TAGS.find((t) => t.key === tag) || { color: C.inkSoft, bg: C.sand };
}

export function pensionInfoFor(user) {
  let h = 0;
  for (let i = 0; i < user.id.length; i++) h = (h * 31 + user.id.charCodeAt(i)) >>> 0;
  const years  = 1 + (h % 6);
  const months = (h >> 3) % 12;
  const taxOk  = h % 3 !== 0;
  return {
    years, months,
    fundStatus:  'Faol',
    taxStatus:   taxOk ? "To'liq to'langan" : "Qisman to'langan",
    lastPayment: taxOk ? '2026-06-05' : '2026-04-12',
  };
}
