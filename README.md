# FitPlan Coach

Build a landing page and an authenticated app shell for **FitPlan**, a web app for personal trainers in Taiwan. FitPlan turns a client's profile into a 4-week training plan and emails that week's plan to the client every Monday.

All user-facing text must be Traditional Chinese (Taiwan). Code, routes and labels stay in English.

**Public landing page (/)**

- Header: logo text "FitPlan"; nav links 功能 / 價格 / 登入; button 免費開始 → /signup

- Hero: headline 「填好學員資料，一分鐘拿到四週課表」; subline 「你看過按送出，每週一自動寄給學員。不用再用 Excel 排到半夜。」; primary button 免費開始 → /signup; secondary link 看它怎麼做 → scroll to features

- Features: exactly three cards

  1. 「一分鐘出四週課表」 — 填身高、體重、目標、每週幾次、受傷限制，課表就出來

  2. 「你看過才寄」 — 課表先給你改，按送出才會寄給學員

  3. 「每週一自動寄」 — 本週課表自動寄到學員信箱，你不用追

- Pricing: one plan only. Card title 「教練方案」, price 「NT$399／月」, line 「學員數不限」, button 免費開始. Small text under it: 「註冊免費。開始寄課表給學員時再付。」

- Footer: 「© 2026 FitPlan」 and one disclaimer line: 「FitPlan 產生的課表不是醫療建議。有受傷或疾病請先詢問醫師。」

**Authentication**

- Email + password sign up (/signup), sign in (/login), sign out, using the default auth you provide (Supabase-style). Keep email confirmation at its default.

- After sign in, redirect to /app.

**Authenticated app shell (/app)**

- Header with logo and a 登出 button

- Greeting 「嗨，{user email}」

- One empty-state card: 「還沒有學員。下一步會在這裡新增學員、產生課表。」

- Do NOT build the student form, plan generation, email sending, payment, or any custom database tables. This is version 1: landing page + auth + empty shell only.

**Design**

- Light theme. Page background #F7F9F2 (soft cream), cards white. Text and primary buttons deep forest green #0A211F (button text #F7F9F2). Highlight color lime #D8FF85 for badges, the price tag and key words. Links and secondary accents moss green #2A4E45

- Chinese font: Noto Sans TC; numbers: Inter

- Mobile responsive; minimal animation (fade-in is enough)

- No stock photos; simple line icons for the three feature cards

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee6a289d-9267-47ec-83e7-2e5d569e54b5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
