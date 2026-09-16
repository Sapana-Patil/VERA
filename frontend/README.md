# Vera (FND) - Frontend UI

A sleek, user-friendly, and modern Fake News & Statement Veracity Detection interface built with **React**, **Vite**, and **Tailwind CSS**.

## ✨ Features

- **Text & Statement Analysis**: Direct input area with word/character counter, clear button, and keyboard shortcut (`Ctrl + Enter`).
- **Binary "Real vs Fake" Verdict**: High-impact, unambiguous classification:
  - 🟢 **REAL** (Authentic / Credible)
  - 🔴 **FAKE** (Misinformation / Fabricated)
- **Certainty & Reasoning**: Visual confidence meter (%) and concise model assessment.
- **Quick Sample Buttons**: 1-click test buttons with typical viral hoax vs official news examples.
- **Analysis History**: Stores past checks locally with one-click reload and clear options.
- **Dark / Light Mode**: Seamless theme toggle with automatic system preference detection.
- **API Ready**: Communicates with FastAPI backend (`http://127.0.0.1:8000/predict`) with an intelligent fallback simulation so the UI is immediately functional standalone.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will be running at:
`http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

---

## 🔌 Connecting to Your FastAPI Backend

When your FastAPI backend is running at `http://127.0.0.1:8000`, the frontend automatically sends `POST` requests to `/predict`:

**Request format:**
```json
{
  "text": "Your statement or news headline here"
}
```

**Expected response format:**
```json
{
  "verdict": "REAL", // or "FAKE"
  "confidence": 94,   // percentage (0-100)
  "reasoning": "Neutral journalistic tone and credible attribution."
}
```
*(If the backend is not running, the frontend uses an integrated preview engine so you can test and demonstrate the UI anytime!)*
