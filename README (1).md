# Xavfsiz Migrant

Chet elda ishlayotgan O'zbekiston fuqarolarining xavfsizligini ta'minlash uchun mo'ljallangan React ilova (MVP).

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` manzilini oching.

## Loyihani build qilish

```bash
npm run build
npm run preview
```

## Loyiha tuzilishi

```
src/
  components/     Qayta ishlatiladigan UI/layout/admin komponentlari
  constants/      Ranglar, statik ma'lumotlar (davlatlar, konsulliklar va h.k.)
  context/        Global holat (AppContext)
  pages/          Sahifalar: Home, Login, Register, SOS, Jobs, News, Chat, Pension, Profile, Location, Admin
  services/       Tashqi xizmatlar bilan ishlash (AI xizmati)
  utils/          Yordamchi funksiyalar
  App.jsx         Asosiy komponent
  main.jsx        Kirish nuqtasi
```

## Demo login

- Login: `dilshod90`
- Parol: `demo123`

## Eslatma

Bu — namoyish (MVP) versiyasi. Barcha ma'lumotlar faqat brauzer sessiyasida saqlanadi (backend yo'q).
Sun'iy intellekt funksiyalari (Yangiliklar bo'limidagi maqola yozish yordamchisi va Chat) Anthropic API'siga
`https://api.anthropic.com/v1/messages` orqali murojaat qiladi — bu funksiyalarni ishlatish uchun tegishli backend proxy
yoki API kalitini boshqarish tizimini o'rnatish kerak bo'ladi (kalit frontendda saqlanmasligi kerak).
