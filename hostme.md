# HostMe — Deployment & Execution Guide

Follow these steps to run the Academic Control System locally or deploy to production.

---

## 🚀 Local Run Environment

### 1. Prerequisites
- Node.js v18+ 
- MongoDB (Local instance or Atlas)
- Redis (Optional, system will fallback if not found)

### 2. Backend Setup
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongo_uri
# JWT_SECRET=your_secret
# PORT=5000
# GEMINI_API_KEY_1=your_first_gemini_key
# GEMINI_API_KEY_2=your_second_gemini_key
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

### 4. Direct Access
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api/v1

---

## 🌐 Production Deployment

### Backend (Render / Railway)
1. Link your repo.
2. Root directory: `server`.
3. Build command: `npm install`.
4. Start command: `node server.js`.
5. Environment Variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

### Frontend (Vercel)
1. Link your repo.
2. Framework preset: `Vite`.
3. Root directory: `client`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Environment Variables:
   - `VITE_API_URL=your_backend_url`
