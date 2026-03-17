# Academic Control System (ACS)

ACS is a high-performance academic analytics and decision-support engine built with the MERN stack.

## ✨ Key Features

*   **Dynamic Academic Modeling**: Define semesters and subjects with complex evaluation components at runtime.
*   **Predictive Intelligence**: Three mathematical models (Optimistic, Performance-Based, Weighted Recency) to project your final SGPA.
*   **Target Optimization Solver**: Calculate exactly what you need to score in future assessments to hit your desired grades.
*   **Real-time Synchronization**: Socket.io integration for instant updates across devices.
*   **Neo-minimalist Boxy UI**: A high-contrast, utility-first interface designed for clarity and rapid data entry.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Zustand, Tailwind CSS, Chart.js, FullCalendar.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Redis (ioredis), Socket.io.
- **AI**: OpenAI GPT API integration for natural language academic querying.

## 🚀 Getting Started

See [hostme.md](./hostme.md) for full setup and deployment instructions.

## 📁 Project Structure

```
/client   - React + Vite application
/server   - Node.js + Express API
/shared   - Common constants and types (optional)
vercel.json - Frontend deployment config
hostme.md   - Setup & Deployment Guide
```

## 🔒 Security

- JWT-based stateless authentication.
- Password hashing (bcryptjs).
- Protected routes and structural maintenance mode.
- Sanitized input validation.

---
Built by Antigravity AI for the Academic Control Mission.