import {
  CloudSnow, Cloud, CloudRain, Sun, Wind,
  Stethoscope, AlertTriangle, FileText, Briefcase, AlertCircle,
} from 'lucide-react';
import { ShieldAlert } from 'lucide-react';

export const HOURS = 3600000;

export const COUNTRIES = {
  Rossiya: ['Moskva', 'Sankt-Peterburg', 'Kazan', 'Yekaterinburg'],
  'Janubiy Koreya': ['Seul', 'Busan', 'Inchon'],
  Turkiya: ['Istanbul', 'Ankara', 'Izmir'],
  Qozogiston: ['Almati', 'Nur-Sulton'],
};

export const CITY_INFO = {
  Moskva:           { temp: -5,  condition: "Qorli",          icon: CloudSnow, safe: true,  emergency: null },
  'Sankt-Peterburg':{ temp: -3,  condition: "Bulutli",        icon: Cloud,     safe: true,  emergency: null },
  Kazan:            { temp: -7,  condition: "Sovuq, tinch",   icon: CloudSnow, safe: true,  emergency: null },
  Yekaterinburg:    { temp: -10, condition: "Qor bo'roni",    icon: CloudSnow, safe: false, emergency: "Kuchli qor bo'roni tufayli ko'cha harakati cheklangan" },
  Seul:             { temp: 18,  condition: "Quyoshli",       icon: Sun,       safe: true,  emergency: null },
  Busan:            { temp: 20,  condition: "Bulutli",        icon: Cloud,     safe: true,  emergency: null },
  Inchon:           { temp: 17,  condition: "Yomg'irli",      icon: CloudRain, safe: true,  emergency: null },
  Istanbul:         { temp: 22,  condition: "Quyoshli",       icon: Sun,       safe: false, emergency: "Shahar markazida ommaviy tadbir, ba'zi yo'llar yopiq" },
  Ankara:           { temp: 19,  condition: "Bulutli",        icon: Cloud,     safe: true,  emergency: null },
  Izmir:            { temp: 24,  condition: "Quyoshli",       icon: Sun,       safe: true,  emergency: null },
  Almati:           { temp: 10,  condition: "Bulutli",        icon: Cloud,     safe: true,  emergency: null },
  'Nur-Sulton':     { temp: 2,   condition: "Shamolli",       icon: Wind,      safe: true,  emergency: null },
};

export const CONSULATES = {
  Rossiya: {
    name: "O'zbekiston Respublikasi Bosh konsulligi (Moskva)",
    address: "Pogorelskiy per., 12, Moskva, Rossiya",
    phone: "+7 495 230 00 25",
    emergencyPhone: "+7 495 230 00 26",
    email: "moscow@mfa.uz",
    hours: "Dush–Juma, 09:00–17:00",
  },
  'Janubiy Koreya': {
    name: "O'zbekiston Respublikasi Elchixonasi (Seul)",
    address: "Yongsan-gu, Hannam-dong, Seul, Janubiy Koreya",
    phone: "+82 2 794 7589",
    emergencyPhone: "+82 10 5454 0606",
    email: "seoul@mfa.uz",
    hours: "Dush–Juma, 09:00–18:00",
  },
  Turkiya: {
    name: "O'zbekiston Respublikasi Elchixonasi (Ankara)",
    address: "Gaziosmanpasa, Ankara, Turkiya",
    phone: "+90 312 439 27 40",
    emergencyPhone: "+90 532 123 45 67",
    email: "ankara@mfa.uz",
    hours: "Dush–Juma, 09:00–17:30",
  },
  Qozogiston: {
    name: "O'zbekiston Respublikasi Bosh konsulligi (Almati)",
    address: "Baribaev ko'chasi, 36, Almati, Qozog'iston",
    phone: "+7 727 258 26 36",
    emergencyPhone: "+7 707 123 45 67",
    email: "almaty@mfa.uz",
    hours: "Dush–Juma, 09:00–17:00",
  },
};

export const HOST_AUTHORITIES = {
  Rossiya:         { name: "Yagona favqulodda xizmatlar raqami (Rossiya)",         phone: "112" },
  'Janubiy Koreya':{ name: "Politsiya / favqulodda xizmat (Janubiy Koreya)",       phone: "112" },
  Turkiya:         { name: "Politsiya / favqulodda xizmat (Turkiya)",              phone: "155" },
  Qozogiston:      { name: "Yagona favqulodda xizmatlar raqami (Qozog'iston)",     phone: "112" },
};

export const SOS_CATEGORIES = [
  { key: 'medical',    label: "Tibbiy favqulodda yordam",        desc: "Jarohat, kasallik, hayotga xavf",           icon: Stethoscope   },
  { key: 'violence',   label: "Kuch ishlatish / zo'ravonlik",    desc: "Jismoniy tahdid yoki hujum",                icon: AlertTriangle  },
  { key: 'harassment', label: "Bezorilik / tahdid",              desc: "Qo'rqitish, tazyiq, ta'qib",               icon: ShieldAlert    },
  { key: 'docs',       label: "Hujjatlar tortib olindi",         desc: "Pasport yoki hujjatlar olib qo'yilgan",    icon: FileText       },
  { key: 'wage',       label: "Maosh to'lanmadi / firibgarlik",  desc: "Ish haqi berilmadi yoki aldashdi",          icon: Briefcase      },
  { key: 'other',      label: "Boshqa favqulodda holat",         desc: "Yuqoridagilarga mos kelmasa",              icon: AlertCircle    },
];

