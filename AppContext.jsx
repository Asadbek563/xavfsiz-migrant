import React, { createContext, useContext, useState } from 'react';
import { seedUsers, seedJobs, HOURS } from '../constants/data.js';
import { genId } from '../utils/helpers.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [now]          = useState(Date.now());
  const [stage, setStage]   = useState('auth'); // auth | app | admin
  const [users, setUsers]   = useState(seedUsers);
  const [jobs,  setJobs]    = useState(seedJobs);
  const [meId,  setMeId]    = useState(null);
  const [tab,   setTab]     = useState('home');

  // Auth
  const [authView,      setAuthView]      = useState('login');
  const [loginForm,     setLoginForm]     = useState({ login: '', password: '' });
  const [registerInfo,  setRegisterInfo]  = useState({ name: '', phone: '', passport: '' });
  const [registerCreds, setRegisterCreds] = useState({ login: '', password: '', confirm: '' });
  const [forgotForm,    setForgotForm]    = useState({ phone: '', passport: '' });
  const [resetForm,     setResetForm]     = useState({ password: '', confirm: '' });
  const [forgotMatchId, setForgotMatchId] = useState(null);
  const [authError,     setAuthError]     = useState('');
  const [authNotice,    setAuthNotice]    = useState('');

  // App state
  const [sosBanner,    setSosBanner]    = useState(false);
  const [sosScreen,    setSosScreen]    = useState(false);
  const [jobForm,      setJobForm]      = useState({ title: '', location: '', contact: '' });
  const [showJobForm,  setShowJobForm]  = useState(false);
  const [documents,    setDocuments]    = useState([]);
  const [docForm,      setDocForm]      = useState({ employer: '', jobType: '', date: '', fileName: '', fileUrl: '' });
  const [showDocForm,  setShowDocForm]  = useState(false);
  const [contracts,    setContracts]    = useState([]);
  const [contractForm, setContractForm] = useState({ employer: '', position: '', startDate: '', endDate: '' });
  const [showContractForm, setShowContractForm] = useState(false);
  const [articles,     setArticles]     = useState([]);
  const [articleForm,  setArticleForm]  = useState({ title: '', tag: 'Xavfsizlik', content: '', keywords: '' });
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [exactLocation, setExactLocation] = useState(null);

  const me = users.find((u) => u.id === meId);

  /* ---------- AUTH ---------- */
  function clearAuthMsgs() { setAuthError(''); setAuthNotice(''); }

  function goAuth(view) { clearAuthMsgs(); setAuthView(view); }

  function doLogin() {
    clearAuthMsgs();
    const u = users.find((x) => x.login === loginForm.login.trim() && x.password === loginForm.password);
    if (!u) { setAuthError("Login yoki parol noto'g'ri"); return; }
    setMeId(u.id); setStage('app'); setTab('home');
  }

  function submitRegisterInfo() {
    clearAuthMsgs();
    if (!registerInfo.name.trim() || !registerInfo.phone.trim() || !registerInfo.passport.trim()) {
      setAuthError("Barcha maydonlarni to'ldiring"); return;
    }
    setAuthView('registerCreds');
  }

  function submitRegisterCreds() {
    clearAuthMsgs();
    if (!registerCreds.login.trim() || !registerCreds.password) { setAuthError("Login va parolni kiriting"); return; }
    if (registerCreds.password.length < 4) { setAuthError("Parol kamida 4 belgidan iborat bo'lishi kerak"); return; }
    if (registerCreds.password !== registerCreds.confirm) { setAuthError("Parollar mos kelmadi"); return; }
    if (users.some((u) => u.login === registerCreds.login.trim())) { setAuthError("Bu login band, boshqasini tanlang"); return; }
    const id = genId();
    const u = {
      id, name: registerInfo.name.trim(), phone: registerInfo.phone.trim(),
      passport: registerInfo.passport.trim().toUpperCase(),
      login: registerCreds.login.trim(), password: registerCreds.password,
      country: 'Rossiya', city: 'Moskva', lastCheckIn: now, sosHistory: [],
    };
    setUsers((prev) => [...prev, u]);
    setMeId(id); setStage('app'); setTab('home');
  }

  function submitForgotPhone() {
    clearAuthMsgs();
    const u = users.find((x) => x.phone === forgotForm.phone.trim() && x.passport === forgotForm.passport.trim().toUpperCase());
    if (!u) { setAuthError("Bunday telefon raqami va pasport seriyasi bilan foydalanuvchi topilmadi"); return; }
    setForgotMatchId(u.id); setAuthView('forgotReset');
  }

  function submitReset() {
    clearAuthMsgs();
    if (!resetForm.password || resetForm.password.length < 4) { setAuthError("Parol kamida 4 belgidan iborat bo'lishi kerak"); return; }
    if (resetForm.password !== resetForm.confirm) { setAuthError("Parollar mos kelmadi"); return; }
    const matched = users.find((u) => u.id === forgotMatchId);
    setUsers((prev) => prev.map((u) => (u.id === forgotMatchId ? { ...u, password: resetForm.password } : u)));
    setLoginForm({ login: matched ? matched.login : '', password: '' });
    setResetForm({ password: '', confirm: '' });
    setAuthView('login');
    setAuthNotice("Parol muvaffaqiyatli yangilandi. Endi yangi parol bilan kiring.");
  }

  function logout() { setMeId(null); setStage('auth'); setAuthView('login'); }

  /* ---------- APP ACTIONS ---------- */
  function checkIn() {
    setUsers((prev) => prev.map((u) => (u.id === meId ? { ...u, lastCheckIn: now } : u)));
  }

  function updateLocation(country, city) {
    setUsers((prev) => prev.map((u) => (u.id === meId ? { ...u, country, city } : u)));
  }

  function triggerSos(category, note) {
    const lat = (35 + Math.random() * 20).toFixed(4);
    const lng = (20 + Math.random() * 60).toFixed(4);
    setUsers((prev) => prev.map((u) => (
      u.id === meId
        ? { ...u, sosHistory: [{ time: now, lat: Number(lat), lng: Number(lng), category, note }, ...(u.sosHistory || [])] }
        : u
    )));
  }

  function finishSos() {
    setSosScreen(false);
    setSosBanner(true);
    setTimeout(() => setSosBanner(false), 4000);
  }

  function sendExactLocation() {
    setExactLocation({ loading: true });
    if (!navigator.geolocation) {
      setExactLocation({ error: "Bu qurilma GPS-ni qo'llab-quvvatlamaydi" }); return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setExactLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => setExactLocation({ error: "GPS ruxsati berilmadi yoki aniqlab bo'lmadi" }),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  function addJob() {
    if (!jobForm.title.trim() || !jobForm.location.trim()) return;
    setJobs((prev) => [
      { id: Date.now(), title: jobForm.title, location: jobForm.location, contact: jobForm.contact, postedBy: me ? me.name : 'Foydalanuvchi', days: 0, verified: false },
      ...prev,
    ]);
    setJobForm({ title: '', location: '', contact: '' });
    setShowJobForm(false);
  }

  function toggleJobVerified(id) {
    setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, verified: !j.verified } : j)));
  }

  function removeJob(id) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  function addDocument() {
    if (!docForm.employer.trim() || !docForm.jobType.trim()) return;
    setDocuments((prev) => [
      { id: Date.now(), employer: docForm.employer, jobType: docForm.jobType, date: docForm.date || new Date(now).toLocaleDateString('uz-UZ'), fileName: docForm.fileName, fileUrl: docForm.fileUrl },
      ...prev,
    ]);
    setDocForm({ employer: '', jobType: '', date: '', fileName: '', fileUrl: '' });
    setShowDocForm(false);
  }

  function removeDocument(id) {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }

  function addContract() {
    if (!contractForm.employer.trim() || !contractForm.position.trim()) return;
    setContracts((prev) => [
      { id: Date.now(), employer: contractForm.employer, position: contractForm.position, startDate: contractForm.startDate, endDate: contractForm.endDate },
      ...prev,
    ]);
    setContractForm({ employer: '', position: '', startDate: '', endDate: '' });
    setShowContractForm(false);
  }

  function removeContract(id) {
    setContracts((prev) => prev.filter((c) => c.id !== id));
  }

  function submitArticle() {
    if (!articleForm.title.trim() || !articleForm.content.trim()) return;
    setArticles((prev) => [
      {
        id: Date.now(), title: articleForm.title.trim(), tag: articleForm.tag,
        content: articleForm.content.trim(), author: me ? me.name : 'Foydalanuvchi',
        city: me ? me.city : '', country: me ? me.country : '',
        date: new Date(now).toLocaleDateString('uz-UZ'), status: 'pending',
      },
      ...prev,
    ]);
    setArticleForm({ title: '', tag: 'Xavfsizlik', content: '', keywords: '' });
    setShowArticleForm(false);
  }

  function approveArticle(id) { setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'approved' } : a))); }
  function rejectArticle(id)  { setArticles((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'rejected' } : a))); }

  return (
    <AppContext.Provider value={{
      now, stage, setStage, users, me, jobs, tab, setTab,
      authView, loginForm, setLoginForm, registerInfo, setRegisterInfo,
      registerCreds, setRegisterCreds, forgotForm, setForgotForm,
      resetForm, setResetForm, authError, authNotice,
      goAuth, doLogin, submitRegisterInfo, submitRegisterCreds,
      submitForgotPhone, submitReset, logout,
      sosBanner, sosScreen, setSosScreen, checkIn, updateLocation,
      triggerSos, finishSos, sendExactLocation, exactLocation,
      jobs: jobs, jobForm, setJobForm, showJobForm, setShowJobForm, addJob, toggleJobVerified, removeJob,
      documents, docForm, setDocForm, showDocForm, setShowDocForm, addDocument, removeDocument,
      contracts, contractForm, setContractForm, showContractForm, setShowContractForm, addContract, removeContract,
      articles, articleForm, setArticleForm, showArticleForm, setShowArticleForm, submitArticle,
      approveArticle, rejectArticle,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
