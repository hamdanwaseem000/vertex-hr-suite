# VertexHR — Cloud Workforce, Attendance & Payroll Suite

**VertexHR** is a full-stack HR, Attendance, Leave Management, Payroll, Analytics, and AI Copilot platform built with **React 19**, **Firebase (Auth + Firestore)**, **Vercel Serverless Functions (`firebase-admin`)**, and **Google Gemini 2.0 Flash**.

It features a custom **Emerald-Teal & Ocean-Cyan Glassmorphic UI** (`#041116` deep slate background, `#059669` / `#0d9488` emerald-teal accents, `'Outfit'` + `'Plus Jakarta Sans'` typography) and is ready for a brand-new Firebase account with zero old project data.

---

## Step-by-Step Setup Guide for Your New Firebase Account

### Step 1: Install Dependencies
Extract the `.zip` folder, open a terminal inside the folder, and run:
```bash
npm install
```

### Step 2: Create a New Firebase Project (On Your Other Account)
1. Go to [Firebase Console](https://console.firebase.google.com/) using your new Google account.
2. Click **"Add project"** (e.g., `vertex-hr-suite`).
3. Inside the project:
   - **Authentication**: Go to **Build → Authentication → Get Started → Sign-in method** and enable **Email/Password**.
   - **Firestore Database**: Go to **Build → Firestore Database → Create database** (choose any region, start in Production mode).
   - **Firestore Security Rules**: Go to the **Rules** tab inside Firestore Database, copy the entire contents of [`firestore.rules`](./firestore.rules) from this folder, paste it there, and click **Publish**.

### Step 3: Connect Your New Firebase Web App Config
1. In Firebase Console, click the **Gear icon (Project Settings) → General → Your apps → Web (`</>`)**.
2. Register the app (`VertexHR`) and copy the `firebaseConfig` keys.
3. Either:
   - Create a `.env` file in the project root (copy from `.env.example`) and paste your keys:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     REACT_APP_GEMINI_API_KEY=your_gemini_api_key
     ```
   - **OR** paste them directly inside [`src/firebase.js`](./src/firebase.js).

### Step 4: Run First-Time Setup (`/setup`)
Start the app locally:
```bash
npm start
```
- Because your new Firestore database is completely empty (no `settings/company` document), VertexHR will automatically open the **First-Run Setup Wizard (`/setup`)**.
- Enter your **Company Name**, **Office Hours**, and **Primary Admin Name, Email, and Password** — it will create your Admin account and initialize the company configuration automatically!

---

## Deploying to Vercel or Firebase Hosting

### Option A: Deploy to Vercel (Recommended — Includes `/api/*` Backend)
1. Push this folder to your new GitHub repository or run `npx vercel`.
2. In **Vercel Project Settings → Environment Variables**, add the variables from `.env.example` (including `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` from Firebase Project Settings → Service Accounts, and `GEMINI_API_KEY`).

### Option B: Deploy to Firebase Hosting + Firestore Rules via CLI
1. Update `.firebaserc` with your new Firebase Project ID.
2. Run:
   ```bash
   firebase login --reauth
   npm run build
   firebase deploy --only firestore:rules,hosting
   ```

---

## Testing
Run the automated calculation test suite (Leave Working Days, Overlap Detection, Attendance Status, Payroll & Tax Slabs):
```bash
npm test
```