export const INTL_ORGS = [
  {
    name: "IOM — Xalqaro Migratsiya Tashkiloti",
    desc: "Migrantlarga huquqiy va ijtimoiy yordam, qaytarish dasturlari",
    phone: "+998 78 140 64 25",
    email: "iomtashkent@iom.int",
    site: "https://uzbekistan.iom.int",
  },
  {
    name: "ILO — Xalqaro Mehnat Tashkiloti",
    desc: "Mehnat huquqlari, adolatsiz ish sharoitlari bo'yicha murojaatlar",
    phone: "+41 22 799 61 11",
    email: "ilo@ilo.org",
    site: "https://www.ilo.org",
  },
  {
    name: "IOM — Migrant yordam liniyasi (24/7)",
    desc: "Favqulodda holatlarda xalqaro maslahat va yo'naltirish xizmati",
    phone: "+1 877 433 6432",
    email: "migrantassistance@iom.int",
    site: "https://migrantassistance.iom.int",
  },
];

export const ARTICLE_TAGS = [
  { key: 'Xavfsizlik',   color: '#C1502E', bg: '#F7E0D5' },
  { key: 'Mehnat bozori',color: '#0F3D3E', bg: '#E4EDEA' },
  { key: 'Qonunchilik',  color: '#0F3D3E', bg: '#E4EDEA' },
  { key: 'Konsullik',    color: '#357A5B', bg: '#E1EFE6' },
  { key: 'Boshqa',       color: '#C9952E', bg: '#F4E7C8' },
];

export const NEWS_ITEMS = [
  {
    tag: 'Qonunchilik', color: '#0F3D3E', bg: '#E4EDEA',
    title: "Rossiyada patent narxlari 2026-yil uchun yangilandi",
    summary: "Mehnat patenti uchun oylik to'lov stavkalari mintaqalar bo'yicha o'zgartirildi. Patentni o'z vaqtida uzaytirish tavsiya etiladi.",
    date: '2026-06-24',
  },
  {
    tag: 'Xavfsizlik', color: '#C1502E', bg: '#F7E0D5',
    title: "Yekaterinburgda qishki bo'ron tufayli ish to'xtatildi",
    summary: "Mahalliy hokimiyat ko'cha qurilish ishlarini vaqtincha to'xtatishni tavsiya qildi.",
    date: '2026-06-22',
  },
  {
    tag: 'IOM', color: '#C9952E', bg: '#F4E7C8',
    title: "IOM bepul huquqiy maslahat dasturini kengaytirdi",
    summary: "Mehnat huquqlari buzilgan migrantlar uchun onlayn maslahat xizmati endi haftada 7 kun ishlaydi.",
    date: '2026-06-20',
  },
  {
    tag: 'Konsullik', color: '#357A5B', bg: '#E1EFE6',
    title: "Seuldagi elchixonada qabul kunlari kengaytirildi",
    summary: "Endi shanba kunlari ham soat 10:00–14:00 oralig'ida fuqarolar qabul qilinadi.",
    date: '2026-06-18',
  },
  {
    tag: 'Mehnat bozori', color: '#0F3D3E', bg: '#E4EDEA',
    title: "Turkiyada qurilish sohasida ish o'rinlari ko'paymoqda",
    summary: "Istanbul va Ankarada rasmiy ish beruvchilar tomonidan yangi vakansiyalar e'lon qilindi.",
    date: '2026-06-15',
  },
];

export const seedUsers = () => {
  const now = Date.now();
  return [
    { id: 'XM-481203', name: 'Dilshod Karimov',  phone: '+998 90 123 45 67', passport: 'AB1234567', login: 'dilshod90', password: 'demo123', country: 'Rossiya',        city: 'Moskva',   lastCheckIn: now - 5  * HOURS, sosHistory: [] },
    { id: 'XM-552071', name: 'Madina Yusupova',  phone: '+998 91 222 33 44', passport: 'AC2233445', login: 'madina21',  password: 'demo123', country: 'Janubiy Koreya', city: 'Seul',     lastCheckIn: now - 30 * HOURS, sosHistory: [] },
    { id: 'XM-390144', name: 'Aziz Tursunov',    phone: '+998 93 555 66 77', passport: 'AD5566778', login: 'aziz77',    password: 'demo123', country: 'Turkiya',        city: 'Istanbul', lastCheckIn: now - 70 * HOURS, sosHistory: [] },
    { id: 'XM-219988', name: 'Sevara Nazarova',  phone: '+998 97 888 99 00', passport: 'AE9988776', login: 'sevara05',  password: 'demo123', country: 'Rossiya',        city: 'Kazan',    lastCheckIn: now - 1  * HOURS, sosHistory: [{ time: now - HOURS, lat: 55.79, lng: 49.12, category: null, note: null }] },
  ];
};

export const seedJobs = [
  { id: 1, title: "Qurilish ishchisi",     location: "Moskva, Rossiya",        contact: "+7 916 000 11 22",   postedBy: "Dilshod K.",      days: 2, verified: true  },
  { id: 2, title: "Omborxona yordamchisi", location: "Seul, Janubiy Koreya",  contact: "+82 10 4321 0000",   postedBy: "Madina Y.",       days: 5, verified: true  },
  { id: 3, title: "Betonchi",              location: "Moskva, Rossiya",        contact: "+7 916 000 11 22",   postedBy: "Dilshod K.",      days: 6, verified: true  },
  { id: 4, title: "Tikuvchi",              location: "Istanbul, Turkiya",      contact: "+90 532 111 22 33",  postedBy: "Noma'lum vositachi", days: 1, verified: false },
];
